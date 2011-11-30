
function WoodenPuzzleSet() {
  GameEngine.call(this);
  //this.showOutlines = true;
  this.lives = 10;
  this.score = 0;
}
WoodenPuzzleSet.prototype = new GameEngine();
WoodenPuzzleSet.prototype.constructor = WoodenPuzzleSet;

WoodenPuzzleSet.prototype.start = function() {
  this.sentry = new Sentry(this);
  this.earth = new Earth(this);
  this.addEntity(this.earth);
  this.addEntity(this.sentry);
  this.addPlayer(new Player(this, "192.168.0.112"))
  GameEngine.prototype.start.call(this);
}

WoodenPuzzleSet.prototype.update = function() {
  if (this.lastAlienAddedAt == null || (this.timer.gameTime - this.lastAlienAddedAt) > 1) {
    this.addEntity(new Alien(this, this.ctx.canvas.width, Math.random() * Math.PI * 180));
    this.lastAlienAddedAt = this.timer.gameTime;
  }

  if (this.score <= 0) {
    // show game over screen
  }

  GameEngine.prototype.update.call(this);
}

WoodenPuzzleSet.prototype.draw = function() {
  GameEngine.prototype.draw.call(this, function(game) {
    game.drawScore();
    game.drawLives();
  });
}

WoodenPuzzleSet.prototype.drawLives = function() {
  this.ctx.fillStyle = "red";
  this.ctx.font = "bold 2em Arial";
  this.ctx.fillText("Lives: " + this.lives, -this.ctx.canvas.width/2 + 50, this.ctx.canvas.height/2 - 80);
}

WoodenPuzzleSet.prototype.drawScore = function() {
  this.ctx.fillStyle = "red";
  this.ctx.font = "bold 2em Arial";
  this.ctx.fillText("Score: " + this.score, -this.ctx.canvas.width/2 + 50, this.ctx.canvas.height/2 - 50);
}
