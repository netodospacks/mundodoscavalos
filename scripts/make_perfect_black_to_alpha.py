import os
from PIL import Image

src_path = '/home/virtual/.gemini/antigravity-ide/brain/9af2419f-53db-4ea7-9df7-d589c9597ff7/mundo_dos_cavalos_logo_recreated_1792517210057.jpg'
out_path = '/home/virtual/Área de trabalho/ARAS/public/images/logo-mundo-dos-cavalos-recreated.png'

src = Image.open(src_path).convert('RGB')

# Crop tight to the logo with 15px padding
box = (65, 170, 1310, 575)
cropped = src.crop(box)
cw, ch = cropped.size
px = cropped.load()

res = Image.new('RGBA', (cw, ch))
res_px = res.load()

for y in range(ch):
    for x in range(cw):
        r, g, b = px[x, y]
        max_c = max(r, g, b)
        
        # Black background threshold
        if max_c < 12:
            res_px[x, y] = (0, 0, 0, 0)
        else:
            # Alpha based on brightness
            if max_c < 45:
                # Soft transition
                alpha = int(255 * ((max_c - 12) / 33.0) ** 1.2)
            else:
                alpha = 255
            
            # Optical un-multiplication against black
            a_norm = max(alpha / 255.0, 0.05)
            r_un = min(255, int(r / a_norm))
            g_un = min(255, int(g / a_norm))
            b_un = min(255, int(b / a_norm))
            
            res_px[x, y] = (r_un, g_un, b_un, alpha)

res.save(out_path)
print(f'Saved {out_path} ({cw}x{ch})')

# Create a test composite on dark hero background (10, 9, 7)
test_bg = Image.new('RGBA', (cw, ch), (10, 9, 7, 255))
test_bg.paste(res, (0, 0), res)
test_bg.save('/home/virtual/Área de trabalho/ARAS/public/images/test-recreated-on-dark.png')
print('Saved test-recreated-on-dark.png')
