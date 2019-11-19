var canvas = document.getElementById("tetriscanvas");
var ctx = canvas.getContext("2d");
var blueTile = new Image();
var redTile = new Image();
var orangeTile = new Image();
var greenTile = new Image();
var tilesArray = [blueTile,redTile,orangeTile,greenTile];
var currentObjectsToDraw = [];
var tetrisMap = Array(30);
// INITIAL BLOCK
canvas.width  = 320;
canvas.height = 700;
loadResources();
// CLASS BLOCK
class Cube{
	constructor(){
		this.tileColor = tilesArray[0];
		this.posX = 0;
		this.posY = 0;
		this.elements=[];
	}
	paint(){
		for (element of this.elements){
			ctx.drawImage()
		}
		ctx.drawImage(this.tileColor, this.posX, this.posY);
		ctx.drawImage(this.tileColor, this.posX+16, this.posY+16);
		ctx.drawImage(this.tileColor, this.posX+16, this.posY);
		ctx.drawImage(this.tileColor, this.posX, this.posY+16);
		this.gravity();
	}
	gravity(){
		this.posY+=16;
	}
}
class Element{
	this.posX = 0;
	this.posY = 0;
}

//MAIN LOOP BISENESS LOGIC
render();

// FUNCTIONAL BLOCK
function drawObjects(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(drawobj of currentObjectsToDraw){
		drawobj.paint();
	}
}

function render(){
	let objectToDraw = new Cube();
	currentObjectsToDraw.push(objectToDraw);
	setInterval(function(){drawObjects()}, 500);
}

function loadResources(){
	blueTile.src = 'resources/blue_tile16.png';
	redTile.src = 'resources/red_tile16.png';
	orangeTile = 'resources/orange_tile16.png';
	greenTile = 'resources/green_tile16.png';
}
