GreeterTest = TestCase("GreeterTest");
 
GreeterTest.prototype.testGreet = function() {
  var greeter = new myapp.Greeter();
  assertEquals("Hello World!", greeter.greet("World"));
};

/*
GreeterTest.prototype.testExample = function () {
	  expectAsserts(1);
	  var worker = new Worker();
	  var doSomething = {};
	  worker.listener = function (work){
	    assertSame(doSomething, work);
	  };
	  worker.perform(doSomething);
	};
	
	*/