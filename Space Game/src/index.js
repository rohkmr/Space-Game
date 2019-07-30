import Game from "./game";


var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");



let game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);


var lastTime = 0;
function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  game.update(deltaTime);
  game.draw(context);
  requestAnimationFrame(gameLoop);
}
gameLoop();
