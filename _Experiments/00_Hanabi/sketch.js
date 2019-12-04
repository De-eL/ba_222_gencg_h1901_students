// Global var
  let rocketArray = [];
  let particleArray = [];
  let hasRun = false;
  var rocketCooldown = 50;

 class rocket {
  constructor() {
    this.speed = 28;
    this.x = random(0, width) + 50;
    this.y = height+this.speed * 2;
    this.diameter = random(15, 25);
    this.hasExploded = false;
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
    for (let i = 0; i < random(0, 50) + 50; i++) {
      particleArray[i] = new particle(this.x, this.y);
    }
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
    fill(204, 101, 192, 127);
    stroke(127, 63, 120);
    ellipse(this.x, this.y, this.d);
    this.d *= 0.985;
  }
 }

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight-45, WEBGL);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  rocketArray.push(new rocket());
}

function draw() {
  background(0);
  ambientLight(255);
  directionalLight(55, 0, 0, 0.25, 0.25, 0);
  rocketCooldown-=1;
  if (rocketCooldown < 0) {
    rocketArray.push(new rocket());
    rocketCooldown = 50;
  }
  for (var i = 0; i <= rocketArray.length - 1; i++) { 
    rocketArray[i].move();
    rocketArray[i].display();
    rocketArray[i].speed *= 0.97;
    rocketArray[i].diameter *= 0.98;
    if (rocketArray[i].speed < 0.25 && !rocketArray[i].hasExploded) {
      rocketArray[i].explode();
      rocketArray[i].hasExploded = true;
    }
  }



  if (particleArray.length > 0) {
  for (var i = 0; i <= particleArray.length - 1; i++) {
    particleArray[i].move();
    particleArray[i].display();
    particleArray[i].duration -= 1;
    if (particleArray[i].duration < 0) {
      
    }
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