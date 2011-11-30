PuzzlePiece = function(i){
    this.id =i;
    this.x = 0;
    this.y = 0;
    this.correctX = 0;
    this.correctY = 0;
    this.angle = 0;
    this.image = new Image(); //TODO combine these lines to assign to image once created.
    this.image.title = ""; //target utterance
    this.image.src = "images/canard.png";
    this.imageScaleFactor = 0.5;
    this.sprite = ASSET_MANAGER.getAsset('images/canard.png');

  this.draw = function(context){
//    context.save()//
    //for rotation see Google IO Super Browser 2 Turbo Remix
    context.drawImage(this.sprite, this.x, this.y, this.sprite.width*imageScaleFactor, this.sprite.height*imageScaleFactor);
    //context.drawImage(this.image, this.x, this.y, this.image.width*imageScaleFactor, this.image.height*imageScaleFactor);
    //    context.restore();
    Entity.prototype.draw.call(this,ctx);
  }
  this.update = function (){
    this.x += 10;
    this.y += 10;
    //can use clock tick as mulitplier for velocity
    
    Entity.prototype.update.call(this);
  }

}

