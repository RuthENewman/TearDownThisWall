import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1, level2 } from "./level.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  WON: 5,
};


export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1, level2]
    this.currentLevel = 0;
    new InputHandler(this.paddle, this);
  }


  start() {

    if (
      this.gamestate !== GAMESTATE.MENU
      && this.gamestate !== GAMESTATE.NEWLEVEL
    )
    return;

    this.bricks = buildLevel(this, levels[this.currentLevel]);
    this.ball.reset();
    this.gamestate = GAMESTATE.RUNNING;

  }

  update(deltaTime) {
    if(
      this.gamestate == GAMESTATE.PAUSED
      || this.gamestate == GAMESTATE.MENU
      || this.gamestate == GAMESTATE.GAMEOVER
      || this.gamestate == GAMESTATE.WON
    )
    return;

    if(this.bricks.length === 0 && this.currentLevel != 2) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
    this.bricks = this.bricks.filter(brick => !brick.knockedDown);

    if(this.bricks.length === 0 && this.currentLevel == 2) {
      this.gamestate = GAMESTATE.WON;
      this.draw(context);
    }

  }

  draw(context) {
    [...this.gameObjects, ...this.bricks]forEach(object => object.draw(context));

    if(this.gamestate == GAMESTATE.PAUSED) {
      context.rect(0,0,this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0,0,0,0.5)";
      context.fill();
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Game paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if(this.gamestate == GAMESTATE.WON) {
      context.rect(0,0,this.gameWidth, this.gameHeight);
      const revealedImage = document.getElementById('berlin');
      context.drawImage(revealedImage, 10, 10, this.gameWidth, this.gameHeight)
      context.fill();
      context.font = "30px Arial";
      context.textAlign = "center";
      context.fillText("You tore down the wall!", this.gameWidth / 2, this.gameHeight / 2);
    }

    if(this.gamestae == GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }


  }

  togglePause() {
    if(this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

}
