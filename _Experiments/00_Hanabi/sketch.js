// Global var
  let rocket1;


 class rocket {
  constructor() {
    this.x = width/2;
    this.y = height;
    this.diameter = random(5, 15);
    this.speed = 5;
  }
  move() {
    this.y -= this.speed;
  }
  display() {
    ellipse(this.x, this.y, this.diameter, 2*this.diameter);
  }
  explode() {
    for (let i = 0; i < random(0, 10) + 10; i++) {

    }
  }
 }

 class particle() {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = random(4, 6);
  }
  move() {

  }
 }

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight-45);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  rocket1 = new rocket();
}

function draw() {
  background(0);
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);
  rocket1.move();
  rocket1.display();
  rocket1.speed *= 0.99;
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