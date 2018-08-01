class Cell{
	constructor(i)
	{
		this.i = i;
		this.x = createVector(i).x;
		this.y = createVector(i).y;
		this.col = this.x;
		this.row = this.y;
		this.megacell = determineMegacell(this.x, this.y);
		this.number = 0;
	}		
}	

class Vector{
	constructor(i)
	{
		this.y = Math.floor(i / 9);
		this.x = i - 9 * this.y;
	}
}

function createVector(i){
	return new Vector(i);
}

function initCells(){
	for(let i = 0; i<81; i++){

		cells.push(new Cell(i))
	}			
		
}

function determineMegacell(x,y)
{
	let megacell = Math.floor(x/3) + (Math.floor(y/3))*3;
	return megacell;
}

function viewCells(){
	cells.forEach(e=>{
		if(e.number != 0){

			$("#r"+e.y+" ."+e.x).text(e.number);
		}else{
			$("#err").css("background-color", "red");

		}
	})
}

