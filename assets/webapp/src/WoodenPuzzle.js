function Tray(game) {
  this.x = game.width * 0.75;
  this.y = 0;
  //this.ratio = 0.3;
  this.sprite = game.ASSET_MANAGER.getAsset('images/nonpublic_twisty_slide.png');
  this.ratio = game.height / this.sprite.height;
  this.x = game.width - this.sprite.width * this.ratio;
}

Tray.prototype.constructor = Tray;


function WoodenPuzzleSet() {
  GameEngine.call(this);
}
WoodenPuzzleSet.prototype = new GameEngine();
WoodenPuzzleSet.prototype.constructor = WoodenPuzzleSet;

WoodenPuzzleSet.prototype.start = function() {

  console.log("Starting wooden puzzle");
  this.background = this.ASSET_MANAGER.getAsset("images/wood_golden.jpg");
  this.tray = new Tray(this);

  this.addPlayer(new Player(this, "192.168.0.112"));

  var pieces4 = gameset.pieces4;
  for (var j = 0; j < pieces4.length; j++){

    //var darthVaderImg = new Kinetic.Shape(Kinetic.drawImage(this.ASSET_MANAGER.getAsset(pieces4[j].src), pieces4[j].x, pieces4[j].y, 200, 137));

    //this.addEntity(new PuzzlePiece(this, CommunicationGame.drawImage(this, this.ASSET_MANAGER.getAsset(pieces4[j].src), pieces4[j].x, pieces4[j].y, 200, 137)));
    var e = new PuzzlePiece();
    var width = parseInt(this.ASSET_MANAGER.getAsset(pieces4[j].src).width * pieces4[j].ratio);
    var height = parseInt(this.ASSET_MANAGER.getAsset(pieces4[j].src).height * pieces4[j].ratio);
    e.init(pieces4[j].x*this.width, pieces4[j].y*this.height, pieces4[j].x*this.width, pieces4[j].y*this.height, pieces4[j].src, CommunicationGame.drawImage(this.ASSET_MANAGER.getAsset(pieces4[j].src), pieces4[j].x, pieces4[j].y, width, height));




    this.addEntity(e);
  }

  
  GameEngine.prototype.start.call(this);
};

WoodenPuzzleSet.prototype.update = function() {


  GameEngine.prototype.update.call(this);
};

WoodenPuzzleSet.prototype.draw = function() {
  GameEngine.prototype.draw.call(this, function(game) {
    console.log("Drawing wooden puzzle in callback");
    game.context.drawImage(game.background, 0, 0, game.width, game.height);
    game.context.drawImage(game.tray.sprite, game.tray.x, game.tray.y, game.tray.sprite.width * game.tray.ratio, game.tray.sprite.height * game.tray.ratio);
    game.drawScore();

    for (var j = 0; j < game.shapes.length; j++){
      game.shapes[j].draw();
    }

  });
};


WoodenPuzzleSet.prototype.drawScore = function() {
  console.log("Drawing score");
};
