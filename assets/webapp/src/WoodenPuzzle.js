function Tray(game) {

}
Tray.prototype = new Entity();
Tray.prototype.constructor = Tray;


function PuzzlePiece(){

}
PuzzlePiece.prototype = new Entity();
PuzzlePiece.prototype.constructor = PuzzlePiece;





function WoodenPuzzleSet() {

}
WoodenPuzzleSet.prototype = new GameEngine();
WoodenPuzzleSet.prototype.constructor = WoodenPuzzleSet;

WoodenPuzzleSet.prototype.start = function() {
  GameEngine.prototype.start.call(this);
}

WoodenPuzzleSet.prototype.update = function() {
  GameEngine.prototype.update.call(this);
}

WoodenPuzzleSet.prototype.draw = function() {
  GameEngine.prototype.draw.call(this, function(game) {
    game.drawScore();

  });
}


WoodenPuzzleSet.prototype.drawScore = function() {
//  this.ctx.fillStyle = "red";
//  this.ctx.font = "bold 2em Arial";
//  this.ctx.fillText("Score: " + this.score, -this.surfaceWidth/2 + 50, this.surfaceHeight/2 - 50);
}
