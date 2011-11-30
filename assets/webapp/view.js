var gp = {};
gp.gamesurface ;
gp.game1;
gp.game2;
gp.game3;
gp.game4;
gp.ASSET_MANAGER = new AssetManager();

gp.ASSET_MANAGER.queueDownload('images/wood_golden.jpg');
gp.ASSET_MANAGER.queueDownload('images/canard.png');

gp.ASSET_MANAGER.downloadAll(function() {
  var sprite = gp.ASSET_MANAGER.getAsset('images/wood_golden.jpg');
  //gamearea.translate(canvas.width/2, canvas.height/2);
  gamearea.drawImage(sprite, 0, 0, sprite.width, sprite.height)
});

initCanvas = function() {

  document.getElementById("buttonarea").removeChild(document.getElementById("loadButton"));
  document.body.style.margin = "0px 0px 0px " + 0 + "px";

  gamearea = document.getElementById("gamearea_canvas");

  var game4 = new WoodenPuzzleSet(gamearea);

//  var drawit = function(){game4.draw()}
//  game4 = new WoodenPuzzleSet(gamearea, function(){
//	  drawit();
//  });


  console.log(game4)

  return game4;
}

var loadGame = function() {
  gp.gamesurface = initCanvas();
};