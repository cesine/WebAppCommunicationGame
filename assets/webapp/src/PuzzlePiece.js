PuzzlePiece = function(game, drawFunc, correctx, correcty){
  Entity.call(game, drawFunc);

  this.correctX = correctx;
  this.correctY = correcty;
  this.targetUtterance = ""; //target utterance
};

PuzzlePiece.prototype.constructor = PuzzlePiece;


PuzzlePiece.prototype.draw = function(args){

  Entity.prototype.draw.call(args);
};

PuzzlePiece.prototype.update = function (){
  this.x += 10;
  this.y += 10;
  //can use clock tick as mulitplier for velocity

  Entity.prototype.update.call(this);
};



