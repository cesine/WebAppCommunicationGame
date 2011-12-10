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
  this.timer = new Timer();
  this.wait = false;
  //this.stats = new Stats();

}
//http://www.html5canvastutorials.com/labs/html5-canvas-drag-and-drop-multiple-shapes-with-kineticjs/
GameEngine.prototype.init = function(div, x, y) {
  this.container = document.getElementById(div);
  this.width = x;
  this.height = y;
  this.shapes = [];
  this.zIndexCounter = 9999;
  this.idCounter = 0;
  this.dblClickWindow = 400; // ms
  // desktop flags
  this.mousePos = null;
  this.mouseDown = false;
  this.mouseUp = false;

  // mobile flags
  this.touchPos = null;
  this.touchStart = false;
  this.touchEnd = false;

  // add stage canvas
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.id = 0;

  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.canvas.style.position = 'absolute';
  this.container.appendChild(this.canvas);

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

GameEngine.prototype.clear = function(){
  var context = this.getContext();
  var canvas = this.getCanvas();
  context.clearRect(0, 0, canvas.width, canvas.height);
};


GameEngine.prototype.remove = function(shape){
  var shapes = this.shapes;

  // remove canvas
  this.container.removeChild(shape.getCanvas());

  // remove from shapes array
  for (var n = 0; n < shapes.length; n++) {
    var id = shapes[n].id;
    if (id == shape.id) {
      this.shapes.splice(n, 1);
    }
  }
};


GameEngine.prototype.getCanvas = function(){
  return this.canvas;
};

GameEngine.prototype.getContext = function(){
  return this.context;
};



GameEngine.prototype.handleEvent = function(evt){
  if (!evt) {
    evt = window.event;
  }

  this.setMousePosition(evt);
  this.setTouchPosition(evt);
  var that = this;
  for (var n = this.shapes.length - 1; n >= 0; n--) {
    var pubShape = this.shapes[n];

    (function(){
      var shape = pubShape;
      var pos = that.touchPos || that.mousePos;
      var el = shape.eventListeners;

      if (pos !== null && shape.context.isPointInPath(pos.x, pos.y)) {
        // handle onmousedown
        if (that.mouseDown) {
          that.mouseDown = false;
          shape.clickStart = true;

          if (el.onmousedown !== undefined) {
            el.onmousedown(evt);
          }
        }
        // handle onmouseup & onclick
        else if (that.mouseUp) {
          that.mouseUp = false;
          if (el.onmouseup !== undefined) {
            el.onmouseup(evt);
          }

          // detect if click or double click occurred
          if (shape.clickStart) {

            if (el.onclick !== undefined) {
              el.onclick(evt);
            }

            if (el.ondblclick !== undefined && shape.inDoubleClickWindow) {
              el.ondblclick(evt);
            }

            shape.inDoubleClickWindow = true;

            setTimeout(function(){
              shape.inDoubleClickWindow = false;
            }, that.dblClickWindow);
          }
        }

        // handle onmouseover
        else if (!shape.mouseOver) {
          shape.mouseOver = true;
          if (el.onmouseover !== undefined) {
            el.onmouseover(evt);
          }
        }

        // handle onmousemove
        else if (el.onmousemove !== undefined) {
          el.onmousemove(evt);
        }

        // handle touchstart
        if (that.touchStart) {

          that.touchStart = false;
          if (el.touchstart !== undefined) {
            el.touchstart(evt);
          }
        }

        // handle touchend
        if (that.touchEnd) {
          that.touchEnd = false;
          if (el.touchend !== undefined) {
            el.touchend(evt);
          }
        }

        // handle touchmove
        if (!that.touchMove) {
          if (el.touchmove !== undefined) {
            el.touchmove(evt);
          }
        }

      }
      // handle mouseout condition
      else if (shape.mouseOver) {
        shape.mouseOver = false;
        if (el.onmouseout !== undefined) {
          el.onmouseout(evt);
        }
      }
    }());
  }
};

GameEngine.prototype.startInput = function() {
  console.log('Starting to listen for input');

  var that = this;

  // desktop events
  this.container.addEventListener("mousedown", function(evt){
    that.mouseDown = true;
    that.handleEvent(evt);
  }, false);

  this.container.addEventListener("mousemove", function(evt){
    that.mouseUp = false;
    that.mouseDown = false;
    that.handleEvent(evt);
  }, false);

  this.container.addEventListener("mouseup", function(evt){
    that.mouseUp = true;
    that.mouseDown = false;
    that.handleEvent(evt);

    // clear all click starts
    for (var i = 0; i < that.shapes.length; i++) {
      that.shapes[i].clickStart = false;
    }
  }, false);

  this.container.addEventListener("mouseover", function(evt){
    that.handleEvent(evt);
  }, false);

  this.container.addEventListener("mouseout", function(evt){
    that.mousePos = null;
  }, false);

  // mobile events
  this.container.addEventListener("touchstart", function(evt){
    evt.preventDefault();
    that.touchStart = true;
    that.handleEvent(evt);
  }, false);

  this.container.addEventListener("touchmove", function(evt){
    evt.preventDefault();
    that.handleEvent(evt);
  }, false);

  this.container.addEventListener("touchend", function(evt){
    evt.preventDefault();
    that.touchEnd = true;
    that.handleEvent(evt);
  }, false);

  console.log('Listening for mouse/touch input.');
};



GameEngine.prototype.getMousePos = function(evt){
  return this.mousePos;
};

GameEngine.prototype.getTouchPos = function(evt){
  return this.touchPos;
};

GameEngine.prototype.setMousePosition = function(evt){
  var mouseX = evt.clientX - this.getContainerPos().left + window.pageXOffset;
  var mouseY = evt.clientY - this.getContainerPos().top + window.pageYOffset;
  this.mousePos = {
    x: mouseX,
    y: mouseY
  };
};

GameEngine.prototype.setTouchPosition = function(evt){
  if (evt.touches !== undefined && evt.touches.length == 1) { // Only deal with
    // one finger
    var touch = evt.touches[0];
    // Get the information for finger #1
    var touchX = touch.clientX - this.getContainerPos().left + window.pageXOffset;
    var touchY = touch.clientY - this.getContainerPos().top + window.pageYOffset;

    this.touchPos = {
      x: touchX,
      y: touchY
    };
  }
};

GameEngine.prototype.getContainerPos = function(){
  var obj = this.container;
  var top = 0;
  var left = 0;
  while (obj.tagName != "BODY") {
    top += obj.offsetTop;
    left += obj.offsetLeft;
    obj = obj.offsetParent;
  }
  return {
    top: top,
    left: left
  };
};

GameEngine.prototype.getContainer = function(){
  return this.container;
};

GameEngine.prototype.addEntity = function(shape) {
  shape.stage = this;
  shape.canvas = document.createElement('canvas');
  shape.context = shape.canvas.getContext('2d');
  shape.id = ++this.idCounter;
  shape.canvas.width = this.width;
  shape.canvas.height = this.height;
  shape.canvas.style.zIndex = ++this.zIndexCounter;
  shape.canvas.style.position = 'absolute';
  this.container.appendChild(shape.canvas);
  this.shapes.push(shape);
  //shape.draw();

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

function Entity(game, drawFunc) {
  this.game = game;
  this.drawFunc = drawFunc;
  this.x = 0;
  this.y = 0;
  this.ratio = 0.5;

  this.scale = {
    x: 0.3,
    y: 0.3
  };
  this.rotation = 0; // radians
  this.eventListeners = {};
  this.mouseOver = false;
  this.clickStart = false;
  this.inDblClickWindow = false;

  //this.sprite = game.ASSET_MANAGER.getAsset("images/nonpublic_cheval_bleu.png");
  this.removeFromWorld = false;


}

Entity.prototype.update = function() {

}

Entity.prototype.draw = function(args) {

    var context = this.game.getContext();
    this.clear();
    context.save();

    if (this.x !== 0 || this.y !== 0) {
        context.translate(this.x, this.y);
    }
    if (this.rotation !== 0) {
        context.rotate(this.rotation);
    }
    if (this.scale.x != 1 || this.scale.y != 1) {
        context.scale(this.scale.x, this.scale.y);
    }

    this.drawFunc(args);
    context.restore();
}



Entity.prototype.getCanvas = function(){
    return this.canvas;
};

Entity.prototype.getContext = function(){
    return this.context;
};

Entity.prototype.setScale = function(scale){
    this.scale.x = scale;
    this.scale.y = scale;
};

Entity.prototype.clear = function(){
    var context = this.getContext();
    var canvas = this.getCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
};

Entity.prototype.addEventListener = function(type, func){
    var event = (type.indexOf('touch') == -1) ? 'on' + type : type;
    this.eventListeners[event] = func;
};

Entity.prototype.moveToTop = function(){
    var stage = this.stage;
    // remove shape from shapes
    for (var n = 0; n < stage.shapes.length; n++) {
        var reg = stage.shapes[n];
        if (reg.id == this.id) {
            stage.shapes.splice(n, 1);
            stage.shapes.push(this);
            break;
        }
    }

    // reorder canvases
    for (var n = 0; n < stage.shapes.length; n++) {
        var reg = stage.shapes[n];
        reg.getCanvas().style.zIndex = ++stage.zIndexCounter;
    }
};

/****************************************
 * drawImage util
 * This util function draws a rectangular shape
 * over a canvas image to provide a detectable path
 */
var CommunicationGame = {};
CommunicationGame.drawImage = function(game, imageObj, x, y, width, height){
  if (!width) {
    width = imageObj.width;
  }
  if (!height) {
    height = imageObj.height;
  }
  return function(){
    var context = game.getContext();
    context.drawImage(imageObj, x, y, width, height);
    context.beginPath();
    context.rect(x, y, width, height);
    context.closePath();
  };
};