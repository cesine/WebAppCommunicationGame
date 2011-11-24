PuzzlePiece = function(){
  this.init = function(i){
    this.id =i;
    this.x = 0;
    this.y = 0;
    this.correctX = 0;
    this.correctY = 0;
    this.angle = 0;
    this.image = new Image(); //TODO combine these lines to assign to image once created.
    this.image.title = ""; //target utterance
    this.image.src = "images/canard.png";
    this.imageScaleFactor = 1;
  }
  this.draw = function(context){
    drawImage(this.image, this.x, this.y, this.image.width*imageScaleFactor, this.image.height*imageScaleFactor);
  }

}