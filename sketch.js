/*
  Maze genertion and JSON output
  Based on Daniel Shiffman's web tutorial on 
  recursive backtracker maze gen algorithm

  Generates a maze in borowser and the let's 
  you down load a JSON file when you click on 
  the output pane.
*/

var stack = [];
var unvisited = [];
var grid = [];
var w = 8;
var cols, rows;
var current;
var output;

function setup()
{
  createCanvas(513,513);
  output = createP("");
  output.style("background-color: #666;");
  output.style("margin: 2em;");
  output.style("padding: 2em;");
  output.mouseClicked(genFile);
  cols = floor(width/w);
  rows = floor(height/w);

  for (var j = 0; j < rows; j++) 
  {
    for (var i = 0; i < cols; i++) 
    {
        grid.push(new Cell(i,j));
    }
  }

  current = grid[0];
}

function draw()
{
  background(1);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if (next)
  {
    next.visited = true;

    // STEP 2
    stack.push(current);
    // sTEP 3
    removeWalls(current,next);

    // STEP 4
    current = next;
  } else if(stack.length > 0)
  {
    current = stack.pop();
  } else if (stack.length == 0)
  {
    noLoop();
    console.log("FINISHED");
    output.html(printJSON(grid));
  }
}


function removeWalls(a,b)
{
  var x = a.i - b.i;

  if (x===1)
  {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x===-1)
  {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;

  if (y===1)
  {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y===-1)
  {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function printJSON(g)
{
  var out = [];
  var loop = [];
  out.push("cellSize: " + w + ";");
  out.push("cols: " + cols + ";");
  out.push("rows: " + rows + ";");
  out.push("cells: [");
  for (var i = 0; i < g.length; i++)
  {
    loop.push("&nbsp;&nbsp; { col: " + g[i].i + ", row: " + g[i].j + ", walls: [0:" + g[i].walls[0] + ",1:" + g[i].walls[1] + ",2:" + g[i].walls[2] + ",3:" + g[i].walls[3] + "] }");
  }
  loop[loop.length-1] = loop[loop.length-1].substring(0,loop[loop.length-1].length-1);
  out.push(loop.join("<br />"));
  out.push("]");
  return out.join("<br />");
}
function outputJSON(g)
{
  var cells = [];
  var json = {};
  json.cellSize = w;
  json.cols = cols;
  json.rows = rows;

  for (var i = 0; i < g.length; i++)
  {
    cells.push({col: g[i].i,row: g[i].j, walls: g[i].walls});
  }
  json.cells = cells;
  var saveNameSuffix = year() + "-" + month() + "-" + day() + "-" + hour() + "." + minute() + "." + second() + "." + millis() + ".json";
  saveJSONObject(json,"maze" + "_" + cols + "x" + rows + "_" + w + "_" + saveNameSuffix);
}

function genFile()
{
  outputJSON(grid);
}