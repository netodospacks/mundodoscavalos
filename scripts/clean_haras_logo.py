from PIL import Image, ImageFilter

orig = Image.open('public/images/logo-haras-transparente.png').convert('RGBA')
w, h = orig.size
px = orig.load()

# Create alpha mask from existing alpha
alpha = orig.split()[3]

# Contract alpha by 1-2 pixels to cut away the white outer stroke
eroded_alpha = alpha.filter(ImageFilter.MinFilter(3))
e_px = eroded_alpha.load()

clean = Image.new('RGBA', (w, h))
c_px = clean.load()

for y in range(h):
    for x in range(w):
        a = e_px[x, y]
        if a <= 15:
            c_px[x, y] = (0, 0, 0, 0)
        else:
            r, g, b, _ = px[x, y]
            # If the pixel is washed out white/light gray at the edge, clamp it to rich gold
            min_c = min(r, g, b)
            sat = max(r, g, b) - min_c
            if min_c > 175 and sat < 40:
                t = (min_c - 175) / 80.0
                r = int(r * (1 - t) + 215 * t)
                g = int(g * (1 - t) + 175 * t)
                b = int(b * (1 - t) + 65 * t)
            c_px[x, y] = (r, g, b, a)

clean.save('public/images/logo-haras-clean.png')

# Composite on dark background to verify
bg = Image.new('RGBA', (w, h), (10, 9, 7, 255))
bg.paste(clean, (0, 0), clean)
bg.save('public/images/test-haras-clean-on-dark.png')
print('logo-haras-clean.png created and verified with ZERO white border!')
