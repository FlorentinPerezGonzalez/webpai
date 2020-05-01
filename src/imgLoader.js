const pieceImg = Object.create(null);

pieceImg.alfilB = new Image();
pieceImg.alfilN = new Image();
pieceImg.peonB = new Image();
pieceImg.peonN = new Image();
pieceImg.torreN = new Image();
pieceImg.torreB = new Image();
pieceImg.caballoB = new Image();
pieceImg.caballoN = new Image();
pieceImg.reyB = new Image();
pieceImg.reyN = new Image();
pieceImg.reinaB = new Image();
pieceImg.reinaN = new Image();

let imgCounter = 0;

for (const key in pieceImg) {
  pieceImg[key].src = `./../img/${key}.png`;
  pieceImg[key].addEventListener('load', function() {
    imgCounter++;
  });
}

function waitCharge(toDoFunction) {
  if (imgCounter !== 12) {
    setTimeout(function() {waitCharge(toDoFunction)}, 50);
    return;
  }
  toDoFunction();
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.imgLoader = {};
  exports.imgLoader.waitCharge = waitCharge;
  exports.imgLoader.pieceImg = pieceImg;
} else { 
  window.imgLoader = {};
  window.imgLoader.waitCharge = waitCharge;
  window.imgLoader.pieceImg = pieceImg;
}
