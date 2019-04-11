
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
  xScaleSlide = createSlider(0, 200, 10, .001);
  yScaleSlide = createSlider(0, 200, 10, .001);
  derivadaCheck = createCheckbox('Desenhar derivada', false);
  derivadaCheck.changed(derivadaCheckChange);
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
  text(clickDx,-(w/2 * .9),-(h/2 * .62));
}

function draw() {
  translate(w / 2, h / 2);
  background(144);
  drawGraph();
  //parse da string --> node(math) --> code, posteriormente executado.
  //try and catch para capturar erros de parse na função.
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
        y = calcFxPoint(fxCode, x)
      }
      catch(e){
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
    //vertex(xAxisPoints[i] * xScale, -yAxisPoints[i] * yScale);
    point(xAxisPoints[i] * xScale, -yAxisPoints[i] * yScale);
  }
  endShape();

  //calculo da derivada
  if (dxAxisPoints.length <= 10000) {
    print(dxAxisPoints.length);
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
  if (drawDerivada == true) {
    beginShape();
    noFill();
    for (let i = 0; i < dxAxisPoints.length; i++) {
      xScale = xScaleSlide.value();
      yScale = yScaleSlide.value();
      //vertex(dxAxisPoints[i] * xScale, -dyAxisPoints[i] * yScale);
      point(dxAxisPoints[i] * xScale, -dyAxisPoints[i] * yScale);
      //point(dxAxisPoints[i] * xScale ,1);
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
  print(y);
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
