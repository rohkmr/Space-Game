export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      //alert(event.keycode);
      switch (event.keyCode) 
      {
        case 37:
          //alert("move player left");
          game.player.moveLeft();
          break;

        case 39:
          //alert("move player right");
          game.player.moveRight();
          break;

        case 32:
          game.player.shoot(game);
          break;

        case 80:
          game.start();
          break;
      }
    });
    document.addEventListener("keyup", event => {
      //alert(event.keycode);
      if (
        (event.keyCode === 37 && game.player.speed < 0) ||
        (event.keyCode === 39 && game.player.speed > 0)
      )
        game.player.stop();
    });
  }
}
