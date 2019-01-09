function detectCollision(shark, gameObject) 
{
  let bottomOfshark = shark.postion.y + shark.size;
  let topOfshark = shark.postion.y;

  let topOfObject = gameObject.postion.y;
  let leftSideOfObject = gameObject.postion.x;
  let rightSideOfObject = gameObject.postion.x + gameObject.width;
  let bottomOfObject = gameObject.postion.y + gameObject.height;

  if (
    bottomOfshark >= topOfObject &&
    topOfshark <= bottomOfObject &&
    shark.postion.x >= leftSideOfObject &&
    shark.postion.x + shark.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}