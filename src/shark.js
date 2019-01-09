class Shark {
    constructor(game) {

        this.image = document.getElementById("img-shark");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;


        this.size = 60;
        this.reset();
    }

    reset() {

        this.postion = {
            x: 10, y: 400
        }
        this.speed = {
            x: 4, y: -2  //to raise the movement of the shark
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.postion.x, this.postion.y, this.size, this.size);

    }

    update(deltaTime) {

        this.postion.x += this.speed.x;
        this.postion.y += this.speed.y;
        // wall on right and left
        if (this.postion.x + this.size > this.gameWidth || this.postion.x < 0) { //this.size to adjust shark hit the wall
            this.speed.x = -this.speed.x; //to reverse the speed on x axis
        }
        // wall on top 
        if (this.postion.y < 0) {
            this.speed.y = -this.speed.y; //to reverse the speed on y axis
        }
        //wall on bottom 
        if (this.postion.y + this.size > this.gameHeight) {
            this.game.lives--;
            let lifes = document.getElementById("lives");
            lifes.innerHTML = "";
            let i;
            for (i = this.game.lives; i > 0; i--) {
                var node = document.createElement("LI");
                var _img = document.createElement('img');
                _img.src = "assets/imgs/heartL.png";
                _img.width = 40;
                _img.height = 40;
        
                node.appendChild(_img);
                lifes.appendChild(node);
            }


            this.reset();
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.postion.y = this.game.paddle.postion.y - this.size;
        }
    }
}
