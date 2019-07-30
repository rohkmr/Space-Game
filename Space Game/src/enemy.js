export default class enemy {
  constructor(game) {
    this.image = document.getElementById("enemy_img");
    this.position = { x: Math.floor(Math.random() * 448), y: 1 };
    this.speed = 0.5 + game.level / 3;
    this.width = 32;
    this.height = 32;
    this.color = "#A2B";
    this.active = true;
    this.isThisEnemy2 = false;
    this.CanvasWidth = game.CanvasWidth;
    this.CanvasHeight = game.CanvasHeight;
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

  update() {
    this.position.y += this.speed;

    this.active =
      this.active === true &&
      this.position.x >= 0 &&
      this.position.x <= this.CanvasWidth &&
      this.position.y >= 0 &&
      this.position.y <= this.CanvasHeight;
  }
  explode(game) {
    this.active = false;
  }
}
