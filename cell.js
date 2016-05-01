function Cell(i,j)
{
  this.i = i;
  this.j = j;
  this.visited = false;
  this.deadend = false;

  // TOP, RIGHT, BOTTOM, LEFT
  this.walls = [true,true,true,true];
  function index(i,j)
  {
    if (i < 0 || j <0 || i > cols-1 || j > rows-1){
      return -1;
    } else {
      return i + j * cols;
    }
  }

  this.checkNeighbors = function()
  {
    var neighbors = [];

    var top     = grid[index(i   , j-1)];
    var right   = grid[index(i+1 , j  )];
    var bottom  = grid[index(i   , j+1)];
    var left    = grid[index(i-1 , j  )];

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
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(128,255,128,128);
    rect(x,y,w,w);
  }

  this.show = function()
  {
    var x = this.i*w;
    var y = this.j*w;
    strokeWeight(1);
    stroke(200,200,255);

    if (this.walls[0])
    {
      line(x  , y  , x+w, y);      // TOP
    }
    if (this.walls[1])
    {
      line(x+w, y  , x+w, y+w);  // RIGHT
    }
    if (this.walls[2])
    {
      line(x+w, y+w, x  , y+w);  // BOTTOM
    }
    if (this.walls[3])
    {
      line(x  , y+w, x  , y);      // LEFT
    }

    if (this.visited)
    {
      noStroke();
      fill(128,192,255,128);
      rect(x,y,w,w);
    }

  }
}
