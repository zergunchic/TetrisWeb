var canvas = document.getElementById("tetriscanvas");
var ctx = canvas.getContext("2d");
var blueTile = new Image();
var redTile = new Image();
var orangeTile = new Image();
var greenTile = new Image();
var tilesArray = [blueTile,redTile,orangeTile,greenTile];
var currentObjectsToDraw = [];

//Default tetris fild size - 20 x 10 (22 x 10)
var tetrisMap = Array(30);
for (var i = 0; i < tetrisMap.length; i++) { 
    tetrisMap[i] = Array(10); 
} 
// INITIAL BLOCK
canvas.width  = 320;
canvas.height = 700;
loadResources();


// CLASS BLOCK
class Cube{
	constructor(){
		let randomNumberForColorChoose = Math.floor(Math.random()*4);
		this.tileColor = tilesArray[randomNumberForColorChoose];
		this.elements=[];
		this.elements.push(new Element(5,0,this.tileColor));
		this.elements.push(new Element(6,0,this.tileColor));
		this.elements.push(new Element(5,1,this.tileColor));
		this.elements.push(new Element(6,1,this.tileColor));
	}
	paint(){
		for (let element of this.elements){
			ctx.drawImage(element.tileColor, element.posX, element.posY);
		}
	}
}
class Element{
	constructor(tileX,tileY, tileColor){
	this.tileX = tileX;
	this.tileY = tileY;
	this.posX = tileX*16;
	this.posY = tileY*16;
	this.tileColor = tileColor;
	}

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


// LOADING IMAGES
function loadResources(){
	blueTile.src = 'resources/blue_tile16.png';
	redTile.src = 'resources/red_tile16.png';
	orangeTile = 'resources/orange_tile16.png';
	greenTile = 'resources/green_tile16.png';
}
