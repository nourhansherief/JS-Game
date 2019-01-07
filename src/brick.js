class Brick{
    constructor(game,postion){

        this.image=document.getElementById("img-brick");

        this.game=game;
        
        this.postion = postion
    
        this.width = 80;
        this.height = 35;
    

    
    this.markedForDeletion = false;
}


update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }

    draw(ctx)
    {
        ctx.drawImage(this.image,this.postion.x,this.postion.y,this.width,this.height );

    }
}