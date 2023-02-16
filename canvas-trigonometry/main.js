
//https://www.youtube.com/watch?v=GDTHmH9mZWA&t=1481s
//Derek Banas

const RADIUS = 200;
const X_CIRCLE_CENTER =300;
const Y_CIRCLE_CENTER =300;

let canvas;
let ctx;

class MousePosition{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

let mousePos = new MousePosition(0,0);


document.addEventListener('DOMContentLoaded', setupCanvas, false);

function setupCanvas() {
  canvas = document.getElementById('my-canvas');
  ctx = canvas.getContext('2d');
  drawCanvas();
  canvas.addEventListener ("mousemove", reDrawCanvas);

}

function drawCanvas() {
  drawRectangle("#333", 5, 0, 0, 600, 600);
  drawCircle("#333", 1, X_CIRCLE_CENTER, Y_CIRCLE_CENTER, RADIUS, 0, 2 * Math.PI);
  drawLine("#333", 1, X_CIRCLE_CENTER, 0, X_CIRCLE_CENTER, 600);
  drawLine("#333", 1, 0, Y_CIRCLE_CENTER, 600, Y_CIRCLE_CENTER);

}

function reDrawCanvas(evt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas();
  getMousPosition(evt);
  drawTextAtPoint("X: " + mousePos.x, 15, 25);
  drawTextAtPoint("Y: " + mousePos.y, 15, 45);
  let angleOfMouseDegrees = getAngleUsingXandY(mousePos.x, mousePos.y);
  drawTextAtPoint("Degrees:  " + angleOfMouseDegrees, 15, 65);
  drawTriangle(angleOfMouseDegrees);
}

function drawRectangle(strokeColor, lineWidth, startX, startY, endX, endY) {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(startX, startY, endX, endY);
}

function drawCircle(strokeColor, lineWidth, xCircCenter, yCircCenter, radius, arcStart, arcEnd) {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.arc(xCircCenter, yCircCenter, radius, arcStart, arcEnd);
  ctx.stroke();
}

function drawLine(strokeColor, lineWidth, xStart, yStart, xEnd, yEnd) {
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
}

function drawTextAtPoint(text, x, y) {
  ctx.font = "15px Arial";
  ctx.fillText(text, x, y);
}

function getMousPosition(evt) {
  let canvasDimensions = canvas.getBoundingClientRect();
  mousePos.x = Math.floor(evt.clientX - canvasDimensions.left);
  mousePos.y = Math.floor(evt.clientY - canvasDimensions.top);
  mousePos.x -= 300;
  mousePos.y = -1 * (mousePos.y - 300);
  return mousePos;
}


function getAngleUsingXandY(x,y) {
  let adjacent = x;
  let opposite = y;
  return radiansToDegrees(Math.atan2(opposite, adjacent));
}

function radiansToDegrees(rad) {
  if(rad < 0){
    return (360.0 + (rad * (180/Math.PI))).toFixed(2);
  } else {
    return (rad * (180/Math.PI)).toFixed(2);
  }
}

function degreesToRadians(degree) {
  return degree * (Math.PI / 180);
}

function drawTriangle(angleDegrees) {
  ctx.moveTo(X_CIRCLE_CENTER, Y_CIRCLE_CENTER);
  //cosine = adjacent / hypotenuse
  let xEndPoint = X_CIRCLE_CENTER + RADIUS * Math.cos(degreesToRadians(angleDegrees));
  let yEndPoint = Y_CIRCLE_CENTER + RADIUS * -(Math.sin(degreesToRadians(angleDegrees)));

  drawTextAtPoint("Radians : " + degreesToRadians(angleDegrees).toFixed(2), 15, 85);
  ctx.lineTo(xEndPoint, yEndPoint);
  ctx.stroke();
  ctx.moveTo(xEndPoint, yEndPoint);
  ctx.lineTo(xEndPoint, 300);
  ctx.stroke();
  drawTextAtPoint("(" + xEndPoint.toFixed(2) + "," + yEndPoint.toFixed(2) + ")", xEndPoint + 10, yEndPoint - 10);

  let hypotenuseLength = getLineLength(X_CIRCLE_CENTER, Y_CIRCLE_CENTER, xEndPoint, yEndPoint);
  drawTextAtPoint("Hypo Length" + hypotenuseLength.toFixed(2), 15, 105);
  let oppositeLength = getLineLength(xEndPoint, yEndPoint, xEndPoint, 300)
  drawTextAtPoint("Oppo Length L" + oppositeLength.toFixed(2), 15, 125);
}

//Distance = √((x2 - x1)2 + (y2 - y1)2)
function getLineLength(x1, y1, x2, y2) {
  let xS = x2 - x1;
   xS = xS * xS;
   let yS = y2 - y1;
   yS = yS * yS;
   return Math.sqrt(xS + yS);
}
