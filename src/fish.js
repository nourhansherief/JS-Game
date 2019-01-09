class Fish{
    constructor(game,postion){

        this.image=document.getElementById("img-fish");

        this.game=game;
        
        this.postion = postion
    
        this.width = 80;
        this.height = 35;
    

    
    this.markedForDeletion = false;
}


update() {
    if (detectCollision(this.game.shark, this)) {
        var x = document.getElementById("myAudio"); 
        x.play();
      this.game.shark.speed.y = -this.game.shark.speed.y;

      this.markedForDeletion = true;
    }
  }

    draw(ctx)
    {
        ctx.drawImage(this.image,this.postion.x,this.postion.y,this.width,this.height );

    }
}