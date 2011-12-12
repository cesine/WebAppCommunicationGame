PuzzlePiece = function(){
  Entity.call(this);


};

//PuzzlePiece.prototype = new Entity();
PuzzlePiece.prototype.constructor = PuzzlePiece;

PuzzlePiece.prototype.init = function(startingx, startingy, correctx, correcty, src, drawFunc){
  Entity.prototype.init.call(this, startingx, startingy, drawFunc);
  this.correctX = correctx;
  this.correctY = correcty;
  this.targetUtterance = src.replace(".png","").replace("images/nonpublic_",""); //target utterance
};
PuzzlePiece.prototype.draw = function(){
  Entity.prototype.draw.call(this);
};

PuzzlePiece.prototype.update = function (){
  Entity.prototype.update.call(this);
};



