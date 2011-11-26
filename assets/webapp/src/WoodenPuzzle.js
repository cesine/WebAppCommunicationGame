WoodenPuzzleSet = function(canvasElement, callback){
  if(canvasElement == null){
    this.canvas = document.body.appendChild(document.createElement("canvas")); //TODO append at highest position
  }else{
    this.canvas = canvasElement;
  }
  this.init = function(i, callback){
    this.id =i;
    this.canvasRatio = 1.0;//0.99
    this.width = window.innerWidth * this.canvasRatio;
    this.height = window.innerHeight * this.canvasRatio;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
    this.canvas.setAttribute('style', 'background-color: #999;');
    this.ctx = this.canvas.getContext("2d");
    this.backgroundimage = new Image();
    
    this.lastDrawTimestamp = 0;
    //trouble loading the image (as always) in the android webview. 
    //http://www.slideshare.net/gawd/game-development-with-html5
    //How to draw in a game loop: http://www.megidish.net/alphageeks6/luigi/
    this.backgroundimage.onload = function(){
    	if (callback && typeof(callback) === "function") {
    	    // execute the callback, passing parameters as necessary
    	    callback();
        }
    };
    this.backgroundimage.src = "../images/wood_golden.jpg";

    
  };
  this.draw = function(){
    var d = new Date();
    this.lastDrawTimestamp = d.getTime();
    this.ctx.drawImage(this.backgroundimage, 0, 0, this.width, this.height);
   
    return "okay";
  };

  this.init(0, callback);
  
  
  

}

