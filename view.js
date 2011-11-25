initCanvas = function() {
  canvasWidth = 600;
  canvasHeight = 400;
  viewstimulus = document.getElementById("viewStimulus");
  viewstimulus.setAttribute("width", canvasWidth);
  viewstimulus.setAttribute("height", canvasHeight);
//viewstimulus.setAtt.ibute('style', 'background-color: #999;');
  //viewstimulus.style.position = "relative";
  //viewstimulus.style.zindex = 1;
  window.ctx = viewstimulus.getContext("2d");

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//loadButton();
  return ctx;
}