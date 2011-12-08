//http://www.freesound.org/
//http://www.lostgarden.com/



/*
Timer class to keep track of "time" independant of system clock
* good for multiplayer games
* good for games that run on a timer loop (better pause behaviour)

 */


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Animation(spriteSheet, frameWidth, frameDuration, loop) {
  this.spriteSheet = spriteSheet;
  this.frameWidth = frameWidth;
  this.frameDuration = frameDuration;
  this.frameHeight= this.spriteSheet.height;
  this.totalTime = (this.spriteSheet.width / this.frameWidth) * this.frameDuration;
  this.elapsedTime = 0;
  this.loop = loop;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
  var scaleBy = scaleBy || 1;
  this.elapsedTime += tick;
  if (this.loop) {
    if (this.isDone()) {
      this.elapsedTime = 0;
    }
  } else if (this.isDone()) {
    return;
  }
  var index = this.currentFrame();
  var locX = x - (this.frameWidth/2) * scaleBy;
  var locY = y - (this.frameHeight/2) * scaleBy;
  ctx.drawImage(this.spriteSheet,
          index*this.frameWidth, 0,  // source from sheet
          this.frameWidth, this.frameHeight,
          locX, locY,
          this.frameWidth*scaleBy,
          this.frameHeight*scaleBy);
}

Animation.prototype.currentFrame = function() {
  return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() {
  return (this.elapsedTime >= this.totalTime);
}

function Timer() {
  this.gameTime = 0;
  this.maxStep = 0.05;
  this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function() {
  var wallCurrent = Date.now();
  var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
  this.wallLastTimestamp = wallCurrent;

  var gameDelta = Math.min(wallDelta, this.maxStep);
  this.gameTime += gameDelta;
  return gameDelta;
}

function GameEngine() {
  this.players = [];
  this.click = null;
  this.mouse = null;
  this.timer = new Timer();
  this.wait = false;
  //this.stats = new Stats();
  this.surfaceWidth = null;
  this.surfaceHeight = null;

}
//http://www.html5canvastutorials.com/labs/html5-canvas-drag-and-drop-multiple-shapes-with-kineticjs/
GameEngine.prototype.init = function(div, x, y) {

  this.surfaceWidth = x;
  this.surfaceHeight = y;



  
  this.startInput();
  //document.body.appendChild(this.stats.domElement);

  console.log('Game initialization complete.');
}

GameEngine.prototype.start = function() {
  console.log("Starting game");
  var that = this;

  (function gameLoop() {
    if(this.wait !== true){
      that.loop();
      //requestAnimFrame(gameLoop, that.ctx.canvas);
      this.wait  = true;

    }
  })();
}
GameEngine.prototype.pauseGame = function(){
  this.pause = true;
  alert("Game Paused");
}


GameEngine.prototype.startInput = function() {
  console.log('Starting input');

  /*
  add mouse listeners?
   */
  console.log('Mouse/Touch input started');
}

GameEngine.prototype.addEntity = function(entity) {


}
GameEngine.prototype.addPlayer = function(player){


}

GameEngine.prototype.draw = function(drawCallback) {
  console.log("Drawing game");

  if (drawCallback) {
    drawCallback(this);
  }
  
}

GameEngine.prototype.update = function() {

}

GameEngine.prototype.loop = function() {
  this.clockTick = this.timer.tick();
  this.update();
  this.draw();
  this.click = null;
  //this.stats.update();
}
function Player(game, location){
  this.game = game;
  this.location = location;
  this.myTurn = false;
  this.removeFromWorld = false;

}
Player.prototype.playTurn = function(){
  //TODO
}

function Entity(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.ratio = 0.5;
  
  //this.sprite = game.ASSET_MANAGER.getAsset("images/nonpublic_cheval_bleu.png");
  this.removeFromWorld = false;


}

Entity.prototype.update = function() {

}

Entity.prototype.draw = function(ctx) {
  
}


