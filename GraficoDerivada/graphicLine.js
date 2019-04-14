class GraphicLine{
    constructor(fx, graphic, color){
        this.fx = fx;
        this.graphic = graphic;
        this.h = graphic.h;
        this.w = graphic.w;
        this.graphic.expressions.push(this);
        this.xScale = this.graphic.xScale;
        this.yScale = this.graphic.yScale;
        this.xAxisPoints = []
        this.yAxisPoints = []
        this.fxCode;
        this.fxNode;
        if(color != undefined){
            this.color = color;
        }
        else{
            this.color = 0;
        }
    }

    Calc() {
        this.xAxisPoints = [];
        this.yAxisPoints = [];
        let iX = ((-this.w/2) / this.xScale);
        let finalX = ((this.w/2) / this.xScale);
        let time = -(iX - finalX);
        let timeStep = time / 5000; 
        let steps = time / timeStep;
        let x = iX;
        //console.log(x)
        let y = 0;
        try {
            this.fxNode = math.parse(this.fx);
            this.fxCode = this.fxNode.compile();
        } catch (e) {}
        if (steps < Infinity) {
            for (let i = 0; i < steps; i++) {
                try {
                    y = calcFxPoint(this.fxCode, x)
                } catch (e) {
                    fx = "Texto não pode ser convertido em função!"
                }
                x += timeStep;
                this.xAxisPoints.push(x);
                this.yAxisPoints.push(y);
            }
        }

    }
    
    Draw(){
        strokeWeight(1);
        beginShape();
        noFill();
        stroke(this.color)
        for (let i = 0; i < this.xAxisPoints.length; i++) {
          vertex(this.xAxisPoints[i] * this.xScale, -this.yAxisPoints[i] * this.yScale);
         //point(xAxisPoints[i] * xScale, -yAxisPoints[i] * yScale);
        }
        endShape();
    }

    CalcFxPoint(x){
        let functionCode = this.fxCode;
        let scope = { x: x }
        return functionCode.eval(scope);
    }
    SetScale(xScale, yScale){
        this.xScale = xScale;
        this.yScale = yScale;
    }
}