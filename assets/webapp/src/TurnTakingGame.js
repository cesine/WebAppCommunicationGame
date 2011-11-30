//future proofing
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame ||
          window.webkitRequestAnimationframe ||
          window.mozRequestAnimationFrame ||
          window.onRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(/*function*/ callback, /*DOMElement*/ element){
            window.setTimeout(callback, 1000/60);
          }
})();


GameEngine = function(){
  this.entities = [];
  this.ctx = null;
  this.lastUpdateTimestamp = null;
  this.deltaTime = null;
  this.timer = new Timer();
}

GameEngine.prototype.draw = function(callback){
  //loop through all entities, call draw()

}

GameEngine.prototype.update = function(){
  //loop through all entitites, call update()
}

GameEngine.prototype.loop = function(){
  this.clockTick = this.timer.tick();
  this.update();
  this.draw();
  this.lastUpdateTimestamp = now;
}

Gameengine.prototype.start = function(){
  console.log("starting game");
  this.lastUpdateTimestamp = Date.now();
  var that = this;
  (function gameLoop(){
    that.loop();
    requestAnimFrame(gameLoop, that.ctx.canvas);
  })();
}

GameEngine.prototype.startInput = function(){
  //...
  this.ctx.canvas.addEventListner("click",function(e){
    that.click = getXandY(e);
  }), false);
  this.ctx.canvas.addEventListner("mousemove", function(e){
    that.mouse = getXandY(e);
  }), false);
}

/*
Timer class to keep track of "time" independant of system clock
* good for multiplayer games
* good for games that run on a timer loop (better pause behaviour)

 */
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