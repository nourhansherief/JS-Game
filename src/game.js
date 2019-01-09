

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    WIN: 5,
    MAP: 6
};

class Game {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.shark = new Shark(this);
        this.paddle = new Paddle(this);
        new InputHandler(this.paddle, this);
        this.gameObjects = [];
        this.fishs = [];
        this.lives = 3;
        this.levels = [level1, level2, level3];
    
        if(localStorage.getItem("storedLevel")===null)
        {   
             localStorage.setItem("storedLevel",0);
        }

        this.currentLevel =parseInt( localStorage.getItem("storedLevel"));
        this.flag = 0;

    }



    start() {


        if (this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL && 
            this.gamestate !== GAMESTATE.MAP) return;

        
        if (this.currentLevel <= 2) {

            this.fishs = buildLevel(this, this.levels[localStorage.getItem("storedLevel")]);
            //make the current level appeare on the screen while playing 

            let inLevel=document.getElementById("inLevel");
            let levelToPrint =this.currentLevel+1;
           
            inLevel.textContent='Level     '+levelToPrint;
            
            this.shark.reset();
            this.gameObjects = [this.shark, this.paddle];
            
           this.gamestate = GAMESTATE.MAP;
                   
                    document.addEventListener('keydown', (event) => {
                        
                        if (event.keyCode === 32) {                        
                            this.gamestate = GAMESTATE.RUNNING;
                        }

                    });
            

        } else {
            
           
            this.gamestate = GAMESTATE.WIN;
            localStorage.setItem("storedLevel",0);
                

        }




    }

    update(deltaTime) {

        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.NEWLEVEL || 
            this.gamestate === GAMESTATE.WIN || 
            this.gamestate === GAMESTATE.MAP) return;


        if (this.fishs.length === 0) {
            this.gamestate = GAMESTATE.NEWLEVEL;
            (this.currentLevel)++;
     
            localStorage.setItem("storedLevel",this.currentLevel);
       
            if (this.currentLevel >= 3) {
               
                this.gamestate = GAMESTATE.WIN;
                localStorage.setItem("storedLevel",0);
               
        
            }
         /*   document.addEventListener('keydown', (event) => {
             
                if (event.keyCode === 13) {

              
                    this.gamestate = GAMESTATE.MAP;
                  
                    document.addEventListener('keydown', (event) => {
                       
                        if (event.keyCode === 32) {       
                            this.start();
                         }
                    });  
                }

            });*/
            
        }
        [...this.gameObjects, ...this.fishs].forEach(object => object.update(deltaTime));
        this.fishs = this.fishs.filter(fish => !fish.markedForDeletion);
    }





    draw(ctx) {
        [...this.gameObjects, ...this.fishs].forEach(object => object.draw(ctx));

        if (this.gamestate === GAMESTATE.WIN) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(10, 46, 104)";
            ctx.fill();
            ctx.font = "50px WaltographRegular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            let winner = document.getElementById('img-winner');
            ctx.drawImage(winner, 260, 100, 320, 360);
            
            ctx.fillText("CONGRATULATIONS", this.gameWidth / 2, 80);
            ctx.fillText("Press space to Replay !!!", this.gameWidth / 2, 520);
            document.addEventListener('keydown', (event) => {
                //alert(event.keyCode);
                if (event.keyCode === 32) {
                 
                    location.reload();

                }

            });

        }
        if (this.gamestate === GAMESTATE.MAP) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,0.8)";
            ctx.fill();
            ctx.font = "50px WaltographRegular";
            ctx.fillStyle = "rgb(10, 46, 104)";
            ctx.textAlign = "center";
           if (this.currentLevel === 0) {
                let map0 = document.getElementById('img-map1');
                ctx.drawImage(map0, 0, 0, this.gameWidth, this.gameHeight);
            }
            if (this.currentLevel === 1) {
                let map1 = document.getElementById('img-map2');
                ctx.drawImage(map1, 0, 0, this.gameWidth, this.gameHeight);
            }
            if (this.currentLevel === 2) {
                let map2 = document.getElementById('img-map3');
                ctx.drawImage(map2, 0, 0, this.gameWidth, this.gameHeight);
            }
            ctx.fillText("Press Space To Enter New Level !!! ", this.gameWidth / 2, 481);




        }

        if (this.gamestate === GAMESTATE.NEWLEVEL) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,0.8)";
            ctx.fill();
            ctx.font = "50px WaltographRegular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("press ENTER to know where are you?", this.gameWidth / 2, 450);
            if (this.currentLevel === 1) {
                let badge1 = document.getElementById('img-badge1');
                ctx.drawImage(badge1, 250, 70, 300, 300);
            }
            if (this.currentLevel === 2) {
                let badge2 = document.getElementById('img-badge2');
                ctx.drawImage(badge2, 250, 70, 300, 300);
            }

            document.addEventListener('keydown', (event) => {
             
                if (event.keyCode === 13) {

              
                    this.gamestate = GAMESTATE.MAP;
                  
                    document.addEventListener('keydown', (event) => {
                       
                        if (event.keyCode === 32) {       
                            this.start();
                         }
                    });  
                }

            });
 


        }

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,0.5)";
            ctx.fill();
            ctx.font = "50px WaltographRegular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
        }


        if (this.gamestate === GAMESTATE.MENU) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,1)";
            ctx.fill();
            ctx.font = "50px WaltographRegular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
 
            let lifes = document.getElementById("lives");
           
            if (this.flag === 0) {
                let i;
                for (i = this.lives; i > 0; i--) {
                    var node = document.createElement("LI");
                var _img = document.createElement('img');
                _img.src = "assets/imgs/heartL.png";
                _img.width = 40;
                _img.height = 40;
                node.appendChild(_img);
                lifes.appendChild(node);
               
                }
            }
            this.flag++;
           
            ctx.fillText("Press SPACEBAR To Start ", this.gameWidth / 2,481 );
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,1)";
            ctx.fill();
            ctx.font = "50px WaltographRegular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            let loser = document.getElementById('img-loser');
            ctx.drawImage(loser, 260, 80, 400, 400);
            ctx.fillText("LOSER", this.gameWidth / 2, 80);
            ctx.fillText("Press space to Try Again !!!", this.gameWidth / 2, 520);

            document.addEventListener('keydown', (event) => {
                //alert(event.keyCode);
                if (event.keyCode === 32) {

                    location.reload();

                }

            });
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
