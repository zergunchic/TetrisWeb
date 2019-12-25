const canvas = document.getElementById("tetriscanvas");
const ctx = canvas.getContext("2d");
const blueTile = new Image();
const redTile = new Image();
const orangeTile = new Image();
const greenTile = new Image();
loadResources();
var curTime = new Date().getTime();
var keyPressedSet = new Set();
var tilesArray = [blueTile,redTile,orangeTile,greenTile];
var currentDrawedObject;
//Default tetris fild size - 20 x 10 (22 x 10)
var gameFieldXMax = 10;
var gameFieldYMax = 22;

var tetrisMap = Array(gameFieldYMax);
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
		}
		return true;
	}
	checkCollisionsXRight(){
		for(let element of currentDrawedObject.elementsArray){
			let posX = element.tileX;
			let posY = element.tileY;
			if(posX+1>=gameFieldXMax) return false;
			if(tetrisMap[posY][posX+1] instanceof Element) return false;
		}
		return true;
	}
	checkCollisionsY(){
		for(let element of currentDrawedObject.elementsArray){
			let posX = element.tileX;
			let posY = element.tileY;
			if(posY+1>=gameFieldYMax) return false;
			if(tetrisMap[posY+1][posX] instanceof Element) return false;
		}
		return true;
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

	rotate(){
		
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
const manager = new CollisionManager();
currentDrawedObject = new Figure('Cube');
render();

// FUNCTIONAL BLOCK
function drawObjects(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0;i<tetrisMap.length;i++){
		for(j=0;j<tetrisMap[0].length;j++){
			if(tetrisMap[i][j] instanceof Element)
				tetrisMap[i][j].paintElement();
		}
	}
	currentDrawedObject.paintElements();
}

function gravityImpact(){
	if(!manager.checkCollisionsY()){
		currentDrawedObject.freeze();
		createNewObject();
		return;
	}
	currentDrawedObject.gravityAll();
}

function update(lastTime){
	let timeStamp = new Date().getTime();
	let timeLast = timeStamp - lastTime;
	if(timeLast >=100){
		gravityImpact();
		curTime = new Date().getTime();
	}

}

function render(){
	setInterval(()=>{
		drawObjects();
		update(curTime);
	}, 1000/60);
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
  }
});

// LOADING IMAGES
function loadResources(){
	blueTile.src = 'resources/blue_tile16.png';
	redTile.src = 'resources/red_tile16.png';
	orangeTile.src = 'resources/orange_tile16.png';
	greenTile.src = 'resources/green_tile16.png';
}
