const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    Win: 5,
    MAP: 6
};

class Game {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        new InputHandler(this.paddle, this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;
        this.levels = [level1, level2, level3];
        this.currentLevel = 0;
        this.flag = 0;

    }



    start() {


        if (this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL && this.gamestate !== GAMESTATE.MAP) return;
        if (this.currentLevel <= 2) {
            this.bricks = buildLevel(this, this.levels[this.currentLevel]);
            this.ball.reset();
            this.gameObjects = [this.ball, this.paddle];

            this.gamestate = GAMESTATE.RUNNING;

        } else {
            this.gamestate = GAMESTATE.Win;
        }




    }

    update(deltaTime) {

        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.NEWLEVEL || this.gamestate === GAMESTATE.Win || this.gamestate === GAMESTATE.MAP) return;


        if (this.bricks.length === 0) {
            this.gamestate = GAMESTATE.NEWLEVEL;
            (this.currentLevel)++;
            //localStorage.setItem("level",this.currentLevel);
            if (this.currentLevel === 3) {
                this.gamestate = GAMESTATE.Win;
            }
            document.addEventListener('keydown', (event) => {
                //alert(event.keyCode);
                if (event.keyCode === 69) {

                    //console.log(this.currentLevel);

                    //console.log(game);
                    //console.log("hhhhhhhhhhhhhhhhhh");
                    // window.setTimeout(function(){
                    //        this.gamestate=GAMESTATE.MAP}, 100);
                    this.gamestate = GAMESTATE.MAP;
                    console.log("jjjjjjj");
                    document.addEventListener('keydown', (event) => {
                        //alert(event.keyCode);
                        if (event.keyCode === 32) {
                           // console.log(this.currentLevel);
                            //console.log(localStorage.getItem("level"));
                            this.start();

                        }

                    });
                    //  this.start();

                }

            });
        }
        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        if (this.gamestate === GAMESTATE.Win) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(10, 46, 104)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Congratulation! \n press space to restart", this.gameWidth / 2, 450);
            let badge = document.getElementById('img-badge3');
            ctx.drawImage(badge, 250, 7, 300, 300);
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
            ctx.font = "30px Arial";
            ctx.fillStyle = "rgb(10, 46, 104)";
            ctx.textAlign = "center";
            
            if (this.currentLevel === 1) {
                let badge1 = document.getElementById('img-map2');
                ctx.drawImage(badge1, 0, 0, this.gameWidth, this.gameHeight);
            }
            if (this.currentLevel === 2) {
                let badge2 = document.getElementById('img-map3');
                ctx.drawImage(badge2, 0, 0, this.gameWidth, this.gameHeight);
            }
            ctx.fillText("Press Space So Enter Next Level !!! ", this.gameWidth / 2, 481);




        }

        if (this.gamestate === GAMESTATE.NEWLEVEL) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,0.8)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("press  e to know where are you?", this.gameWidth / 2, 450);
            if (this.currentLevel === 1) {
                let badge1 = document.getElementById('img-badge1');
                ctx.drawImage(badge1, 250, 70, 300, 300);
            }
            if (this.currentLevel === 2) {
                let badge2 = document.getElementById('img-badge2');
                ctx.drawImage(badge2, 250, 70, 300, 300);
            }
            // make_base();
            // let lifes = document.getElementById("lives");
            // console.log(this.flag);
            // if (this.flag === 0) {
            //     let i;
            //     for (i = this.lives; i > 0; i--) {
            //         var node = document.createElement("LI");
            //         var textnode = document.createTextNode(i);
            //         node.appendChild(textnode);
            //         lifes.appendChild(node);
            //     }
            // }
            // this.flag++;


        }

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
        }


        if (this.gamestate === GAMESTATE.MENU) {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR To Start ", this.gameWidth / 2, this.gameHeight / 2);
            let lifes = document.getElementById("lives");
            console.log(this.flag);
            if (this.flag === 0) {
                let i;
                for (i = this.lives; i > 0; i--) {
                    var node = document.createElement("LI");
                var _img = document.createElement('img');
                _img.src = "assets/imgs/heartL.png";
                _img.width = 40;
                _img.height = 40;
                //_img.id = "foo" + i;
                //_list[i].appendChild(_img);
                //var textnode = document.createTextNode(i);
                node.appendChild(_img);
                lifes.appendChild(node);
                }
            }
            this.flag++;
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 46, 104,1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER ", this.gameWidth / 2, this.gameHeight / 2);
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
