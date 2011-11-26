initCanvas = function() {

  document.getElementById("buttonarea").removeChild(document.getElementById("loadButton"));
  document.body.style.margin = "0px 0px 0px " + 0 + "px";

  gamearea = document.getElementById("gamearea_canvas");
 
  var game4;
  var drawit = function(){game4.draw()}
  game4 = new WoodenPuzzleSet(gamearea, function(){
	  drawit();
  });
  
  
  console.log(game4)

  return game4;
}