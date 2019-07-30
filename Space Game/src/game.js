import Player from "./player";
import InputHandler from "./input";
import Enemy from "./enemy";
import Enemy2 from "./enemy2";
import { Collision } from "./collision";

const GAMESTATE = {
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(CANVAS_WIDTH, CANVAS_HEIGHT) {
    this.CanvasWidth = CANVAS_WIDTH;
    this.CanvasHeight = CANVAS_HEIGHT;
    this.gamestate = GAMESTATE.MENU;
    new InputHandler(this);
  }

  start() {
    if (this.gamestate !== GAMESTATE.MENU) return;
    this.player = new Player(this, this.playerBullet);
    this.playerBullet = [];
    this.enemies = [];
    this.score = 0;
    this.life = 3;
    this.level = 1;
    this.enemyCount = 0;

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;
    this.player.update(deltaTime);
    this.playerBullet = this.playerBullet.filter(
      bullet => bullet.active === true
    );

    //add enemy
    if (Math.random() < 0.005) {
      this.enemyCount += 1;
      if (this.enemyCount >= 20) {
        this.level += 1;
        this.enemyCount = 0;
      }
      var newEnemy = new Enemy(this);
      this.enemies.push(newEnemy);
    }
    if (Math.random() < 0.003) {
      var newEnemy2 = new Enemy2(this);
      this.enemies.push(newEnemy2);
    }

    //  filter enemy
    this.enemies = this.enemies.filter(enemy => enemy.active === true);
    //update enemy
    this.enemies.forEach(enemy => enemy.update());

    // update bullets
    this.playerBullet.forEach(bullet => bullet.update());

    //collision check
    var i, j;
    for (i = 0; i < this.playerBullet.length; i++) {
      for (j = 0; j < this.enemies.length; j++) {
        if (Collision(this.playerBullet[i], this.enemies[j])) {
          //explode funtion
          this.playerBullet[i].active = false;
          new Audio("sounds/explosion.mp3").play();
          if (this.enemies[j].isThisEnemy2 === true) {
            this.enemies[j].life--;
            if (this.enemies[j].life < 1) {
              this.enemies[j].explode(this);
              this.score += 5;
            }
          } else {
            this.enemies[j].explode(this);
            this.score++;
          }
        }
      }
    }

    for (i = 0; i < this.enemies.length; i++) {
      if (Collision(this.enemies[i], this.player)) {
        this.enemies[i].explode(this);
        this.player.explode();
        this.gamestate = GAMESTATE.GAMEOVER;
      }
    }

    for (i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].position.y > 288) {
        this.life--;
        this.enemies[i].explode();
      }
    }
    if (this.life < 1) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }
  }
  draw(context) {
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      context.font = "25px Arial";
      context.textAlign = "center";
      context.fillText(
        "GAME OVER",
        this.CanvasWidth / 2,
        this.CanvasHeight / 2
      );
      context.textAlign = "center";
      context.fillText("Your Score: " + this.score, this.CanvasWidth / 2, 100);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      context.font = "25px Arial";
      context.textAlign = "center";
      context.fillText(
        "Press 'P' To Start",
        this.CanvasWidth / 2,
        this.CanvasHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.player.draw(context);
      this.enemies.forEach(enemy => enemy.draw(context));
      //draw bullets
      this.playerBullet.forEach(bullet => bullet.draw(context));
      context.font = "18px Arial";
      context.fillText("SCORE: " + this.score, 350, 20);
      context.fillText("LEVEL: " + this.level, 200, 20);
    }
  }
}
