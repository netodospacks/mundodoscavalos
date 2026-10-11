const fs = require('fs');
const { createCanvas, loadImage } = (() => {
  try {
    return require('canvas');
  } catch (e) {
    return {};
  }
})();

// Se não tiver canvas instalado, usaremos processamento binário ou SVG
console.log('Verificando ambiente...');
