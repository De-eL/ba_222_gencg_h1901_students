// Global var
let snowFlake; 
let nextX;
let nextY;

function setup() {
  p5.disableFriendlyErrors = true;
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight-45);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  snowFlake = new Snowflake(7 ,width/2, height/2);
  background(0);
  frameRate(1);
}

function draw() {

  snowFlake.drawNext();
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

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}

function getNextStep() {

}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snowflake {
  constructor(numberOfEdges, x, y) {
    this.numberOfEdges = numberOfEdges;
    this.oneStepDegrees = 360/numberOfEdges;
    this.pointArray = [];
    this.pointArray.push(new Point(x, y));
    this.baseLength = width/100;
    this.currentLevel = 1;
    this.stopIt = false;
  }

  drawNext() {
    if (this.pointArray.length > 1000) {
      this.stopIt = true;
    }
    if (this.stopIt == false) {
      this.pointArray.forEach(element => {
        fill(255, 255, 255);
        stroke(255, 255, 255);
        ellipse(element.x, element.y, width/400);
        let v0 = createVector(element.x, element.y);
        let v1 = createVector(width/15/(this.currentLevel/2) + random(15, width/200), 0);
        for (let i = 0; i < this.numberOfEdges; i++) {  
          drawLine(v0, v1, "White", radians(this.oneStepDegrees));
          if (random(0, 100) + this.currentLevel > 20) {
            
            snowFlake.pointArray.push(new Point(v1.x+element.x, v1.y+element.y));
          }
        }
        this.currentLevel -= -1; 
        
      });
    }

  }
}

function drawLine(base, vec, myColor, rotation) {
  push();
  stroke(myColor);
  strokeWeight(2);
  fill(myColor);
  translate(base.x, base.y);
  vec.rotate(rotation);
  line(0, 0, vec.x, vec.y);
  nextX = vec.x;
  nextY = vec.y;
  pop();
  
}