initCanvas = function() {

  document.getElementById("buttonarea").removeChild(document.getElementById("loadButton"));
  document.body.style.margin = "0px 0px 0px " + 0 + "px";
  var canvasRatio = 1.0;//0.99
  canvasWidth = window.innerWidth * canvasRatio;
  canvasHeight = window.innerHeight * canvasRatio;
  gamearea = document.getElementById("gamearea_canvas");
  gamearea.setAttribute("width", canvasWidth);
  gamearea.setAttribute("height", canvasHeight);
  gamearea.setAttribute('style', 'background-color: #999;');
  //gamearea.style.position = "relative";
  //gamearea.style.zindex = 1;
  window.ctx = gamearea.getContext("2d");

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var backgroundimage = new Image();
  backgroundimage.src = "images/wood_golden.jpg";
  $(backgroundimage).load(function() {
    ctx.drawImage(backgroundimage, 0, 0, canvasWidth, canvasHeight);
  });

  return ctx;
}