class Brick{
    constructor(game,postion){

        this.image=document.getElementById("img-brick");

        this.game=game;
        
        this.postion = postion
    
        this.width = 50;
        this.height = 30;
    }

    update(){

    }

    draw(ctx){
        ctx.drawImage(this.image,this.postion.x,this.postion.y,this.width,this.height );

    }
}