# rainbowMaze
  Maze genertion and JSON output
  Based on Daniel Shiffman's web tutorial on 
  [recursive backtracker maze gen algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker)

  Generates a maze in borowser and the let's 
  you down load a JSON filefor use elsewhere.

# Todo: Optimize
  Right now it's too slow when cranked up to 64x64.
  
  Wanna pull cell processing out of the cell objects and into the maze object itself.  Cheange the cell/wall data structure so it's only iterating over a series of edges(walls), which will then be rendered.
