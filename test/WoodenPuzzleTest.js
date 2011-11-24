GreeterTest = TestCase("GreeterTest");
 
GreeterTest.prototype.testGreet = function() {
  var greeter = new myapp.Greeter();
  assertEquals("Hello World!", greeter.greet("World"));
};


GreeterTest.prototype.testExample = function () {
  expectAsserts(1);
  var worker = new myapp.Worker();
  //assertObject(worker);

  //from http://code.google.com/p/js-test-driver/wiki/TestCase
  var doSomething = {};

  //we have a callback function which contains an assert.
  worker.listener = function (work){
    assertSame(doSomething, work);
  };

  worker.perform(doSomething);

  //AssertError: Expected '1' asserts but '0' encountered.

};

