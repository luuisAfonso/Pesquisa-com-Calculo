class Graphic{
    constructor(){
        this.h = height;
        this.w = width;
        this.textSize = 5.8;
        this.yScale = 1;
        this.xScale = 1;
        this.expressions = [];
    }

    Draw() {
        stroke(1)
        strokeWeight(0.4)
        textSize(this.textSize);
        fill(0);
        line(-this.w / 2, 0, this.w / 2, 0);
        for(let i = -( ( this.w/2) / this.xScale ); i < ( ( this.w/2) / this.xScale ); i += ( 20 / this.xScale )){
          text(i.toFixed(1), i * this.xScale, -1); 
        }
        line(0, -this.h / 2, 0, this.h / 2);
        for(let i = -( ( this.h/2) / this.yScale ); i < ( ( this.h/2) / this.yScale ); i += ( 20 / this.yScale )){
          text(-i.toFixed(1), 1, i * this.yScale); 
        }
        textSize(10);
        text("y", 10, -(this.h * .92)/2);
        text("x", (this.w * .92)/2,10);
        this.CalcExpressions();
        this.RenderExpression();
    }

    CalcExpressions(){
        for(let i = 0; i < this.expressions.length; i++){
            this.expressions[i].Calc();
        }
    }

    RenderExpression(){
        for(let i = 0; i < this.expressions.length; i++){
            this.expressions[i].Draw();
        }
    }

    SetScale(xScale, yScale){
        this.xScale = xScale;
        this.yScale = yScale;
        for(let i = 0; i < this.expressions.length; i++){
            this.expressions[i].SetScale(xScale,yScale);
        }
    }
}