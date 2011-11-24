/*
TestCase('TestPuzzlePiece', sinon.testCase({

  "test should be an object": function(){
    assertObject(WOODENSHAPEGAME.puzzlePiece);
  }

}));*/

GreeterTest = TestCase("GreeterTest");
 
GreeterTest.prototype.testGreet = function() {
  var greeter = new myapp.Greeter();
  assertEquals("Hello World!", greeter.greet("World"));
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

  queue.call('Step 1: schedule the window to increment our variable 5 seconds from now.', function(callbacks) {
//You call var myTweakedCallback = callbacks.add(myOriginalCallback)
    var myCallback = callbacks.add(function() {
      ++state;
    });

    window.setTimeout(myCallback, 5000);
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


