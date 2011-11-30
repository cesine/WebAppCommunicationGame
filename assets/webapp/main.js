var gp = {};
gp.gamesurface ;
gp.game1;
gp.game2;
gp.game3;
gp.game4;


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