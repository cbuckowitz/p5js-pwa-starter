
var x, y, w, h;


function setup() {
  createCanvas(windowWidth, windowHeight);

  windowResized();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  let m = Math.min(windowWidth, windowHeight) / 4;

  x = windowWidth / 2;
  y =  windowHeight / 2;
  w = m;
  h = m;

  background(220);

}


function draw() {

  if (mouseIsPressed) {
    fill(map(mouseX, 0, windowWidth, 0, 255), map(mouseY, 0, windowHeight, 0, 255),  0);
  } else {
    fill(0, map(mouseX, 0, windowWidth, 0, 255), map(mouseY, 0, windowHeight, 0, 255));
  }
  ellipse(mouseX, mouseY, 80, 80);  

}