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
  this.tray = new Tray(this);
  this.addEntity(this.tray);
  this.addPlayer(new Player(this, "192.168.0.112"))
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
  this.ctx.fillText("Score: " + this.score, -this.ctx.canvas.width/2 + 50, this.ctx.canvas.height/2 - 50);
}
