
let w = 800;
let h = 600;
let xScaleSlide;
let yScaleSlide;
let fxInput;
let xI = -40;
let x = xI;
let y = 0;
let timeStep = 0.01;
let fx = "x + 11";
let clickFx = "";
xAxisPoints = [];
yAxisPoints = [];

function setup() {
  createCanvas(w,h);
  xScaleSlide = createSlider(0, 100, 10, .001);
  yScaleSlide = createSlider(0, 100, 10, .001);
  fxInput = createInput(fx);
  fxInput.input(fxChange);
  translate(w / 2, h / 2);
} 
function drawGraph(){
  textSize(5.8);
  fill(0);
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
  textSize(10);
  text(fx,-300,-250);
  text(clickFx,-300,-260);
    if (xAxisPoints.length <= 10000) {
    print(xAxisPoints.length);
    for (let i = 0; i < 200; i++) {
      try{
        y = eval(fx);
      }
      catch(e){
        fx = "texto não pode ser transformado em função matematica!"
      }
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

function fxChange(){
  print(this.value());
  fx = this.value();
  x = xI;
  y = 0;
  xAxisPoints = [];
  yAxisPoints = [];
}
function mouseReleased(){
  x = (mouseX - w/2) / xScaleSlide.value();
  print(x)
  y = eval(fx); 
  print(y);
  textSize(10);
  
  clickFx = `f(${x}) = ${y}`;
}




