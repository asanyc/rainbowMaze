function Cell(i,j,m)
{
  this.i = i;
  this.j = j;
  this.visited = false;
  this.deadend = false;
  this.maze = m;

  // TOP, RIGHT, BOTTOM, LEFT
  this.walls = [true,true,true,true];
  function index(i,j)
  {
    if (i < 0 || j <0 || i > this.maze.cols-1 || j > this.maze.rows-1){
      return -1;
    } else {
      return i + j * this.maze.cols;
    }
  }

  this.checkNeighbors = function()
  {
    var neighbors = [];

    var top     = this.maze.g[index(i   , j-1)];
    var right   = this.maze.g[index(i+1 , j  )];
    var bottom  = this.maze.g[index(i   , j+1)];
    var left    = this.maze.g[index(i-1 , j  )];

    if (top && !top.visited)
    {
      neighbors.push(top);
    }

    if (right && !right.visited)
    {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited)
    {
      neighbors.push(bottom);
    }
    if (left && !left.visited)
    {
      neighbors.push(left);
    }

    if (neighbors.length >  0)
    {
      var r = floor(random(0,neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }

  }

  this.highlight = function()
  {
    var x = this.i*this.maze.tileSize;
    var y = this.j*this.maze.tileSize;
    noStroke();
    fill(128,255,128,128);
    rect(x,y,this.maze.tileSize,this.maze.tileSize);
  }

  this.show = function()
  {
    var x = this.i*this.maze.tileSize;
    var y = this.j*this.maze.tileSize;
    strokeWeight(1);
    stroke(200,200,255);

    if (this.walls[0])
    {
      line(x  , y  , x+this.maze.tileSize, y);      // TOP
    }
    if (this.walls[1])
    {
      line(x+this.maze.tileSize, y  , x+this.maze.tileSize, y+this.maze.tileSize);  // RIGHT
    }
    if (this.walls[2])
    {
      line(x+this.maze.tileSize, y+this.maze.tileSize, x  , y+this.maze.tileSize);  // BOTTOM
    }
    if (this.walls[3])
    {
      line(x  , y+this.maze.tileSize, x  , y);      // LEFT
    }

    if (this.visited)
    {
      noStroke();
      fill(128,192,255,128);
      rect(x,y,this.maze.tileSize,this.maze.tileSize);
    }

  }
}
