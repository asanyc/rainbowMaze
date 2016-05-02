/*

Gonna branch this to attempt optimization
-----------------------------------------
cells[] will be most of the grid from before
	row
	col
	visited
edges
	start{x,y}
	end{x,y}
	owners[cellindex,cellindex]
mazeObj
	current/next = indices from cells[]
	checkNeighbors
	remove walls
*/

var Maze = function()
{
	var m = {};
	m.g = [];
	m.cols = 8;
	m.rows = 8;
	m.tileSize = 16
	m.current;
	m.next;
	m.stack = [];
	
	m.setup = function()
	{
		m.g = [];
		// init maze of cells
		for (var j = 0; j < m.rows; j++) 
		{
			for (var i = 0; i < m.cols; i++) 
			{
				m.g.push(new Cell(i,j,m));
			}
		}

		m.current = m.g[0];

	}

	m.draw = function()
	{
		for (var i = 0; i < m.g.length; i++) {
			m.g[i].show();
		}

		m.current.visited = true;
		m.current.highlight();
		// STEP 1
		m.next = m.current.checkNeighbors();
		if (m.next)
		{
			m.next.visited = true;

			// STEP 2
			m.stack.push(m.current);
			// sTEP 3
			m.removeWalls(m.current,m.next);

			// STEP 4
			m.current = m.next;
		} else if(m.stack.length > 0)
		{
			m.current = m.stack.pop();
		} else if (m.stack.length == 0)
		{
			m.finished()
		}
	}

	m.outputJSON = function(maze)
	{
		var saveNameSuffix = year() + "-" + month() + "-" + day() + "-" + hour() + "." + minute() + "." + second() + "." + millis() + ".json";
		saveJSONObject(m.cereal(),"maze" + "_" + maze.cols + "x" + maze.rows + "_" + maze.tileSize + "_" + saveNameSuffix);
	}
	m.printJSON = function()
	{
		/*
		var out = [];
		var loop = [];
		out.push("cellSize: " + m.tileSize + ";");
		out.push("cols: " + m.cols + ";");
		out.push("rows: " + m.rows + ";");
		out.push("cells: [");
		for (var i = 0; i < m.g.length; i++)
		{
			loop.push("&nbsp;&nbsp; { col: " + m.g[i].i + ", row: " + m.g[i].j + ", walls: [0:" + m.g[i].walls[0] + ",1:" + m.g[i].walls[1] + ",2:" + m.g[i].walls[2] + ",3:" + m.g[i].walls[3] + "] }");
		}
		loop[loop.length-1] = loop[loop.length-1].substring(0,loop[loop.length-1].length-1);
		out.push(loop.join("<br />"));
		out.push("]");
		return out.join("<br />");
		*/
		return JSON.stringify(m.cereal());
	}

	m.removeWalls = function(a,b)
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

	m.cereal = function()
	{
		g = m.g;
		var cells = [];
		var json = {};
		json.cellSize = m.tileSize;
		json.cols = m.cols;
		json.rows = m.rows;

		for (var i = 0; i < g.length; i++)
		{
			cells.push({col: g[i].i,row: g[i].j, walls: g[i].walls});
		}
		json.cells = cells;
		return json;
	}

	m.finished = function(){}

	return m;

}
