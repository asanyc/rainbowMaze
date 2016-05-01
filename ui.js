var mazeUI = function(){

	var u = {};
		// UI HTML 
	

	u.setup = function(maze)
	{

	  // Div to hold everthing
	  u.divContainer = createDiv("<h1>Maze Gen</h1>");
	  u.divContainer.id("container");
	  // Div for the Canvas
	  u.divCanvas = createDiv("");
	  u.divCanvas.id("divCanvas");
	  u.divCanvas.parent(u.divContainer);
	  
	  // Div for the UX
	  u.divUX = createDiv("<div class=\"uirow\" id=\"sliders\"></div><div class=\"uirow\" id=\"buttons\"></div>");
	  u.divUX.id("UI");
	  u.divUX.parent(u.divContainer);

	  // labels for sliders
	  u.sliderTileLabel = createElement('label');
	  u.sliderTileLabel.html("Tile Size : ")

	  u.sliderTileLabel.attribute('for','sliderTile');
	  u.sliderTileLabel.parent('sliders')

	  u.sliderColsLabel = createElement('label');
	  u.sliderColsLabel.html("#Cols")
	  u.sliderColsLabel.attribute('for','sliderCols');
	  u.sliderColsLabel.parent('sliders')

	  u.sliderRowsLabel = createElement('label');
	  u.sliderRowsLabel.html("#Rows")
	  u.sliderRowsLabel.attribute('for','sliderRows');
	  u.sliderRowsLabel.parent('sliders')

	  // slider for tile size
	  u.sliderTile = createSlider(8,64,16);
	  u.sliderTile.id("sliderTile");
	  u.sliderTile.attribute('step',8)
	  u.sliderTile.parent('sliders');
	  // slider for cols
	  u.sliderCols = createSlider(4,64,16);
	  u.sliderCols.parent('sliders');
	  // slider for rows
	  u.sliderRows = createSlider(4,64,16);
	  u.sliderRows.parent('sliders');
	  // button to (re)generate
	  u.buttonGen = createButton("(re)gen maze");
	  u.buttonGen.parent('buttons');
	  // button to DL JSON
	  u.buttonJSON = createButton("get JSON");
	  u.buttonJSON.parent('buttons');

	  // LABEL VALUES
	  u.sliderTileLabelVal = createElement('span');
	  u.sliderTileLabelVal.parent(u.sliderTileLabel);

	  u.sliderColsLabelVal = createElement('span');
	  u.sliderColsLabelVal.parent(u.sliderColsLabel);

	  u.sliderRowsLabelVal = createElement('span');
	  u.sliderRowsLabelVal.parent(u.sliderRowsLabel);



	  // Raw JSON dump to a P tag.
	  u.output = createP("");
	  u.output.parent(u.divUX);

	}

	u.updateUI = function()
	{
	  u.sliderTileLabelVal.html(u.sliderTile.value());
	  u.sliderColsLabelVal.html(u.sliderCols.value());
	  u.sliderRowsLabelVal.html(u.sliderRows.value());
	}

	return u;
}