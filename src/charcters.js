
char1= document.getElementById('char1');

char2= document.getElementById('char2');
;

let clicked ;

char1.addEventListener('click', function(){
   
window.clicked=1;

localStorage.setItem("imageSource",'./assets/imgs/char1.png');
});
char2.addEventListener('click', function(){
   
    window.clicked=2;
  
    localStorage.setItem("imageSource",'./assets/imgs/char2.png');
    });
  



