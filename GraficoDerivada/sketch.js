
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
let derivada;
let fxCode;
let dxCode;
let dxI = -40
let dx = dxI; 
let dy = 0;
let drawDerivada = false;
let derivadaCheck;
let graph1;
let func1;

xAxisPoints = [];
yAxisPoints = [];
dxAxisPoints = [];
dyAxisPoints = [];

//TODO
//Função global de plotagem
//tangente na função principal
//auto-zoom
//circulo apenas com função


function setup() {
  createCanvas(w,h);
  graph1 = new Graphic();
  func1 = new GraphicLine("sin(x)^tan(1)", graph1);
  func1 = new GraphicLine("x^tan(x)", graph1, color(255,0,0));
  xScaleSlide = createSlider(0, 200, 10, .001);
  yScaleSlide = createSlider(0, 200, 10, .001);
  derivadaCheck = createCheckbox('Desenhar derivada', false);
  derivadaCheck.changed(derivadaCheckChange);
  fxInput = createInput(fx);
  fxInput.input(fxChange);
  calcDerivada();
  translate(w / 2, h / 2);
}

function drawGraph(){
  fill(0);
  graph1.Draw();
  graph1.SetScale(xScaleSlide.value(),yScaleSlide.value());
}

function draw() {
  translate(w / 2, h / 2);
  background(144);
  drawGraph();
  //calculo da derivada
  if (dxAxisPoints.length <= 10000) {
    //print(dxAxisPoints.length);
    for (let i = 0; i < 200; i++) {
      try {
        dy = calcFxPoint(dxCode, dx);
      }
      catch (e) {
      }
      dx += timeStep;
      dxAxisPoints.push(dx);
      dyAxisPoints.push(dy);
    }
  }
  stroke(255,0,0);
  if (drawDerivada == true) {
    beginShape();
    noFill();
    for (let i = 0; i < dxAxisPoints.length; i++) {
      xScale = xScaleSlide.value();
      yScale = yScaleSlide.value();
      vertex(dxAxisPoints[i] * xScale, -dyAxisPoints[i] * yScale);
      //point(dxAxisPoints[i] * xScale, -dyAxisPoints[i] * yScale);
    }
    endShape();
  }
}

function calcFxPoint(fxCode, x){
  let functionCode = fxCode;
  let scope = { x: x }
  return functionCode.eval(scope);
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

function derivadaCheckChange(){
    drawDerivada = !drawDerivada;
}

function calcDerivada(){
  let f = math.parse(fx);
  let x = math.parse('x');        
  derivada = math.derivative(f, x);
  let scope = { x: (mouseX - w/2) / xScaleSlide.value()}
  dxCode = derivada.compile();
  y = dxCode.eval(scope)
  //print(y);
}


//Exibir o resultado da função matematica onde o mouse clicou por ultimo
let clickFx = "";
let clickDx = "";
function mouseReleased(){
  x = (mouseX - w/2) / xScaleSlide.value();
  let scope = {x:x}
  y = fxCode.eval(scope);
  clickFx = `f(${x}) = ${y}`;
  y = dxCode.eval(scope);
  clickDx = `f'(${x}) = ${y}`
}
