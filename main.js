let digits = [1,2,3,4,5,6,7,8,9];



let cells;
$(()=>{
	$("#gen").on("click",()=>{
		console.clear();
		cells = [];
		resetTable();
		
		initCells();


		let failCounter = 0;
		let failIndex = 0;
		for(let i = 0; i<81; i++){
			

			

			v = createVector(i);

			console.log(v.x+":"+v.y);

			let cell = _.find(cells, {x:v.x, y:v.y});

			if(!completeCell(cell)){
				if(i <= failIndex){
					failCounter++;
					i-=failCounter;
				}else{
					failIndex = i;
					failCounter = 1;
					i--;
				}

				if(i < 0) {
					resetCells()
					i=-1;
				} 
			}
		}

		viewCells();
	})
	
})

function resetCells(){
	cells=[];
	initCells();
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





