/*
  Maze genertion and JSON output
  Based on Daniel Shiffman's web tutorial on 
  recursive backtracker maze gen algorithm

  Generates a maze in borowser and the let's 
  you down load a JSON file when you click on 
  the output pane.
*/

var ux;
var maze;
var mazeCanvas;

function setup()
{

  maze = Maze();
  maze.setup();
  maze.finished = mazeDone;
  mazeCanvas = createCanvas(128,128);
  calcSize();

  // ux
  ux = mazeUI();
  ux.setup();
  
  // ux Actions attachment
  ux.buttonJSON.mouseClicked(genFile);
  ux.buttonGen.mouseClicked(genMaze);
  ux.sliderTile.changed(tileSize);
  ux.sliderRows.changed(setRows);
  ux.sliderCols.changed(setCols);

  // set UI to maze defaults
  ux.sliderTile.value(maze.tileSize);
  ux.sliderRows.value(maze.rows);
  ux.sliderCols.value(maze.cols);
  ux.updateUI();

  mazeCanvas.parent(ux.divCanvas)

}

function draw()
{
  background(1);
  maze.draw();
  

}

function genMaze()
{
  console.log("Here comes a new maze!");
  calcSize();
  loop();
}

function mazeDone()
{
  ux.output.html(maze.printJSON());
  console.log("FINISHED");
  noLoop();
}

function genFile()
{
  maze.outputJSON(maze);
}

function tileSize()
{
  maze.tileSize = ux.sliderTile.value();
  console.log("Size changed to " + ux.sliderTile.value());
  ux.updateUI();

  genMaze();
}
function setRows()
{
  maze.rows = ux.sliderRows.value();
  console.log("Rows changed to " + ux.sliderRows.value());
  ux.updateUI();
  genMaze();
}
function setCols()
{
  maze.cols = ux.sliderCols.value();
  console.log("Cols changed to " + ux.sliderCols.value());
  ux.updateUI();
  genMaze();
}

function calcSize()
{

  var newW = maze.cols * maze.tileSize;
  var newH = maze.rows * maze.tileSize;
  resizeCanvas(newW+1,newH+1);
  maze.setup();
}