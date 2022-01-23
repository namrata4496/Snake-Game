const board=document.getElementById("myCanvas");
let context=board.getContext("2d");
const square=20;
const squareSize=board.width/square-2;

class snakepart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let headX=10;
let headY=10;
let score=0;

const snakeparts=[];
let tailLength=2;
let speed =4;
let foodX=5;
let foodY=5;

let xV=0,yV=0;

function drawgame(){
    changePosition();
    let result=isGameOver();
    if(result){
        return;
    }
    cleargame();  
    checkCollition() 
    drawfood();   
    
    drawsnake();    
    drawScore();
    if(score>3&&score<=8)
speed=7;
 if(score>8&&score<=15)
speed=15;
 if(score>15)
speed=18;
    setTimeout(drawgame,1000/speed);
}

function isGameOver(){
    if(xV==0&&yV==0){
        return false;
    }
    let gameOver=false;
    
    if(headX<0){
        gameOver=true;
    }
    else if(headX===20){
        gameOver=true;
    }
    else if(headY<0){
        gameOver=true;
    }
    else if(headY===20){
        gameOver=true;
    }
    for(let i=0;i<snakeparts.length;i++){
        let part=snakeparts[i];
        if(part.x===headX&&part.y===headY){
            gameOver=true;
            console.log("oo");
            break;
        }
    }
    if(gameOver){
    context.fillStyle="white";
    context.font="50px varanda";
    context.fillText("Game Over!",70,board.height/2+10);
    }
    return gameOver;

}

function cleargame(){
    context.fillStyle="green";
    context.fillRect(0,0,board.width,board.height);
}


function changePosition(){
    headX=headX+xV;
    headY=headY+yV;
}

function drawScore(){
    context.fillStyle="white";
    context.font="20px veranda";
    context.fillText("score:"+score,board.width-70,20);

}

function drawsnake(){
    context.fillStyle="orange";
    for(let i=0;i<snakeparts.length;i++){
        let part=snakeparts[i];
        context.fillRect(part.x*square,part.y*square,squareSize,squareSize);
    }
    
    snakeparts.push(new snakepart(headX,headY));
    if(snakeparts.length>tailLength){
        snakeparts.shift();
    }


context.fillStyle="black";
context.fillRect(headX*square,headY*square,squareSize,squareSize);
}

function drawfood(){
    context.fillStyle="red";
    context.fillRect(foodX*square,foodY*square,squareSize,squareSize);
}

const sound=new Audio("gulp.mp3");

function checkCollition(){
    if(foodX===headX&&foodY==headY){
        foodX=Math.floor(Math.random()*20);
        foodY=Math.floor(Math.random()*20);
        tailLength++;
        score++;
        sound.play();
    }
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event){
    
   if(event.keyCode==38&&yV!=1){
       xV=0;
       yV=-1;
   }
   if(event.keyCode==37&&xV!=1){
    xV=-1;
    yV=0;
}
if(event.keyCode==40&&yV!=-1){
    xV=0;
    yV=1;
}
if(event.keyCode==39&&xV!=-1){
    xV=1;
    yV=0;
}
}


drawgame();