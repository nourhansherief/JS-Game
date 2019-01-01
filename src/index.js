//import * as Paddle from "/src/paddle";

//import paddle from 'paddle';

let canvas = document.getElementById("myCanvas");

let ctx = canvas.getContext("2d");
console.log(ctx);

const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;


ctx.clearRect(0, 0, 800, 600);

// Create gradient
var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
//ctx.fillStyle = grd;
//ctx.fillRect(10,10,150,80);

// Fill with gradient
ctx.fillStyle = '#ff f';
//ctx.fillRect(300,300,70,60);


let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball =new Ball(GAME_WIDTH,GAME_HEIGHT);

paddle.draw(ctx);
new InputHandler(paddle);
let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH,GAME_HEIGHT);
    paddle.update(deltaTime);
    paddle.draw(ctx);
    ball.update(deltaTime);  
    ball.draw(ctx);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);