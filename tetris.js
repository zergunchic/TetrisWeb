var canvas = document.getElementById("tetriscanvas");
var ctx = canvas.getContext("2d");
var blueTile = new Image();
var redTile = new Image();
var orangeTile = new Image();
var greenTile = new Image();
loadResources();
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
			element.gravity();
		}
	}
	moveLeft(){
		for (let element of this.elements){
			element.move('left');
		}
	}
	moveRight(){
		for (let element of this.elements){
			element.move('right');
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
	gravity(){
		this.tileY=this.tileY+1;
		this.posY = this.tileY*16;
	}
	move(direction){
		if(direction == 'left'){
			this.tileX =this.tileX-1;
			this.posX = this.tileX*16;
		} else {
			this.tileX =this.tileX+1;
			this.posX = this.tileX*16;
		}
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
	setInterval(function(){drawObjects()}, 100);
}

//OBJECT MANIPULATION
document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowLeft') {
    currentObjectsToDraw[0].moveLeft();
  }
  if(event.code == 'ArrowRight'){
  	currentObjectsToDraw[0].moveRight();
  }
});

// LOADING IMAGES
function loadResources(){
	blueTile.src = 'resources/blue_tile16.png';
	redTile.src = 'resources/red_tile16.png';
	orangeTile.src = 'resources/orange_tile16.png';
	greenTile.src = 'resources/green_tile16.png';
}
