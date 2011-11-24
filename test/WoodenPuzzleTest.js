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



var QueueTest = AsyncTestCase('QueueTest');

/*
The AsyncTestCase extends TestCase by adding a
parameter that is a queue that accepts inline functions
that represent sequential steps of the test. 
*/
QueueTest.prototype.testSomething = function(queue) {
  var state = 0;

  queue.call('Step 1: assert the starting condition holds', function() {
    assertEquals(0, state);
  });

  queue.call('Step 2: increment our variable', function() {
    ++state;
  });

  queue.call('Step 3: assert the variable\'s value changed', function() {
    assertEquals(1, state);
  });
};

/*As the test runner executes each step in the queue
it passes a parameter to that step.
The parameter is an empty pool of callback functions. 
* */
var AsynchronousTest = AsyncTestCase('AsynchronousTest');

AsynchronousTest.prototype.testSomethingComplicated = function(queue) {
  var state = 0;

  queue.call('Step 1: Fail test by scheduling the window to increment our variable 35 seconds from now.', function(callbacks) {
//You call var myTweakedCallback = callbacks.add(myOriginalCallback)
    var myCallback = callbacks.add(function() {
      ++state;
    });

    window.setTimeout(myCallback, 35000); //Error: Callback '#1' expired after 30000 ms during test step 'Step 1: schedule the window to increment our variable 5 seconds from now.'

  });


  /* Here is where the above callback gets tested
  * will not execute any subsequent step in the queue
  * until all outstanding callbacks of the current step are complete.
  * f the callbacks are not a called for an egregious amount of time,
  * currently set to 30 seconds
  * */
  queue.call('Step 2: then assert our state variable changed', function() {
    assertEquals(1, state);
  });
};