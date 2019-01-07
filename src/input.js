class InputHandler{
    constructor (paddle ,game){
        document.addEventListener('keydown',(event)=>{
            //alert(event.keyCode);
            switch(event.keyCode){
                case 37:
               // alert('move Left');
               paddle.moveLeft();
                break;

                case 39:
              //  alert('move Right');
              paddle.moveRight();
                break;

                case 27:
                game.togglePause();
                break;

                case 32:
                game.start();
                break;
            }
        });

        document.addEventListener('keyup',(event)=>{
            //alert(event.keyCode);
            switch(event.keyCode){
                case 37:
               if(paddle.speed<0)
               paddle.stop();
                break;

                case 39:
              if(paddle.speed >0)
              paddle.stop();
                break;
            }
        });

    }
}