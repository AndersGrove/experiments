let canvas;
let c;

document.addEventListener('DOMContentLoaded', setupCanvas, false);

function setupCanvas() {
  canvas = document.getElementById('sin-waves');
  ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  wave();
  tide(0.5);
}

function wave() {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);

  for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.015) * 80);    
  }
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#0014ff";
  ctx.stroke();
}

function tide(percentage) {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.font = "46px Arial";
  ctx.fillStyle = "#f7c200";
  for (let i = 0; i <= (canvas.width * percentage); i++) {
    if (i = canvas.width * percentage) {
      ctx.fillText("↓", i, (canvas.height / 2 + Math.sin(i * 0.015) * 80) - 15) ;
    }
    
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#f7c200";
  ctx.stroke();
}