import Bullet from "./bullet";
export default class player {
  constructor(game, playerBullet) {
    this.game = game;
    this.width = 32;
    this.height = 32;
    this.CanvasWidth = game.CanvasWidth;
    this.CanvasHeight = game.CanvasHeight;
    this.speedMax = 5;
    this.speed = 0;
    this.active = true;

    this.image = document.getElementById("player_img");
    this.position = {
      x: game.CanvasWidth / 2 - this.width / 2,
      y: game.CanvasHeight - this.height - 5
    };
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  stop() {
    this.speed = 0;
  }
  moveLeft() {
    this.speed = -this.speedMax;
  }
  moveRight() {
    this.speed = this.speedMax;
  }

  shoot(game) {
    new Audio("sounds/shoot.mp3").play();
    var bulletPosition = {
      x: this.position.x + this.width / 2,
      y: this.position.y
    };
    var newBullet = new Bullet(game, bulletPosition);
    game.playerBullet.push(newBullet);

  }

  explode() {
    this.active = false;
  }

  update(deltaTime, game) {
    if (!deltaTime) return;

    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.CanvasWidth)
      this.position.x = this.CanvasWidth - this.width;
  }
}
