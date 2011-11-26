/*
Puzzle pieves are wooden shapes or animals which have an x,y,z position on the canvas of the Wooden Shapes Game. 

Pieces can be moved with a mouse and with finger
Pieces can be rotated with finger pinching, or with holding down a key and moving the mouse
Pieces can be in the "right spot"
Pieces are generally stored in an array of pieces as part of the Wooden Shapes game.
*/

TestCase('TestPuzzlePiece', sinon.testCase({
  "setUp": function(){
    puzzlePiece = new PuzzlePiece();
    puzzlePiece.init(4);
  },
  "test should be an object": function(){
    assertObject(puzzlePiece);
    assertEquals("The id of the puzzle piece should be set",4, puzzlePiece.id);
  }

}));
