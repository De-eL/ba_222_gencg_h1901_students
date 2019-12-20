let system;
let particles = [];

class Particle {
  constructor(x, y, r, c1, c2, c3) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.amplitude;
    this.xDir;
    this.yDir;
    this.omega;
    this.xVel;
    this.yVel;
    this.hasExploded = false;
    this.c1 = c1
    this.c2 = c2
    this.c3 = c3
  }
  boundaryConstraints() {
    if (this.x < 0) {
      this.x = 0;
      this.xVel *= -1;
    }
    if (this.x > width) {
      this.x = width;
      this.xVel *= -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.yVel *= -1;
    }
    if (this.y > height) {
      this.y = height;
      this.yVel *= -1;
    }
  }
  randomParameter() {
    this.amplitude = random(height/64);
    this.xDir = random(360);
    this.yDir = random(360);
    this.omega = randomGaussian() * .5;
  }
  move() {
    if (this.r <= 0 && system.numParticles < 60 && !this.hasExploded) {
      this.hasExploded = true;
      this.explode(this.x, this.y);
    }
    this.xVel = cos(radians(this.xDir) * (noise(1) * 40)) * this.amplitude;
    this.yVel = sin(radians(this.yDir) * (noise(1) * 40)) * this.amplitude;
    this.x += this.xVel;
    this.y += this.yVel;
    this.xDir += this.omega;
    this.yDir += this.omega;
    if (this.r != 0) {
      this.r += random(-6, 5);
    }
    if (this.r <= 0) {
      this.r = 0;
    }  
    this.boundaryConstraints();  
}
  display() {
    colorMode(HSB, 360, 200, 100);
    noStroke();
    fill(this.c1);
    ellipse(this.x, this.y, this.r, this.r);
    fill(this.c2);
    ellipse(this.x, this.y, this.r / 2, this.r / 2);
    fill(this.c3);
    ellipse(this.x, this.y, this.r / 4, this.r / 4);
  }
  explode(x, y) {
    let r0 = random(2, 3);
    system.numParticles += r0;
    let r1 = random(width / 4, width / 4 * 2);
    let r2 = random(height / 4, height / 4 * 2);
    let temp = []
    for (let i = 0; i < r0; i++) {
      colorMode(HSB, 360, 200, 100);
      let color1 = color(50+random(-10,10), 100+random(-10,10), 100+random(-10,10));
      let color2 = color(50+random(-10,10), 50+random(-10,10), 100+random(-10,10));
      let color3 = color(50+random(-10,10),10+random(-10,10), 100+random(-10,10));
      temp[i] = new Particle(r1, r2, 75 + random(-25, 25), color1, color2, color3)
      temp[i].randomParameter();
      particles.push(temp[i]);
    }
  }
}

class ParticleSystem {
  constructor(numParticles) {
    this.numParticles = numParticles;
    colorMode(HSB, 360, 200, 100);
    this.c1 = color(50, 100, 100);
    this.c2 = color(50, 50, 100);
    this.c3 = color(50, 10, 100);
    for (let i = 0; i < numParticles; i++) {
      particles[i] = new Particle(random(width / 8, width / 4 * 2), random(height / 4, height / 4 * 2), 75, this.c1, this.c2, this.c3)
      particles[i].randomParameter();
    }
  }
  run() {
    for (let i = 0; i < this.numParticles; i++) {
      particles[i].move();
      particles[i].display();
    }
  }
}

function setup() {
  p5.disableFriendlyErrors = true;
  canvas = createCanvas(windowWidth, windowHeight - 45);
  canvas.parent("p5Container");
  var density = displayDensity();
  pixelDensity(density);

  backgroundcolor = color(118, 105, 128); // mousy wisteria
  mountain1color = color(69, 62, 51); // thousand year old brown
  mountain2color = color(63, 64, 40); // rikan brown
  mountain3color = color(77, 75, 58); // swooty willow bamboo
  mountain4color = color(69, 77, 50); // pine needle color
  mountain5color = color(82, 89, 59); // blue black crayfish

  system = new ParticleSystem(15);

  frameRate(60);
}

function draw() {
  fill('rgba(196,6,126, 0.20)')
  rect(0, 0, width, height);
  system.run();
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}
