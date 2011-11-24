PuzzlePieceTest = TestCase("PuzzlePieceTest");

PuzzlePieceTest.prototype.testGreet = function() {
  var greeter = new myapp.Greeter();
  assertEquals("Hello World!", greeter.greet("World"));
};

