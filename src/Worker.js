
myapp = this.myapp || {};

myapp.Worker = function() {
  this.id = 0;
};

myapp.Worker.prototype.perform = function() {
  this.id = 2;
};

