export default class bullet {
  constructor(game, position) {
    this.width = 3;
    this.height = 3;
    this.color = "#000";
    this.position = position;
    this.speed = 5;
    this.active = true;
    this.game = game;
    this.CanvasWidth = game.CanvasWidth;
    this.CanvasHeight = game.CanvasHeight;
  }

  update() {
    

    this.position.y -= this.speed;
    this.active =
      this.active === true &&
      this.position.x >= 0 &&
      this.position.x <= this.CanvasWidth &&
      this.position.y >= 0 &&
      this.position.y <= this.CanvasHeight;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
