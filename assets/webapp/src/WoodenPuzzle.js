function Tray(game) {

}
Tray.prototype = new Entity();
Tray.prototype.constructor = Tray;


function PuzzlePiece(){

}
PuzzlePiece.prototype = new Entity();
PuzzlePiece.prototype.constructor = PuzzlePiece;





function WoodenPuzzleSet() {
  GameEngine.call(this);
}
WoodenPuzzleSet.prototype = new GameEngine();
WoodenPuzzleSet.prototype.constructor = WoodenPuzzleSet;

WoodenPuzzleSet.prototype.start = function() {

  console.log("Starting wooden puzzle");
  //this.background = this.ASSET_MANAGER.getAsset("images/wood_golden.jpg");
  GameEngine.prototype.start.call(this);
}

WoodenPuzzleSet.prototype.update = function() {

    
  GameEngine.prototype.update.call(this);
}

WoodenPuzzleSet.prototype.draw = function() {
  GameEngine.prototype.draw.call(this, function(game) {
    //this.stage.context.drawImage(this.background, 0, 0, this.surfaceWidth, this.surfaceHeight);
    console.log("Drawing wooden puzzle in callback");
    game.drawScore();

  });
}


WoodenPuzzleSet.prototype.drawScore = function() {
  console.log("Drawing score");
}
