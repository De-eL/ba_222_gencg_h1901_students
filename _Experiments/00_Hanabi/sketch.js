// Global var
  let rocket1;
  let particleArray = [];
  let hasRun = false;

 class rocket {
  constructor() {
    this.speed = 18;
    this.x = width/2;
    this.y = height+this.speed;
    this.diameter = random(5, 15);
  }
  move() {
    this.y -= this.speed;
  }
  display() {
    fill(204, 101, 192, 127);
    stroke(127, 63, 120);
    ellipse(this.x, this.y, this.diameter, 2 * this.diameter);
  }
  explode() {
    for (let i = 0; i < random(0, 10) + 10; i++) {
      particleArray[i] = new particle(this.x, this.y);
      console.log(particleArray[i]);
    }
  }
 }

 class particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = random(4, 6);
    this.vx = random(-2, 2);
    this.duration = random(1, 3);
  }
  move() {
    this.x += this.vx;
  }
  display() {
    fill(204, 101, 192, 127);
    stroke(127, 63, 120);
    ellipse(this.x, this.y, this.d, this.d);
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

  rocket1.move();
  rocket1.display();
  rocket1.speed *= 0.97;
  if (rocket1.speed < 0.15 && hasRun == false) {
    rocket1.explode();
    rocket1.diameter = 0;
    hasRun = true;
  }
  if (particleArray.length > 0) {
  for (var i = 0; i <= particleArray.length - 1; i++) {
    particleArray[i].move();
    particleArray[i].display();
    console.log("updating particles");
  }
}
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