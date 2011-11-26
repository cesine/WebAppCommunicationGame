initCanvas = function() {
  canvasWidth = 600;
  canvasHeight = 400;
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