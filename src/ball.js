class Ball {
    constructor(gameWidth,gameHeight){
        this.image=document.getElementById("img-ball");
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.postion={
            x:10,y:10
        }
        this.speed={  
            x:2,y:2
        }
        this.size=30;
    }

    draw(ctx){
        ctx.drawImage(this.image,this.postion.x,this.postion.y,this.size,this.size );

    }

    update(deltaTime){
        this.postion.x += this.speed.x;
        this.postion.y += this.speed.y;
        
    }
}