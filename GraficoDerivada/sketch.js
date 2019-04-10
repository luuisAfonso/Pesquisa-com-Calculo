
let w = 600;
let h = 400;
let xScaleSlide;
let yScaleSlide;
let fxInput;
let xI = -40;
let x = xI;
let y = 0;
let timeStep = 0.01;
let fx = "x^2";
let clickFx = "";
let derivada;
let fxCode;
let fDerivadaCode;
let dxI = -40
let dx = dxI; 
let dy = 0;
xAxisPoints = [];
yAxisPoints = [];
dxAxisPoints = [];
dyAxisPoints = [];

function setup() {
  createCanvas(w,h);
  xScaleSlide = createSlider(0, 200, 10, .001);
  yScaleSlide = createSlider(0, 200, 10, .001);
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
  textSize(10);
  text("y", 10, -(h * .92)/2);
  text("x", (w * .92)/2,10);
  text(fx,-(w/2 * .9) ,-(h/2 * .83));
  text(clickFx,-(w/2 * .9),-(h/2 * .76));
  text(`f'(x) = ${derivada}`,-(w/2 * .9),-(h/2 * .69) )
}

function draw() {
  translate(w / 2, h / 2);
  background(144);
  drawGraph();
  try {
    fxNode = math.parse(fx);
  } catch (e) {
    console.log(e)
  }
  try {
    fxCode = fxNode.compile();
  } catch (e) {
    console.log(e)
  }
  //calculo da função comum
    if (xAxisPoints.length <= 10000) {
    for (let i = 0; i < 200; i++) {
      try{
        let scope = {x:x}
        y = fxCode.eval(scope);
      }
      catch(e){
        console.log(e);
        fx = "Texto não pode ser convertido em função!"
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
    //point(xAxisPoints[i] * xScale, -yAxisPoints[i] * yScale);
  }
  endShape();

  //calculo da derivada
  //  if (dxAxisPoints.length <= 10000) {
  //    print(dxAxisPoints.length);
  //    for (let i = 0; i < 200; i++) {
  //      try{
  //        let scope = {x:dx}
  //        dy = fDerivadaCode.eval(scope);
  //      }
  //      catch(e){
  //        console.log(e);
  //      }
  //      dx += timeStep;
  //      dxAxisPoints.push(dx);
  //      dyAxisPoints.push(dy);
  //    }
  //  }
  //  beginShape();
  //  noFill();
  //  for (let i = 0; i < dxAxisPoints.length; i++) {
  //    xScale = xScaleSlide.value();
  //    yScale = yScaleSlide.value();
  //    vertex(dxAxisPoints[i] * xScale, -dyAxisPoints[i] * yScale);
  //    //point(dxAxisPoints[i] * xScale, -dyAxisPoints[i] * yScale);
  //    //point(dxAxisPoints[i] * xScale ,1);
  //  }
  //  endShape();
}

function fxChange(){
  fx = this.value();
  x = xI;
  y = 0;
  dx = dxI;
  dy = 0;
  xAxisPoints = [];
  yAxisPoints = [];
  dxAxisPoints = [];
  dyAxisPoints = [];
  calcDerivada();
}

function calcDerivada(){
  let f = math.parse(fx);
  let x = math.parse('x');        
  derivada = math.derivative(f, x);
  let scope = { x: (mouseX - w/2) / xScaleSlide.value()}
  fDerivadaCode = derivada.compile();
  y = fDerivadaCode.eval(scope)
  print(y);
}

function mouseReleased(){
  x = (mouseX - w/2) / xScaleSlide.value();
  let scope = {x:x}
  y = fxCode.eval(scope);
  textSize(10);
  clickFx = `f(${x}) = ${y}`;
}