ball=document.getElementById('img-ball');

console.log(localStorage.getItem("imageSource"));


ball.setAttribute('src',localStorage.getItem("imageSource"));

console.log(ball);