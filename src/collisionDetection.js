function detectCollision(ball, gameObject) 
{
  let bottomOfBall = ball.postion.y + ball.size;
  let topOfBall = ball.postion.y;

  let topOfObject = gameObject.postion.y;
  let leftSideOfObject = gameObject.postion.x;
  let rightSideOfObject = gameObject.postion.x + gameObject.width;
  let bottomOfObject = gameObject.postion.y + gameObject.height;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.postion.x >= leftSideOfObject &&
    ball.postion.x + ball.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}