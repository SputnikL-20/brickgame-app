let future_ID;
let _ID = 0;
let shape_ = [];

let arr = [0,1,2,3];
let n = arr.length;
for(let i=0;i<n;i++) {
let x = Math.floor(Math.random() * (n - 1));
let tmp = arr[i];
arr[i] = arr[x];
arr[x] = tmp;
// console.log(x);
}

// console.log(x);
for(let j=0;j<n;j++) {
	console.log(arr[j]);
}

init();

function init() { 			 			
	_num = 0; 			 			
	 			
	future_ID !== undefined ? _ID = future_ID : _ID = 0; 			
//	shape_mod = shape_[_ID]; 			
// console.log(shape_mod);					
console.log('drawShape()');				
future_ID = Math.floor(Math.random() * 7); 	
console.log(future_ID);	console.log('drawShapeWindow( shape_[future_ID] )'); 			

	} 
