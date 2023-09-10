const ctx = myCanvas.getContext("2d");
const chartCtx = chartCanvas.getContext("2d");

const offset={
    x:myCanvas.width/2,
    y:myCanvas.height/2
};

const chartOffset={
    x:chartCanvas.width/2,
    y:chartCanvas.height/2
};

let theta = Math.PI/4;
const c=100;


const A = {x:0,y:0};
const B = {
    x:Math.cos(theta)*c,
    y:Math.sin(theta)*c
};
const C = {x:B.x,y:0};


// points
ctx.translate(offset.x,offset.y);
chartCtx.translate(chartOffset.x,chartOffset.y);

drawCoordinateSystem(chartCtx,chartOffset);

update();

document.onwheel=(event)=>{
    theta -=toRad(Math.sign(event.deltaY));
    B.x = Math.cos(theta)*c;
    B.y = Math.sin(theta)*c;

    C.x = B.x;

  

   update();
}

function update(){

    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const tan = Math.tan(theta);

   

    const T = {
        x: Math.sign(cos)*Math.hypot(1,tan)*c,
        y:0
    };

    ctx.clearRect(-offset.x,-offset.y, myCanvas.width,myCanvas.height);


    drawCoordinateSystem(ctx,offset);

    drawText(
        'sin  = '+sin.toFixed(2),
        {x:-offset.x/1.2, y:offset.y*0.7},
        "red"
    );
    drawText(
        'cos  = '+cos.toFixed(2),
        {x:-offset.x/1.2, y:offset.y*0.8},
        "blue"
    );
    drawText(
        'tan  = '+tan.toFixed(2),
        {x:-offset.x/1.2, y:offset.y*0.9},
        "magenta"
    );
    
    drawText(
        'Q = '+theta.toFixed(2)+"("+Math.round(toDeg(theta)).toString().padStart(2," ")+"o)",
        {x:offset.x/5, y:offset.y*0.7}
    );
    
    drawLine(A,B);
    drawText("1",average(A,B));
    drawLine(A,C,"blue");
    drawText("cos",average(A,C),"blue");
    drawLine(B,C,"red");
    drawText("sin",average(B,C),"red");
    drawLine(B,T,"magenta");
    drawText("tan",average(B,T),"magenta");

    drawText("Q",A);

    ctx.beginPath();
    ctx.strokeStyle="black";
    ctx.lineWidth=2;

    // const start = B.x>A.x?0:Math.PI;
    // const clockwise=B.y<C.y^B.x>A.x;
    // let end=B.y<C.y?-theta:theta;
    // if(B.x<A.x){
    //     end=Math.PI-end;
    // }
    ctx.arc(0,0,c,0,theta,theta<0);
    ctx.stroke();

    const chartScaler = chartOffset.y*0.5;

    drawPoint({
        x:theta*chartScaler,
        y:sin*chartScaler
    },2,"red");

    drawPoint({
        x:theta*chartScaler,
        y:cos*chartScaler
    },2,"blue");

    drawPoint({
        x:theta*chartScaler,
        y:tan*chartScaler
    },2,"magenta");
}

function toRad(deg){
        return deg*Math.PI/180;
    }
function toDeg(rad){
        return rad*180/Math.PI;
    }
    // drawPoint(A);
    // drawText("A",A);
    // drawPoint(B);
    // drawText("B",B);
    // drawPoint(C);
    // drawText("C",C);


function average(p1,p2){
    return {
        x:(p1.x+p2.x)/2,
        y:(p1.y+p2.y)/2
    };
}

function distance(p1,p2){
    return Math.hypot(p1.x-p2.x,p1.y-p2.y);
}
function drawText(text,loc,color="black"){
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.tectAlign="center";
    ctx.textBaseline="middle";
    ctx.font = "bold 18px Courier";
    ctx.strokeStyle="white";
    ctx.lineWidth=7;
    ctx.strokeText(text,loc.x,loc.y);
    ctx.fillText(text,loc.x,loc.y);
}
function drawPoint(loc,size=20,color="red"){
    chartCtx.beginPath();
    chartCtx.fillStyle=color;
    chartCtx.arc(loc.x,loc.y,size/2,0,Math.PI*2);
    chartCtx.fill();
}

function drawLine(p1,p2, color="black"){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth=2;
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();
}

function drawCoordinateSystem(ctx,offset){
    ctx.beginPath();
    ctx.moveTo(-offset.x,0);
    ctx.lineTo(ctx.canvas.width-offset.x,0);
    ctx.moveTo(0,-offset.y);
    ctx.lineTo(0,ctx.canvas.height-offset.y);
    ctx.setLineDash([4,2]);
    ctx.lineWidth=1;
    ctx.strokeStyle="gray";
    ctx.stroke();
    ctx.setLineDash([]);
}
