
var playAliens = function() {


  var game = new WoodenPuzzleSet();

  game.canvas = document.getElementById('surface');
  game.canvas.setAttribute("width", window.innerWidth);
  game.canvas.setAttribute("height", window.innerHeight);
  game.ctx = game.canvas.getContext('2d');


  game.ASSET_MANAGER = new AssetManager();
  game.ASSET_MANAGER.queueDownload('img/alien-explosion.png');
  game.ASSET_MANAGER.queueDownload('img/alien.png');
  game.ASSET_MANAGER.queueDownload('img/bullet.png');
  game.ASSET_MANAGER.queueDownload('img/earth.png');
  game.ASSET_MANAGER.queueDownload('img/sentry.png');
  game.ASSET_MANAGER.queueDownload('img/explosion.png');

  /*
   Allow programmer to turn sound off (so game will still play even if Flash security permissions havent been set
   see console_log_output.txt for more info
   TODO turn into a UI element (button) for user to understand what is going on
   */
  game.soundSwitch= "off";
  console.log("Sound is switched " + game.soundSwitch);
  if(game.soundSwitch !== "off"){
    game.ASSET_MANAGER.queueSound('alien-boom', 'audio/alien_boom.mp3');
    game.ASSET_MANAGER.queueSound('bullet-boom', 'audio/bullet_boom.mp3');
    game.ASSET_MANAGER.queueSound('bullet', 'audio/bullet.mp3');
  }

  game.ASSET_MANAGER.downloadAll(function() {
    game.init(game.ctx);
    game.start();
  });

  return game;


};



var game6 = playAliens();
game6.pauseGame();