// Global var
let rocketArray = [];
let particleArray = [];
let hasRun = false;
var rocketCooldown = 30;

class rocket {
constructor() {
  this.speed = 28 + random(-13, 5);
  this.x = random(0, width/1.5) - 500;
  this.y = height+this.speed * 2;
  this.diameter = random(15, 25);
  this.hasExploded = false;
}
move() {
  this.y -= this.speed;
}
display() {
  fill(234, 151, 192);
  stroke(127, 63, 120);
  ellipse(this.x, this.y, this.diameter, 2 * this.diameter);
}
explode() {
  for (let i = 0; i < random(0, 50) + 50; i++) {
    particleArray.push(new particle(this.x, this.y));
  }
  let index = rocketArray.indexOf(this);
  rocketArray.splice(index, 1);
}
}

class particle {
constructor(x, y) {
  this.x = x;
  this.y = y;
  this.d = random(4, 6);
  this.vx = random(-2, 2);
  this.vy = random(1, 3);
}
move() {
  this.x += this.vx;
  this.y -= this.vy;
  this.vy -= 0.05;
  if (this.vx < -0.1) {
    this.vx += 0.005;
  }
  if (this.vx > 0.1) {
    this.vx -= 0.005;
  }
}
display() {
  fill(204 + random(-20, 20), 101 + random(0, 50), 192, 127 + random(-50, 50));
  stroke(127, 63, 120);
  ellipse(this.x, this.y, this.d);
  this.d *= 0.985;
  if (this.d < 0.1) {
    let index = particleArray.indexOf(this);
    particleArray.splice(index, 1);
  }
}
}

function setup() {
// Canvas setup
p5.disableFriendlyErrors = true;
canvas = createCanvas(windowWidth, windowHeight-45, WEBGL);
canvas.parent("p5Container");
// Detect screen density (retina)
var density = displayDensity();
pixelDensity(density);
rocketArray.push(new rocket());
}

function draw() {
background('rgba(196,6,126, 0.20)');
rocketCooldown-=1;

if (rocketCooldown < 0) {
  rocketArray.push(new rocket());
  rocketCooldown = 30;
  console.log(rocketArray.length + " rockets.");
  console.log(particleArray.length + " particles.");
}
for (let rocket of rocketArray) {
  rocket.move();
  rocket.display();
  rocket.speed *= 0.97;
  rocket.diameter *= 0.98;
  if (rocket.speed < 0.25 && !rocket.hasExploded) {
    rocket.explode();
    rocket.hasExploded = true;
  }
}

if (particleArray.length > 0) {
for (var i = 0; i <= particleArray.length - 1; i++) {
  particleArray[i].move();
  particleArray[i].display();
}
}
}

function keyPressed() {
if (keyCode === 32) setup(); // 32 = Space
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
