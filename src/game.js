const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    Win:5
  };

  function make_base()
            {
                console.log("hiiiiiii");
                var canvas = document.getElementById('myCanvas'),
context = canvas.getContext('2d');
                base_image = new Image();
                base_image.src = './assets/imgs/badge0.jpg';
                base_image.onload = function(){
                    context.drawImage(base_image, 0, 0);
                }
            }
class Game{

    constructor(gameWidth,gameHeight){

        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.gamestate=GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        new InputHandler(this.paddle,this);
        this.gameObjects=[];
        this.bricks =[];
        this.lives =3;
        this.levels=[level1,level2,level3];
        this.currentLevel=0;

    }

    start(){ 

   
      if (this.gamestate !== GAMESTATE.MENU &&
        this.gamestate !== GAMESTATE.NEWLEVEL)  return;
        if(this.currentLevel <=2)
        {
            this.bricks= buildLevel(this,this.levels[this.currentLevel]);
            this.ball.reset();
            this.gameObjects = [this.ball,this.paddle ];
            
            this.gamestate = GAMESTATE.RUNNING ;

        }else
        {
            this.gamestate = GAMESTATE.Win;
        }
       


        
    }

    update(deltaTime){

        if (this.lives ===0 ) this.gamestate =GAMESTATE.GAMEOVER ;
        if(this.gamestate ===GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate ===GAMESTATE.GAMEOVER ||
            this.gamestate=== GAMESTATE.NEWLEVEL||this.gamestate === GAMESTATE.Win) return;


       if (this.bricks.length ===0)
        {
            this.gamestate = GAMESTATE.NEWLEVEL;
            (this.currentLevel)++ ; 
            if(this.currentLevel===3){
                this.gamestate = GAMESTATE.Win; 
            }
            document.addEventListener('keydown',(event)=>{
                //alert(event.keyCode);
                if(event.keyCode===69){
                    
                    //console.log(this.currentLevel);
                    
                   //console.log(game);
                   //console.log("hhhhhhhhhhhhhhhhhh");
                   this.start();
    
                }

        });}
        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
        this.bricks=this.bricks.filter(brick => !brick.markedForDeletion );
    }
      
    draw(ctx){
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        
        if (this.gamestate===GAMESTATE.Win)
        {
            
           ctx.rect(0, 0, this.gameWidth, this.gameHeight);
           ctx.fillStyle = "rgba(0,0,0)";
           ctx.fill();
           ctx.font = "30px Arial";
           ctx.fillStyle = "white";
           ctx.textAlign = "center";
           ctx.fillText("Congratulation! \n press space to restart",this.gameWidth / 2,450);
           let badge= document.getElementById('img-badge3');
           ctx.drawImage(badge,250,7,300,300);
           document.addEventListener('keydown',(event)=>{
            //alert(event.keyCode);
            if(event.keyCode===32){
                
                location.reload();

            }

    });

        }

        if (this.gamestate===GAMESTATE.NEWLEVEL)
        {
            
           ctx.rect(0, 0, this.gameWidth, this.gameHeight);
           ctx.fillStyle = "rgba(10, 46, 104,0.8)";
           ctx.fill();
           ctx.font = "30px Arial";
           ctx.fillStyle = "white";
           ctx.textAlign = "center";
           ctx.fillText("press  e to enter next level ",this.gameWidth / 2,450);
           if(this.currentLevel===1){
           let badge1= document.getElementById('img-badge1');
           ctx.drawImage(badge1,250,70,300,300);}
           if(this.currentLevel===2){
            let badge2= document.getElementById('img-badge2');
            ctx.drawImage(badge2,250,70,300,300);}
          // make_base();

            

        }
       
        if (this.gamestate === GAMESTATE.PAUSED ) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED",this.gameWidth / 2,this.gameHeight / 2);
        }
        
        if ( this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR To Start ",this.gameWidth / 2,this.gameHeight / 2);
        }

        if ( this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER ",this.gameWidth / 2,this.gameHeight / 2);
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
