initCanvas = function() {

  document.getElementById("buttonarea").removeChild(document.getElementById("loadButton"));
  document.body.style.margin = "0px 0px 0px " + 0 + "px";

  gamearea = document.getElementById("gamearea_canvas");
  var game4 = new WoodenPuzzleSet(gamearea);
  game4.draw();


  return game4.ctx;
}