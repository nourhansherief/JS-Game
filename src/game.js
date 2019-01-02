const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
  };

class Game{

    constructor(gameWidth,gameHeight){

        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
    }

    start(){ 

        this.gamestate=GAMESTATE.RUNNING;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
       
        let Bricks= buildLevel(this,level1);
        
        this.gameObjects = [this.ball,this.paddle ,...Bricks];

        new InputHandler(this.paddle,this);
    }

    update(deltaTime){
        if(this.gamestate == GAMESTATE.PAUSED) return;
        this.gameObjects.forEach(object => object.update(deltaTime));
        this.gameObjects=this.gameObjects.filter(object => !object.markedForDeletion );
    }
      
    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
       
        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED",this.gameWidth / 2,this.gameHeight / 2);
        }

    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
          this.gamestate = GAMESTATE.RUNNING;
        } else {
          this.gamestate = GAMESTATE.PAUSED;
        }
      }
}
