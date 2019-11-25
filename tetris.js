var canvas = document.getElementById("tetriscanvas");
var ctx = canvas.getContext("2d");
var blueTile = new Image();
var redTile = new Image();
var orangeTile = new Image();
var greenTile = new Image();
loadResources();
var tilesArray = [blueTile,redTile,orangeTile,greenTile];
var currentDrawedObject;
var manager;
var gravityCounterMax = 20;
var gravityCounter = 0;
//Default tetris fild size - 20 x 10 (22 x 10)
var gameFieldXMax = 10;
var gameFieldYMax = 32;
var tetrisMap = Array(gameFieldYMax+2);
for (var i = 0; i < tetrisMap.length; i++) { 
    tetrisMap[i] = Array(gameFieldXMax); 
} 
// INITIAL BLOCK
canvas.width  = 320;
canvas.height = 700;


// CLASS BLOCK
class CollisionManager{
	checkCollisionsXLeft(){
		for(let element of currentDrawedObject.elementsArray){
			let posX = element.tileX;
			let posY = element.tileY;
			if(posX<=0) return false;
			if(tetrisMap[posY][posX-1] instanceof Element) return false;
			return true;
		}
	}
	checkCollisionsXRight(){
		for(let element of currentDrawedObject.elementsArray){
			let posX = element.tileX;
			let posY = element.tileY;
			if(posX>=gameFieldXMax) return false;
			if(tetrisMap[posY][posX+1] instanceof Element) return false;
			return true;
		}
	}
	checkCollisionsY(){
		for(let element of currentDrawedObject.elementsArray){
			let posX = element.tileX;
			let posY = element.tileY;
			if(posY+1>=gameFieldYMax) return false;
			if(tetrisMap[posY+2][posX] instanceof Element) return false;
			return true;
		}
	}
}

class Figure{
	constructor(figureType){
		this.elementsArray = [];
		this.colorNumber = Math.floor(Math.random()*4);
		this.tile = tilesArray[this.colorNumber];
		switch(figureType){
			case 'Cube':
				this.elementsArray.push(new Element(4,0,this.tile));
				this.elementsArray.push(new Element(5,0,this.tile));
				this.elementsArray.push(new Element(5,1,this.tile));
				this.elementsArray.push(new Element(4,1,this.tile));
		}
	}

	moveAll(direction){
		for(let element of this.elementsArray){
			element.move(direction);
		}
	}

	gravityAll(){
		for(let element of this.elementsArray){
			element.gravity();
		}
	}

	paintElements(){
		for(let element of this.elementsArray){
			element.paintElement();
		}	
	}

	freeze(){
		for(let element of this.elementsArray){
			tetrisMap[element.tileY][element.tileX] = element;
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
		this.elementIsActive = true;
	}
	paintElement(){
		ctx.drawImage(this.tileColor, this.posX, this.posY);
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
currentDrawedObject = new Figure('Cube');
render();

// FUNCTIONAL BLOCK
function drawObjects(){
	if(gravityCounter == gravityCounterMax){
		if(!manager.checkCollisionsY()){
			currentDrawedObject.freeze();
			createNewObject();
			return;
		}
		currentDrawedObject.gravityAll();
		gravityCounter = 0;
	} 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0;i<tetrisMap.length;i++){
		for(j=0;j<tetrisMap[0].length;j++){
			if(tetrisMap[i][j] instanceof Element)
				tetrisMap[i][j].paintElement();
		}
	}
	currentDrawedObject.paintElements();
	gravityCounter++;
}

function render(){
	manager = new CollisionManager();
	setInterval(function(){drawObjects()}, 25);
}

function createNewObject(){
	currentDrawedObject = new Figure('Cube');
}
//OBJECT MANIPULATION
document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowLeft' && manager.checkCollisionsXLeft()) {
    currentDrawedObject.moveAll('left');
  }
  if(event.code == 'ArrowRight' && manager.checkCollisionsXRight()){
  	currentDrawedObject.moveAll('right');
  }
  if(event.code == 'ArrowDown'){
  	gravityCounter = 0;
  	gravityCounterMax = 5;
  }
});

// LOADING IMAGES
function loadResources(){
	blueTile.src = 'resources/blue_tile16.png';
	redTile.src = 'resources/red_tile16.png';
	orangeTile.src = 'resources/orange_tile16.png';
	greenTile.src = 'resources/green_tile16.png';
}
