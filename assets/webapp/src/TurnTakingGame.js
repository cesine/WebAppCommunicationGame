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
  this.entities = [];
  this.players = [];
  this.ctx = null;
  this.click = null;
  this.mouse = null;
  this.timer = new Timer();
  this.wait = false;
  //this.stats = new Stats();
  this.surfaceWidth = null;
  this.surfaceHeight = null;
  this.halfSurfaceWidth = null;
  this.halfSurfaceHeight = null;
}

GameEngine.prototype.init = function(ctx) {
  this.ctx = ctx;
  this.surfaceWidth = this.ctx.canvas.width;
  this.surfaceHeight = this.ctx.canvas.height;
  this.halfSurfaceWidth = this.surfaceWidth/2;
  this.halfSurfaceHeight = this.surfaceHeight/2;

  this.stage = new Kinetic.Stage("container", this.surfaceWidth, this.surfaceHeight);
  this.canvas = this.stage.canvas;
  this.ctx = this.stage.context;
  this.container = this.stage.getContainer();
  this.offsetX = 0;
  this.offsetY = 0;
  this.imgDragging = undefined;
  this.container.addEventListener("mouseup", function(){
    this.imgDragging = undefined;
  }, false);

  this.container.addEventListener("mousemove", function(){
    if (this.imgDragging) {
      var mousePos = this.stage.getMousePos();
      this.imgDragging.x = mousePos.x - this.offsetX;
      this.imgDragging.y = mousePos.y - this.offsetY;
      this.imgDragging.draw();
    }
  }, false);


  this.startInput();
  //document.body.appendChild(this.stats.domElement);

  console.log('game initialized');
}

GameEngine.prototype.start = function() {
  console.log("starting game");
  var that = this;

  (function gameLoop() {
    if(this.wait !== true){
      that.loop();
      requestAnimFrame(gameLoop, that.ctx.canvas);
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

  var getXandY = function(e) {
    var x =  e.clientX - that.ctx.canvas.getBoundingClientRect().left - (that.ctx.canvas.width/2);
    var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top - (that.ctx.canvas.height/2);
    return {x: x, y: y};
  }

  var that = this;

  this.ctx.canvas.addEventListener("click", function(e) {
    that.click = getXandY(e);
  }, false);

  this.ctx.canvas.addEventListener("mousemove", function(e) {
    that.mouse = getXandY(e);
  }, false);

  console.log('Input started');
}

GameEngine.prototype.addEntity = function(entity) {
  this.entities.push(entity);
}
GameEngine.prototype.addPlayer = function(player){
  this.players.push(player);
}

GameEngine.prototype.draw = function(drawCallback) {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.ctx.save();
  for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].draw(this.ctx);
  }
  if (drawCallback) {
    drawCallback(this);
  }
  this.ctx.restore();
}

GameEngine.prototype.update = function() {
  var entitiesCount = this.entities.length;

  for (var i = 0; i < entitiesCount; i++) {
    var entity = this.entities[i];

    if (!entity.removeFromWorld) {
      entity.update();
    }
  }

  for (var i = this.entities.length-1; i >= 0; --i) {
    if (this.entities[i].removeFromWorld) {
      this.entities.splice(i, 1);
    }
  }
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
  ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width * this.ratio, this.sprite.height * this.ratio);

  
  if (this.game.showOutlines && this.radius) {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();
  }
}


