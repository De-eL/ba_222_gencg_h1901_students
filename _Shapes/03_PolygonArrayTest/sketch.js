// Global var
var polygonArray = [];

class xSidedPolygon {
  constructor(sides) {
    this.x = random(width);
    this.y = random(height);
    this.sides = sides;
    this.diameter = random(10, 50);
    this.speed = random(this.diameter, this.diameter+5);
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.x = width/2;
      this.y = height/2;
    }
  }

  display() {
    polygon(this.x, this.y, this.diameter/2, this.sides);
  }
}
 
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight-45);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  for (i = 0; i < 30; i++) {
    polygonArray[i] = new xSidedPolygon(i/2)
  }
  frameRate(15);
}

function draw() {
  for (let i = 0; i < polygonArray.length; i++) {
    polygonArray[i].move();
    polygonArray[i].display();
  }
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
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