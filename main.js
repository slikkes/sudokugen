let digits = [1,2,3,4,5,6,7,8,9];

class Cell{
	constructor(posx, posy)
	{
		this.x = posx;
		this.y = posy;
		this.col = this.x;
		this.row = this.y;
		this.megacell = determineMegacell(this.x, this.y);
		this.number = 0;
	}		
}	

let cells;
$(()=>{
	$("#gen").on("click",()=>{
		console.clear();
		cells = [];
		resetTable();
		
		initCells();

		setRandomCells();

		/*cells.forEach(e=>{
			if(e.number == 0){
				completeCell(e);
			}
		})*/

		for(y=0; y<9; y++){
			for(x=0; x<9; x++){
				let cell = _.find(cells, {x:x, y:y});
				if(cell.number == 0){
					if(!completeCell(cell)){
						console.log("asd")
					}
				}
			}
		}


		viewCells();
	})
	
})

function initCells(){
	for(y=0;y<9;y++){
		for(x=0;x<9;x++){
			cells.push(new Cell(x,y))
		}
	}
}

function setRandomCells()
{
	let q = 10;

	for(let i = 0; i<q; i++){
		let x = Math.floor(Math.random()*8);
		let y = Math.floor(Math.random()*8);

		let cell = _.find(cells,{x: x, y: y});

		completeCell(cell);
	}

}


function completeCell(cell)
{

	let availableDigits = getAvailableDigits(cell.x,cell.y);
	let max = availableDigits.length;

	if(max>0){
		let choosen = Math.floor(Math.random()*max);
		let number = availableDigits[choosen];

		cell.number=number;

		return true;
	}else{
		return false;
	}

}


function determineMegacell(x,y)
{
	let megacell = Math.floor(x/3) + (Math.floor(y/3))*3;
	return megacell;
}


function getAvailableDigits(x,y)
{
	let existingDigits = [];
	let megacell = determineMegacell(x,y);

	let count = 0;

	cells.forEach(e=>{
		if(e.x == x || e.y == y || e.megacell == megacell) 
		{
			existingDigits.push(e.number);
		}
	})

	existingDigits=_.uniq(existingDigits);
	return _.difference(digits,existingDigits);
}

function resetTable(){
	for(y=0;y<9;y++){
		for(x=0;x<9;x++){
			$("#r"+y+" ."+x).text("");

		}
	}
	$("#err").css("background-color", "white");

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






