//import * as Paddle from "/src/paddle";

//import paddle from 'paddle';

let canvas = document.getElementById("myCanvas");

let ctx = canvas.getContext("2d");
//console.log(ctx);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH,GAME_HEIGHT);



ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

// Create gradient
var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
//ctx.fillStyle = grd;
//ctx.fillRect(10,10,150,80);

// Fill with gradient
ctx.fillStyle = '#fff';
//ctx.fillRect(300,300,70,60);


game.paddle.draw(ctx);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    ctx.clearRect(0, 0, GAME_WIDTH,GAME_HEIGHT);
    
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
