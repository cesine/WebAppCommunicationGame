function Tray(game) {
  this.x = game.canvas.width * 0.75;
  this.y = 0;
  Entity.call(this, game, this.x, this.y);
  //this.ratio = 0.3;
  this.sprite = game.ASSET_MANAGER.getAsset('images/nonpublic_twisty_slide.png');
  this.ratio = game.canvas.height / this.sprite.height;
  this.x = game.canvas.width -this.sprite.width * this.ratio;
}
Tray.prototype = new Entity();
Tray.prototype.constructor = Tray;


//function GameBackground(game) {
//  this.x = 0;
//  this.y = 0;
//  Entity.call(this, game, this.x, this.y);
//  this.sprite = game.ASSET_MANAGER.getAsset('images/wood_golden.jpg');
//
//}
//GameBackground().prototype = new Entity();
//GameBackground.prototype.constructor = GameBackground;


function PuzzlePiece(game, sprit, x , y, ratio){
  this.sprite = sprit;
  this.x = x * game.canvas.width;
  this.y = y * game.canvas.height;
  Entity.call(this, game, this.x, this.y);

  this.ratio = ratio;
  this.correctX = 0;
  this.correctY = 0;
  this.angle = 0;
  this.imgFunc = Kinetic.drawImage(this.sprite, this.x, this.y, this.sprite.width * this.ratio, this.sprite.height * this.ratio);
  this.dragability = new Kinetic.Shape(this.imgFunc);

  this.dragability.addEventListener("mousedown", function(){
    var mousePos = game.stage.getMousePos();
    this.dragability.moveToTop();
    offsetX = mousePos.x - this.dragability.x;
    offsetY = mousePos.y - this.dragability.y;
    imgDragging = this.dragability;
  });
  this.dragability.addEventListener("mouseover", function(){
    document.body.style.cursor = "pointer";
  });
  this.dragability.addEventListener("mouseout", function(){
    document.body.style.cursor = "default";
  });
  game.stage.add(this.dragability);



}
PuzzlePiece.prototype = new Entity();
PuzzlePiece.prototype.constructor = PuzzlePiece;





function WoodenPuzzleSet() {
  GameEngine.call(this);
  //this.showOutlines = true;
  this.score = 0;
}
WoodenPuzzleSet.prototype = new GameEngine();
WoodenPuzzleSet.prototype.constructor = WoodenPuzzleSet;

WoodenPuzzleSet.prototype.start = function() {
//  for(var j =0; j < gameset.pieces.length; j++){
//    this.addEntity(gameset.pieces[j]);
//
//  }
  //sentry will become slide

//  this.background = new GameBackground(this);
//  this.addEntity(this.background);
  this.tray = new Tray(this);
  this.addEntity(this.tray);
  this.addPlayer(new Player(this, "192.168.0.112"))

  var pieces4 = gameset.pieces4;
  for (var j = 0; j < pieces4.length; j++){
    //var sprite = this.ASSET_MANAGER.queueDownload(pieces4[j]);
    //var apiece = new PuzzlePiece(this, sprite);
    this.addEntity(new PuzzlePiece(this, this.ASSET_MANAGER.getAsset(pieces4[j].src), pieces4[j].x, pieces4[j].y, pieces4[j].ratio ) );
  }

  GameEngine.prototype.start.call(this);
}

WoodenPuzzleSet.prototype.update = function() {


  if (this.score <= 0) {
    // show game over screen
  }

  GameEngine.prototype.update.call(this);
}

WoodenPuzzleSet.prototype.draw = function() {
  GameEngine.prototype.draw.call(this, function(game) {
    game.drawScore();

  });
}


WoodenPuzzleSet.prototype.drawScore = function() {
  this.ctx.fillStyle = "red";
  this.ctx.font = "bold 2em Arial";
  this.ctx.fillText("Score: " + this.score, -this.surfaceWidth/2 + 50, this.surfaceHeight/2 - 50);
}
