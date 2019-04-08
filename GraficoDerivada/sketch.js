
let w = 600;
let h = 400;

function setup() {
  createCanvas(w,h);
  xScaleSlide = createSlider(0, 10, 10, .001);
  yScaleSlide = createSlider(0, 10, 1, .001);
} 
let x = -20;
let y = 0;
let timeStep = 0.2;

xAxisPoints = [];
yAxisPoints = [];




function drawGraph(){
  //background(144);
  textSize(5.8);
  let ScaledW = w * xScaleSlide.value();
  let ScaledH = h * yScaleSlide.value();
  print(ScaledH);
  line(-w / 2, 0, w / 2, 0);
  for(let i = -(ScaledW/2); i < ScaledW/2; i += (20 / xScaleSlide.value())){
    text(i, i * xScaleSlide.value(), 0); 
  }
  line(0, -h / 2, 0, h / 2);
  for(let i = -(ScaledH/2); i < ScaledH/2; i += (20 / yScaleSlide.value())){
    text(-i, 0, i * yScaleSlide.value()); 
  }
}

function draw() {
  translate(w / 2, h / 2);
  
  drawGraph();
  if (xAxisPoints.length <= 200) {
    y = -2 * (x ** 2) + x * 20 + 100;
    //y = 5*x**3 + 9*x**2;
    x += timeStep;
    xAxisPoints.push(x);
    yAxisPoints.push(y);
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
