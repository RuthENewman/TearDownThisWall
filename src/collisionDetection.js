export function detectCollision(ball, gameObject) {
  let ballBase = ball.position.y + ball.size;
  let ballTop = ball.position.y;


  let topOfObject = gameObject.position.y;

  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;

  let objectBase = gameObject.position.y + gameObject.height;

  if(ballBase >= topOfObject
    && ballTop <= objectBase
    && ball.position.x >= leftSideOfObject
    && ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }

}
