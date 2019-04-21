import { detectCollision } from './collisionDetection.js';

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById('brick');

    this.game = game;

    this.position = position;

    this.width = 80;
    this.height = 24;

    this.knockedDown = false;
  }

  update() {
    if(detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.knockedDown = true;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height

    )
  }
}
