WoodenPuzzleSet = function(canvasElement){
  if(canvasElement == null){
    this.canvas = document.body.appendChild(document.createElement("canvas"));
  }else{
    this.canvas = canvasElement;
  }
  this.init = function(i){
    this.id =i;
    this.canvasRatio = 1.0;//0.99
    this.width = window.innerWidth * this.canvasRatio;
    this.height = window.innerHeight * this.canvasRatio;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
    this.canvas.setAttribute('style', 'background-color: #999;');
    this.ctx = this.canvas.getContext("2d");
    this.backgroundimage = new Image();
    this.backgroundimage.src = "../images/wood_golden.jpg";

    this.lastDrawTimestamp = 0;
  };
  this.draw = function(){
    var d = new Date();
    this.lastDrawTimestamp = d.getTime();
    this.ctx.drawImage(this.backgroundimage, 0, 0, this.width, this.height);
   
    return "okay";
  };

  this.init(0);
  

}

