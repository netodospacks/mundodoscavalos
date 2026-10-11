const fs = require('fs');
const zlib = require('zlib');

function removeBackground(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  
  // Validar PNG signature
  if (buf.readUInt32BE(0) !== 0x89504E47 || buf.readUInt32BE(4) !== 0x0D0A1A0A) {
    throw new Error('Not a PNG file');
  }

  let pos = 8;
  let width, height, bitDepth, colorType, compressionMethod, filterMethod, interlaceMethod;
  const idatChunks = [];
  const otherChunksBeforeIdat = [];
  const otherChunksAfterIdat = [];
  let pastIdat = false;

  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + length);
    const crc = buf.readUInt32BE(pos + 8 + length);
    pos += 12 + length;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9]; // 6 = RGBA, 2 = RGB
      compressionMethod = data[10];
      filterMethod = data[11];
      interlaceMethod = data[12];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    } else {
      if (idatChunks.length === 0) {
        otherChunksBeforeIdat.push({ type, data });
      } else {
        otherChunksAfterIdat.push({ type, data });
      }
    }
  }

  console.log(`PNG info: ${width}x${height}, colorType: ${colorType}, bitDepth: ${bitDepth}`);

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);

  // Cada linha começa com 1 byte de filter type
  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const rowBytes = 1 + width * bytesPerPixel;
  
  // Reconstruct unfilter (simplificado: unfilter linha por linha)
  // Vamos converter para RGBA
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  
  // Vamos criar um buffer desfiltrado linha por linha
  const unfiltered = Buffer.alloc(decompressed.length);
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowBytes;
    const filter = decompressed[rowStart];
    unfiltered[rowStart] = 0; // novo filter = 0 (None)
    
    for (let x = 0; x < width * bytesPerPixel; x++) {
      const raw = decompressed[rowStart + 1 + x];
      let val = raw;
      const bpp = bytesPerPixel;
      
      const left = x >= bpp ? unfiltered[rowStart + 1 + x - bpp] : 0;
      const up = y > 0 ? unfiltered[(y - 1) * rowBytes + 1 + x] : 0;
      const upLeft = (y > 0 && x >= bpp) ? unfiltered[(y - 1) * rowBytes + 1 + x - bpp] : 0;
      
      if (filter === 1) { // Sub
        val = (raw + left) & 0xff;
      } else if (filter === 2) { // Up
        val = (raw + up) & 0xff;
      } else if (filter === 3) { // Average
        val = (raw + Math.floor((left + up) / 2)) & 0xff;
      } else if (filter === 4) { // Paeth
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        let pr;
        if (pa <= pb && pa <= pc) pr = left;
        else if (pb <= pc) pr = up;
        else pr = upLeft;
        val = (raw + pr) & 0xff;
      }
      
      unfiltered[rowStart + 1 + x] = val;
    }
  }

  // Agora processamos os pixels no formato RGBA com Filter = 0
  const outRowBytes = 1 + width * 4;
  const outDecompressed = Buffer.alloc(height * outRowBytes);

  for (let y = 0; y < height; y++) {
    const inRow = y * rowBytes;
    const outRow = y * outRowBytes;
    outDecompressed[outRow] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      let r, g, b, a = 255;
      if (colorType === 6) { // RGBA
        r = unfiltered[inRow + 1 + x * 4];
        g = unfiltered[inRow + 1 + x * 4 + 1];
        b = unfiltered[inRow + 1 + x * 4 + 2];
        a = unfiltered[inRow + 1 + x * 4 + 3];
      } else if (colorType === 2) { // RGB
        r = unfiltered[inRow + 1 + x * 3];
        g = unfiltered[inRow + 1 + x * 3 + 1];
        b = unfiltered[inRow + 1 + x * 3 + 2];
      }

      // Detectar fundo claro (branco / offwhite / cinza claro do fundo)
      // O símbolo dourado tem tons amarelos/castanhos/dourados (r > b significativamente ou r,g,b escuro metálico)
      // O fundo é neutro e muito claro: r > 230, g > 230, b > 225 com baixa saturação (diff < 20)
      const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      const minVal = Math.min(r, g, b);
      const isPureBg = (minVal > 236 && diff < 16) || (minVal > 244 && diff < 22);
      const isSemiBg = minVal > 224 && diff < 14;

      if (isPureBg) {
        a = 0;
      } else if (isSemiBg) {
        // Transição suave
        const alphaFactor = Math.max(0, Math.min(1, (240 - minVal) / 16));
        a = Math.round(a * alphaFactor);
      }

      const outOffset = outRow + 1 + x * 4;
      outDecompressed[outOffset] = r;
      outDecompressed[outOffset + 1] = g;
      outDecompressed[outOffset + 2] = b;
      outDecompressed[outOffset + 3] = a;
    }
  }

  const newCompressed = zlib.deflateSync(outDecompressed, { level: 9 });

  // Montar novo PNG com IHDR (colorType = 6: RGBA)
  const ihdrBuf = Buffer.alloc(13);
  ihdrBuf.writeUInt32BE(width, 0);
  ihdrBuf.writeUInt32BE(height, 4);
  ihdrBuf[8] = 8; // bitDepth
  ihdrBuf[9] = 6; // RGBA
  ihdrBuf[10] = 0;
  ihdrBuf[11] = 0;
  ihdrBuf[12] = 0;

  function makeChunk(typeStr, dataBuf) {
    const len = dataBuf.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(typeStr, 4, 4, 'ascii');
    dataBuf.copy(chunk, 8);
    
    // CRC32
    const crc = crc32(chunk.slice(4, 8 + len));
    chunk.writeUInt32BE(crc >>> 0, 8 + len);
    return chunk;
  }

  // Tabela CRC32 padrão
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrChunk = makeChunk('IHDR', ihdrBuf);
  const idatChunk = makeChunk('IDAT', newCompressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const finalPng = Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, finalPng);
  console.log(`Sucesso: Logo gravada em ${outputPath} (${finalPng.length} bytes)`);
}

removeBackground(
  '/home/virtual/Área de trabalho/ARAS/public/images/logo-haras.png',
  '/home/virtual/Área de trabalho/ARAS/public/images/logo-haras-transparente.png'
);
