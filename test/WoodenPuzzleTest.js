/*
The Wooden Shapes Game Board is a canvas

It has a piece of wood as a background picture
It has an array of puzzle pieces (twice as many as are needed on the board)

The board has inset pictures of where the puzzle pieces are supposed to go. 

The board knows where the pieces are at all times

The board knows when the game is complete (all the pieces have been filled)

The pieces can either be on the puzzle board or in the bin

*/
AsyncTestCase('TestPiecePositionHistory', {
  testSequenceOfActions: function(queue){
    var state = 0;

    queue.call('Step 1: create a puzzle piece', function() {
      assertEquals(0, state);
    });

    queue.call('Step 2: set its position to 100,100', function() {
      ++state;
    });

    queue.call('Step 3: assert its position value changed', function() {
      assertEquals(1, state);
    });
  },
  testSomethingComplicated: function(queue){
    var state2 = 0;

    queue.call('Step 1: schedule the window to increment our variable 5 seconds from now.', function(callbacks) {
      //You call var myTweakedCallback = callbacks.add(myOriginalCallback)
      var myCallback = callbacks.add(function() {
        ++state2;
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
      assertEquals(1, state2);
    });
  }
});

