
let w = (window.innerWidth * .80);
let h = (window.innerHeight * .70);
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
  var canvas = createCanvas(w,h);
  canvas.parent("sketch-holder")
  graph1 = new Graphic();
  func1 = new GraphicLine("sin(x)", graph1);
  xScaleSlide = createSlider(0, 200, 10, .001);
  yScaleSlide = createSlider(0, 200, 10, .001);
  derivadaCheck = createCheckbox('Desenhar derivada', false);
  derivadaCheck.changed(derivadaCheckChange);
  //Codigo em manutenção
  //função de calculo da derivada para qualquer linha do grafico
  //log(calcDerivada(func1));
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

function fxInputChange(){
  let element = document.getElementById("fxinput")
  func1.ChangeFx(element.value);
}

function derivadaCheckChange(){
  drawDerivada = !drawDerivada;
}

//TODO função para calcular derivada de qualquer linha do grafico
function calcDerivada(GraphicLine){
  let dfx = math.derivative(GraphicLine.fx, x);
  return dfx;
}


//Exibir o resultado da função matematica onde o mouse clicou por ultimo
/*
não esta funciando, por enquanto
*/
// let clickFx = "";
// let clickDx = "";
// function mouseReleased(){
//   x = (mouseX - w/2) / xScaleSlide.value();
//   let scope = {x:x}
//   y = fxCode.eval(scope);
//   clickFx = `f(${x}) = ${y}`;
//   y = dxCode.eval(scope);
//   clickDx = `f'(${x}) = ${y}`
// }