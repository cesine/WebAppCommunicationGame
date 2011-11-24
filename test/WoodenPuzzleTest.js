GreeterTest = TestCase("GreeterTest");
 
GreeterTest.prototype.testGreet = function() {
  var greeter = new myapp.Greeter();
  assertEquals("Hello World!", greeter.greet("World"));
};


GreeterTest.prototype.testExample = function () {
  expectAsserts(1);
  var worker = new Worker('worker.js');

  //from http://code.google.com/p/js-test-driver/wiki/TestCase
  var doSomething = {};
  worker.listener = function (work){
    assertSame(doSomething, work);
  };
  //worker.perform(doSomething);



  //from http://www.html5rocks.com/en/tutorials/workers/basics/
  worker.addEventListener('message', function(e) {
    document.getElementById('result').textContent = e.data;
  }, false);

  worker.postMessage({'cmd': 'start', 'msg': 'Hi'});

  
  /*
  Conclusion: The code in http://code.google.com/p/js-test-driver/wiki/TestCase for Worker
  isnt talking about WebWorkers... but rather a fake class.
   */




};

