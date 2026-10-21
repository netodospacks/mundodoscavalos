import os
from PIL import Image

input_path = '/home/virtual/Área de trabalho/ARAS/public/images/logo-mundo-dos-cavalos-ref.jpg'
output_transp = '/home/virtual/Área de trabalho/ARAS/public/images/logo-mundo-dos-cavalos-transp.png'
output_gold = '/home/virtual/Área de trabalho/ARAS/public/images/logo-mundo-dos-cavalos-gold.png'

img = Image.open(input_path).convert('RGB')
w, h = img.size

# We will create two versions:
# 1. img_transp: Original colors with transparent background
# 2. img_gold: 'MUNDO DOS' made luminous gold so it shines brightly on dark backgrounds

img_transp = Image.new('RGBA', (w, h))
img_gold = Image.new('RGBA', (w, h))

px_orig = img.load()
px_transp = img_transp.load()
px_gold = img_gold.load()

for y in range(h):
    for x in range(w):
        r, g, b = px_orig[x, y]
        # Luminance & distance from pure white
        min_c = min(r, g, b)
        max_c = max(r, g, b)
        diff = 255 - min_c
        
        # White background removal
        if diff < 10:
            px_transp[x, y] = (0, 0, 0, 0)
            px_gold[x, y] = (0, 0, 0, 0)
        else:
            if diff < 50:
                alpha = int(255 * (diff - 10) / 40.0)
            else:
                alpha = 255
            
            # De-fringe against white
            a_factor = max(alpha / 255.0, 0.04)
            r_def = int(max(0, min(255, (r - (1.0 - a_factor) * 255) / a_factor)))
            g_def = int(max(0, min(255, (g - (1.0 - a_factor) * 255) / a_factor)))
            b_def = int(max(0, min(255, (b - (1.0 - a_factor) * 255) / a_factor)))
            
            px_transp[x, y] = (r_def, g_def, b_def, alpha)
            
            # For gold version:
            # If in upper region (y < 76) and is the text 'MUNDO DOS' (dark pixels)
            if y < 76 and alpha > 20 and r_def < 120 and g_def < 120:
                # Give MUNDO DOS a gorgeous champagne gold sheen:
                # Vertical highlight gradient
                y_ratio = y / 76.0
                r_gold = int(244 - y_ratio * 25)
                g_gold = int(225 - y_ratio * 35)
                b_gold = int(185 - y_ratio * 45)
                px_gold[x, y] = (r_gold, g_gold, b_gold, alpha)
            else:
                px_gold[x, y] = (r_def, g_def, b_def, alpha)

img_transp.save(output_transp)
img_gold.save(output_gold)
print('Successfully generated logo-mundo-dos-cavalos-transp.png and logo-mundo-dos-cavalos-gold.png')
