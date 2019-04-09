
let w = 600;
let h = 400;

function setup() {
  createCanvas(w,h);
  xScaleSlide = createSlider(0, 100, 10, .001);
  yScaleSlide = createSlider(0, 100, 10, .001);
  translate(w / 2, h / 2);
} 
let x = -3;
let y = 0;
let timeStep = 0.008;

xAxisPoints = [];
yAxisPoints = [];




function drawGraph(){
  textSize(5.8);
  fill(0)
  line(-w / 2, 0, w / 2, 0);
  for(let i = -(w/2); i < w/2; i += (20 / xScaleSlide.value())){
    text(i.toFixed(1), i * xScaleSlide.value(), 0); 
  }
  line(0, -h / 2, 0, h / 2);
  for(let i = -(h/2); i < h/2; i += (20 / yScaleSlide.value())){
    text(-i.toFixed(1), 0, i * yScaleSlide.value()); 
  }
}

function draw() {
  translate(w / 2, h / 2);
  background(144);
  drawGraph();
  
  if (xAxisPoints.length <= 20000) {
    for (let i = 0; i < 400; i++) {
      y = 5*x**3 + 9*x**2;
      //y = -2 * (x ** 2) + 2 * x + 1;
      x += timeStep;
      xAxisPoints.push(x);
      yAxisPoints.push(y);
    }
  }
  beginShape();
  noFill();
  for (let i = 0; i < xAxisPoints.length; i++) {
    xScale = xScaleSlide.value();
    yScale = yScaleSlide.value();
    vertex(xAxisPoints[i] * xScale, -yAxisPoints[i] * yScale);
  }
  endShape();
}
