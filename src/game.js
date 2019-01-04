class Game{

    constructor(gameWidth,gameHeight){

        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
    }

    start(){ 
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);

        let brick = new Brick(this, {x:20,y:20});   //brick

        this.gameObjects = [this.ball,this.paddle ,brick];

        new InputHandler(this.paddle);
    }

    update(deltaTime){
        this.gameObjects.forEach((Object) => Object.update(deltaTime));
    }
      
    draw(ctx){
        this.gameObjects.forEach((Object) => Object.draw(ctx));

    }
}
