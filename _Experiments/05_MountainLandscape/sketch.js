var inc1 = 0.0019;
var start = 0;
const xAxis = 2;
const yAxis = 1;
var m1, m2, b1, b2; 

function setup() {
  p5.disableFriendlyErrors = true;
  canvas = createCanvas(windowWidth, windowHeight-45);
  canvas.parent("p5Container");
  var density = displayDensity();
  pixelDensity(density);
  m1 = color(119, 164, 76, 150); // 104,134,90
  m2 = color(218, 100, 43);
  b1 = color(191, 43, 70, 150);
  b2 = color(80, 235, 186, 155);
  o1 = color(255, 255, 255, 0);
  o2 = color(80, 235, 186, 155);
  backgroundcolor = color(118,105,128); // mousy wisteria
  mountain1color = color(59,52,41); // thousand year old brown
  mountain2color = color(83,74,50); // rikan brown
  mountain3color = color(77,75,58); // swooty willow bamboo
  mountain4color = color(69,77,50); // pine needle color
  mountain5color = color(82,89,59); // blue black crayfish

  background(backgroundcolor);
  noLoop();
}

function draw() {
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

function drawMountain(counter, color) {
  //setGradient(0, 0, width, height, m1, m2, yAxis); //Mtns
  noStroke();
  fill(color);
  beginShape();
  var xoff = start + 100 * counter;
  for (var x = 0; x < width; x++) {
    var y = noise(xoff) * 800 + height / 8 * counter;
    vertex(x, y)
    xoff += inc1
  }
  vertex(width, noise(xoff) * (800 - (100 * counter)))
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