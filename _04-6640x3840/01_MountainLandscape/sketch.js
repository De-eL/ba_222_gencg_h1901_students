var inc1;
var inc2;
var inc3;
var inc4;
var inc5;
var start = 0;
const xAxis = 2;
const yAxis = 1;

function setup() {
  p5.disableFriendlyErrors = true;
  canvas = createCanvas(windowWidth, windowHeight-45);
  canvas.parent("p5Container");
  var density = displayDensity();
  pixelDensity(density);
  o1 = color(255, 255, 255, 0);
  o2 = color(80, 235, 186, 155);

  inc1 = height / 426666.666 // 0.0090;
  inc2 = height / 548571.428 // 0.0070;
  inc3 = height / 768000  // 0.0050;
  inc4 = height / 1280000   // 0.0030;
  inc5 = height / 3840000  // 0.0010; 

  backgroundcolor = color(118,105,128); // mousy wisteria
  mountain1color = color(69,62,51); // thousand year old brown
  mountain2color = color(63,64,40); // rikan brown
  mountain3color = color(77,75,58); // swooty willow bamboo
  mountain4color = color(69,77,50); // pine needle color
  mountain5color = color(82,89,59); // blue black crayfish

  background(backgroundcolor);
  drawMountain(1, mountain1color);
  setGradient(0, 400, width, height, o1, o2, yAxis);
  drawMountain(2, mountain2color);
  setGradient(0, 400, width, height, o1, o2, yAxis);
  drawMountain(3, mountain3color);
  setGradient(0, 400, width, height, o1, o2, yAxis);
  drawMountain(4, mountain4color);
  setGradient(0, 400, width, height, o1, o2, yAxis);
  drawMountain(5, mountain5color);
  setGradient(0, 400, width, height, o1, o2, yAxis);
}

function draw() {

}

function drawMountain(counter, color) {
  //setGradient(0, 0, width, height, m1, m2, yAxis); //Mtns
  noStroke();
  fill(color);
  beginShape();
  var xoff = start - height / 38.4 * counter;
  for (var x = 0; x <= width; x+=height/384) {
    var y = noise(xoff) * height / 6.4 + height / (height / 384) * counter;
    vertex(x, y)
    switch (counter) {
      case 1:
        xoff += inc1 
        break;
      case 2:
        xoff += inc2 
        break;
      case 3:
        xoff += inc3
        break;
      case 4:
        xoff += inc4
        break;
      case 5:
        xoff += inc5
        break;
      default:
        break;
    } 
  }
  vertex(width, height)
  vertex(0, height)
  endShape();
  start += inc1;
}

function setGradient(x, y, w, h, m1, m2, axis) {
  if (axis == yAxis) {
    for (var i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(m1, m2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}