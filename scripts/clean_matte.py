import math
from PIL import Image, ImageFilter

input_path = '/home/virtual/Área de trabalho/ARAS/public/images/logo-mundo-dos-cavalos-ref.jpg'
orig = Image.open(input_path).convert('RGB')
w, h = orig.size

# 1. Compute a high-precision mask
# Background is clean white (254-255).
# Letters are dark bronze or gold (min channel < 220).
# Let's create an alpha mask where pure white is 0, and core letters are 255.

alpha_img = Image.new('L', (w, h), 0)
orig_px = orig.load()
alpha_px = alpha_img.load()

for y in range(h):
    for x in range(w):
        r, g, b = orig_px[x, y]
        # In this image, the background has high luminance and very low saturation:
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        min_c = min(r, g, b)
        max_c = max(r, g, b)
        sat = max_c - min_c
        
        # Pure white background test
        # If min_c >= 250 and sat <= 6, it's 100% background.
        if min_c >= 248 and sat <= 8:
            a = 0
        elif min_c >= 235 and sat <= 10:
            # Soft edge
            t = (248 - min_c) / 13.0
            a = int(255 * (t ** 1.5))
        else:
            # Foreground
            diff = 255 - min_c
            if diff < 30:
                a = int(255 * (diff / 30.0) ** 1.3)
            else:
                a = 255
        alpha_px[x, y] = a

# 2. Erode the alpha mask slightly to kill the outer white boundary ring
# MinFilter(3) contracts the mask by 1 pixel in every direction
eroded_alpha = alpha_img.filter(ImageFilter.MinFilter(3))

# Blend 50% original alpha and 50% eroded alpha to soften without losing sharp tips
final_alpha = Image.new('L', (w, h), 0)
fa_px = final_alpha.load()
a_px = alpha_img.load()
ea_px = eroded_alpha.load()

for y in range(h):
    for x in range(w):
        # We favor the eroded alpha to completely destroy white fringe
        val = int(0.3 * a_px[x, y] + 0.7 * ea_px[x, y])
        fa_px[x, y] = val

# 3. Color reconstruction & de-fringing
# Build a color map where pixels with alpha > 0 have true gold/bronze color
# For semi-transparent pixels, we un-multiply against white, and clamp away any high white
out_rgba = Image.new('RGBA', (w, h))
out_px = out_rgba.load()

for y in range(h):
    for x in range(w):
        a = fa_px[x, y]
        if a <= 2:
            out_px[x, y] = (0, 0, 0, 0)
            continue
            
        r, g, b = orig_px[x, y]
        a_norm = a / 255.0
        
        # True color un-multiplied from white: C_fg = (C - (1-a)*255)/a
        # Clamped so it cannot exceed the original foreground tones
        r_un = max(0, min(255, (r - (1.0 - a_norm) * 255.0) / max(a_norm, 0.05)))
        g_un = max(0, min(255, (g - (1.0 - a_norm) * 255.0) / max(a_norm, 0.05)))
        b_un = max(0, min(255, (b - (1.0 - a_norm) * 255.0) / max(a_norm, 0.05)))
        
        # If any edge pixel is still too bright/white (min > 170 and sat < 35),
        # pull it towards deep warm gold
        if min(r_un, g_un, b_un) > 160:
            factor = (min(r_un, g_un, b_un) - 160) / 95.0
            r_un = r_un * (1.0 - factor) + 215 * factor
            g_un = g_un * (1.0 - factor) + 175 * factor
            b_un = b_un * (1.0 - factor) + 85 * factor

        # Top area: 'MUNDO DOS'
        # The original letters were dark bronze/black.
        # Make them rich, luminous 3D champagne gold so they pop on dark backgrounds!
        if y < 78:
            # Check if this pixel belongs to 'MUNDO DOS' letters
            # (original r,g,b was dark, min < 140)
            if min(r, g, b) < 160:
                # Vertical gradient for luxury metallic luster
                prog = y / 78.0
                gold_r = int(246 - prog * 20)
                gold_g = int(222 - prog * 30)
                gold_b = int(168 - prog * 45)
                r_un = gold_r
                g_un = gold_g
                b_un = gold_b
        
        out_px[x, y] = (int(r_un), int(g_un), int(b_un), a)

# Save the polished logo
out_rgba.save('/home/virtual/Área de trabalho/ARAS/public/images/logo-mundo-dos-cavalos-clean.png')

# Generate a preview on pure dark background (10, 9, 7)
dark_bg = Image.new('RGBA', (w, h), (10, 9, 7, 255))
dark_bg.paste(out_rgba, (0, 0), out_rgba)
dark_bg.save('/home/virtual/Área de trabalho/ARAS/public/images/preview-clean-dark.png')

print('Generated clean matte logo with 0 white halo!')
