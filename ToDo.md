# Todo: Optimize
  Right now it's too slow when cranked up to 64x64.
  
  Wanna pull cell processing out of the cell objects and into the maze object itself.  Cheange the cell/wall data structure so it's only iterating over a series of edges(walls), which will then be rendered.
  
  cells[] will be most of the grid from before
    row#
    col#
    visited
  
  edges[] (walls)
    start{x,y}
    end{x,y}
    owners[cellindex,cellindex]
    
  mazeObj
    current/next = indices from cells[]
    checkNeighbors
    remove walls

Hopefully I can speed up drawing with vertex() and beginShape()
  beginShape(LINES);
    for (...edges[]))
    vertex(verts[edges[i].start.x],verts[edges[i].start.y]);
    vertex(verts[edges[i].end.x],verts[edges[i].end.y]);
  endShape();
