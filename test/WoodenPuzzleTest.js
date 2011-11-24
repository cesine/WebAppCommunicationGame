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

var NoopTest = AsyncTestCase('NoopTest');

NoopTest.prototype.testNoop = function(queue) {
  var asynchronousSystem = {};
  assertFalse(asynchronousSystem.wasTriggered());
  queue.call('Trigger the system', function(callbacks) {
    asynchronousSystem.triggerLater(callbacks.noop());
  });
  queue.call('Assert about the system', function() {
    assertTrue(asynchronousSystem.wasTriggered());
  });
};



var TestName = AsyncTestCase('TestName');

/*
Comment September 23 2011
I'm running v1.3.2 of js test driver, and the documentation still doesn't correspond to
what happens in this version.
The object passed to an async test case has
add,
count,
maybeComplete,
onError,
onHerdComplete,
remove and
setTimeout methods.

Simply using the add method seems to add methods to be tested,
but there's nothing obvious to actually run these once they've all been added.
 */
TestName.prototype.testToRun = function(pool) {
   expectAsserts(1);
   var tF = pool.add(function() {
                      assertTrue(false); //or your more realistic assert
                  });

   window.setTimeout(tF, 500); //or your async call of some kind
};



/*
Here is the current state of these tests. Very few of them work out of the box. Oh well...
TypeError: Object #<Object> has no method 'wasTriggered'

    at [object Object].testNoop (http://localhost:9876/test/test/WoodenPuzzleTest.js:68:34)



TypeError: Object [object Object] has no method 'add'
    at [object Object].testToRun (http://localhost:9876/test/test/WoodenPuzzleTest.js:84:18)



TypeError: asynchronousSystem.wasTriggered is not a function
([object Object],null)@http://localhost:9876/test/test/WoodenPuzzleTest.js:68



TypeError: pool.add is not a function
([object Object],null)@http://localhost:9876/test/test/WoodenPuzzleTest.js:84


*/