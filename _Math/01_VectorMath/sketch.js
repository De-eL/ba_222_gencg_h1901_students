// Global var
let distances = [];
let maxDistance;
let spacer;
let vector = [];

function setup() {
  // Canvas setup
  p5.disableFriendlyErrors = true;
  canvas = createCanvas(windowWidth, windowHeight-45);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // var density = displayDensity();
  // pixelDensity(density);
  maxDistance = dist(width / 2, height / 2, width, height);
  for (let x = 0; x < width; x++) {
    distances[x] = []; // create nested array
    for (let y = 0; y < height; y++) {
      let distance = dist(width / 2, height / 2, x, y);
      distances[x][y] = (distance / maxDistance) * 255;
    }
  }
  spacer = 20;
  background(0);
}

function draw() {
  background(0);
  for (let x = 0; x < width; x += spacer) {
    for (let y = 0; y < height; y += spacer) {
      stroke(255, 255, 255);
      let v0 = createVector(x + spacer / 2, y + spacer / 2);
      let v1 = createVector(mouseX - x + spacer / 2, mouseY - y + spacer / 2);
      v1.normalize();
      drawLine(v0, v1.mult(10), 'white');
    }
  }
}

function drawLine(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(1.5);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  pop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}