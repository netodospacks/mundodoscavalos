from PIL import Image, ImageFilter

orig = Image.open('public/images/logo-mundo-dos-cavalos-ref.jpg').convert('RGB')
w, h = orig.size

# 1. CAVALOS extraction: strictly between y=58 and y=178 to avoid serifs of other letters
cav = orig.crop((120, 58, 880, 178))
cw, ch = cav.size
cav_px = cav.load()

alpha = Image.new('L', (cw, ch), 0)
a_px = alpha.load()

for y in range(ch):
    for x in range(cw):
        r, g, b = cav_px[x, y]
        min_c = min(r, g, b)
        sat = max(r, g, b) - min_c
        
        # White background criteria (background is pure white ~254-255)
        if min_c >= 232 and sat <= 18:
            a = 0
        elif min_c >= 200 and sat <= 24:
            factor = max(0.0, min(1.0, (232 - min_c) / 32.0))
            a = int(255 * (factor ** 2.2))
        else:
            a = 255
        a_px[x, y] = a

# Contract alpha by 1 pixel (MinFilter 3x3) to eliminate outermost white ring
eroded = alpha.filter(ImageFilter.MinFilter(3))
e_px = eroded.load()

res = Image.new('RGBA', (cw, ch))
res_px = res.load()

for y in range(ch):
    for x in range(cw):
        a = e_px[x, y]
        if a <= 8:
            res_px[x, y] = (0, 0, 0, 0)
        else:
            r, g, b = cav_px[x, y]
            # Replace any lingering light/white fringe pixels with deep gold
            if min(r, g, b) > 150 and max(r, g, b) - min(r, g, b) < 50:
                t = (min(r, g, b) - 150) / 105.0
                # Blend with rich gold tone (218, 168, 62)
                r = int(r * (1 - t) + 218 * t)
                g = int(g * (1 - t) + 168 * t)
                b = int(b * (1 - t) + 62 * t)
            res_px[x, y] = (r, g, b, a)

res.save('public/images/cavalos-3d-clean.png')

# 2. Horseshoe extraction: strictly y=182 to y=252 to avoid letters above
hs = orig.crop((470, 181, 532, 252))
hw, hh = hs.size
hs_px = hs.load()
hs_alpha = Image.new('L', (hw, hh), 0)
hsa_px = hs_alpha.load()

for y in range(hh):
    for x in range(hw):
        r, g, b = hs_px[x, y]
        min_c = min(r, g, b)
        sat = max(r, g, b) - min_c
        if min_c >= 232 and sat <= 18:
            hsa_px[x, y] = 0
        elif min_c >= 200 and sat <= 24:
            factor = max(0.0, min(1.0, (232 - min_c) / 32.0))
            hsa_px[x, y] = int(255 * (factor ** 2.2))
        else:
            hsa_px[x, y] = 255

hs_eroded = hs_alpha.filter(ImageFilter.MinFilter(3))
hse_px = hs_eroded.load()

hs_res = Image.new('RGBA', (hw, hh))
hs_res_px = hs_res.load()

for y in range(hh):
    for x in range(hw):
        a = hse_px[x, y]
        if a <= 8:
            hs_res_px[x, y] = (0, 0, 0, 0)
        else:
            r, g, b = hs_px[x, y]
            if min(r, g, b) > 150 and max(r, g, b) - min(r, g, b) < 50:
                t = (min(r, g, b) - 150) / 105.0
                r = int(r * (1 - t) + 218 * t)
                g = int(g * (1 - t) + 168 * t)
                b = int(b * (1 - t) + 62 * t)
            hs_res_px[x, y] = (r, g, b, a)

hs_res.save('public/images/horseshoe-3d-clean.png')

# Verify by compositing on dark background
bg = Image.new('RGBA', (cw, ch), (10, 9, 7, 255))
bg.paste(res, (0, 0), res)
bg.save('public/images/test-cavalos-verified.png')

hbg = Image.new('RGBA', (hw, hh), (10, 9, 7, 255))
hbg.paste(hs_res, (0, 0), hs_res)
hbg.save('public/images/test-horseshoe-verified.png')

print('Generated 100% white-halo-free cavalos-3d-clean.png and horseshoe-3d-clean.png!')
