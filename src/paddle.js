 class Paddle {
    constructor(game) {
        this.gameWidth=game.gameWidth;
        this.width = 150;
        this.height = 20;

        this.maxSpeed =7;
        this.speed=0;

        this.postion = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        }
    }


    moveLeft(){
        this.speed= -this.maxSpeed;
    }

    moveRight(){

        this.speed=this.maxSpeed;
    }

    stop(){
        this.speed=0;
    }

    draw(ctx) {
        ctx.fillStyle='#dfeb0b';
        ctx.fillRect(this.postion.x,this.postion.y,this.width,this.height);
    }


    update(deltaTime)
    {

        this.postion.x += this.speed;
        if(this.postion.x <0){
            this.postion.x=0;
        }
        if(this.postion.x+this.width > this.gameWidth){
            this.postion.x=this.gameWidth-this.width;
        }
        
    }
}