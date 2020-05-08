const CANVAS = document.getElementById('canvas');
const CONTEXT = CANVAS.getContext("2d");
console.log(CANVAS.height);
CANVAS.width = window.innerWidth * 2 / 3;
CANVAS.height = window.innerHeight * 3 / 4;
console.log(CANVAS.height);