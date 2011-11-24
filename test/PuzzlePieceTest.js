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