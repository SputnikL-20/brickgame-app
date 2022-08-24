
	var timeoutId;
	var timeoutIdClear;
	var intervalIdTimer = setInterval ( stopwatch, 5e2 );
	var brick 			= 0;
	var speed 			= 800;
	var shape_mod 		= [55];
	var shape_old 		= [];
	var left_wall  		= [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200];
	var right_wall 		= [19,29,39,49,59,69,79,89,99,109,119,129,139,149,159,169,179,189,199,209];
	var up_wall 		= [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	var down_wall  		= [200,201,202,203,204,205,206,207,208,209];
	var arg 			= [ brickMapRandom() ];
	
		function drawArea()
		{
			document.writeln("<div class='display-area'><table><tbody>");		
			for (var j = 1; j < 21; j++) {
				document.writeln("<tr>");

				for (var i = 0; i < 10; i++) {
					document.writeln("<td class='td-border' id=" + j + "" + i + "><canvas id='canva_" + j + "" + i + "' width='20' height='20'></canvas></td>");
				}
				document.writeln("</tr>");
			}
			document.writeln("</tbody></table></div>");
			
			drawSnakeLeft();		
			setTimeout( brickDraw, 15000);		

		}
	
		function drawPast( id_canvas ) {
			var canvas = document.getElementById( id_canvas );
			try {
				if (canvas.getContext) {
					var ctx = canvas.getContext('2d');
					ctx.fillRect(5, 5, 10, 10);
				}		
			} catch (e) {
				null;
			}
		}
		
		function drawPastClear( id_canvas ) {
			var canvas = document.getElementById( id_canvas );
			try {
				if (canvas.getContext) {
					var ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, 20, 20);
				}		
			} catch (e) {
				null;
			}
		}

	function drawShapePaint(shape) {
		
		for ( var i = 0; i < shape.length; i++ ) {
			document.getElementById(shape[i].toString()).style.backgroundColor = 'gray';
			document.getElementById(shape[i].toString()).style.borderColor = 'black'
			drawPast( 'canva_' + shape[i] );	
		}
	}
	
	function clearShape(shape) {
	
		for ( var i = 0; i < shape.length; i++) {
			document.getElementById(shape[i].toString()).style.background = 'none';
			document.getElementById(shape[i].toString()).style.border = '0.1px solid #cdcdcd';
			drawPastClear( 'canva_' + shape[i] );	
		}
	}


	function brickMapRandom() {
		var min = 10
		var max = 210;
		var x = Math.floor(Math.random() * (max - min) + min);
		return x;
	}   	

	function brickDraw() {
		drawShapePaint(arg);
		brick = arg;
		setTimeout(fireWall, 10000, arg, 0 );
		arg = [ brickMapRandom() ];
	}

	function fireWall( arg, i ) {

		if ( i !== 10) {
			i !== 0 ? drawShapePaint( arg ) : null;
			setTimeout( clearShape, 150, arg );
			setTimeout( fireWall, 300, arg, ++i );				
		} else {
			brick.pop();
			setTimeout( brickDraw, 15000);
		}
	}

	function snakeValidate() 
	{
		if ( brick[0] == shape_mod[0] ) {
			shape_mod.splice(0, 0, brick[0]);
			brick.pop();
			// console.log(shape_mod);
		}
	}

	function drawSnakeLeft() 
	{	
		clearTimeout(timeoutIdClear);
		clearShape(shape_old);
		clearTimeout(timeoutId);
		drawShapePaint(shape_mod);
		timeoutIdClear = setTimeout( clearShape, speed, shape_mod);
		// orientation.left();
		orientationLeft();
		timeoutId = setTimeout( drawSnakeLeft, speed);
	}
	
	function drawSnakeUp() 
	{	
		clearTimeout(timeoutIdClear);
		clearShape(shape_old);
		clearTimeout(timeoutId);
		drawShapePaint(shape_mod);
		timeoutIdClear = setTimeout( clearShape, speed, shape_mod);
		// orientation.up();
		orientationUp();
		timeoutId = setTimeout( drawSnakeUp, speed);
	}
	
	function drawSnakeRight() 
	{	
		clearTimeout(timeoutIdClear);
		clearShape(shape_old);
		clearTimeout(timeoutId);
		drawShapePaint(shape_mod);
		timeoutIdClear = setTimeout( clearShape, speed, shape_mod);	
		// orientation.right();
		orientationRight();
		timeoutId = setTimeout( drawSnakeRight, speed);
	}
	
	function drawSnakeDown() 
	{	
		clearTimeout(timeoutIdClear);
		clearShape(shape_old);
		clearTimeout(timeoutId);
		drawShapePaint(shape_mod);
		timeoutIdClear = setTimeout( clearShape, speed, shape_mod);
		// orientation.down();
		orientationDown();
		timeoutId = setTimeout( drawSnakeDown, speed);
	}

	function orientationLeft () {

		var tmp = []; 
		shape_old = shape_mod;				
			
		for ( var i = 0; i < shape_mod.length; i++ ) {
			if ( i == 0 ) {
				if ( left_wall.includes ( shape_mod[0] ) ) {
					tmp[i] = shape_mod[i] + 9;
				} else {
				tmp[i] = shape_mod[i] - 1; 
				}      
			} else {
			tmp[i] = shape_mod[i - 1];
			}
		}
		
		shape_mod = tmp;
		snakeValidate();
	}
	
	function orientationUp () {

		var tmp = []; 
		shape_old = shape_mod;				
		
		for ( var i = 0; i < shape_mod.length; i++ ) {
			if ( i == 0 ) {
				if ( up_wall.includes ( shape_mod[0] ) ) {
					tmp[i] = shape_mod[i] + 190;
				} else {
				tmp[i] = shape_mod[i] - 10; 
				}      
			} else {
			tmp[i] = shape_mod[i - 1];
			}
		}

		shape_mod = tmp;
		snakeValidate();
	}
	
	function orientationRight () {

		var tmp = []; 
		shape_old = shape_mod;				
		
		for ( var i = 0; i < shape_mod.length; i++ ) {
			if ( i == 0 ) {
				if ( right_wall.includes ( shape_mod[0] ) ) {
					tmp[i] = shape_mod[i] - 9;
				} else {
				tmp[i] = shape_mod[i] + 1; 
				}      
			} else {
			tmp[i] = shape_mod[i - 1];
			}
		}

		shape_mod = tmp;
		snakeValidate();
	}
	
	function orientationDown () {

		var tmp = []; 
		shape_old = shape_mod;				
		
		for ( var i = 0; i < shape_mod.length; i++ ) {
			if ( i == 0 ) {
				if ( down_wall.includes ( shape_mod[0] ) ) {
					tmp[i] = shape_mod[i] - 190;
				} else {
				tmp[i] = shape_mod[i] + 10; 
				}      
			} else {
			tmp[i] = shape_mod[i - 1];
			}
		}
		
		shape_mod = tmp;
		snakeValidate();
	}

	/* deprecated cordova */
	var orientation = {
		left: function () {
		
				var tmp = []; 
				shape_old = shape_mod;				
					
				for ( var i = 0; i < shape_mod.length; i++ ) {
					if ( i == 0 ) {
						if ( left_wall.includes ( shape_mod[0] ) ) {
							tmp[i] = shape_mod[i] + 9;
						} else {
						tmp[i] = shape_mod[i] - 1; 
						}      
					} else {
					tmp[i] = shape_mod[i - 1];
					}
				}
				
				shape_mod = tmp;
				snakeValidate();
			},
		up  : function () {
		
				var tmp = []; 
				shape_old = shape_mod;				
				
				for ( var i = 0; i < shape_mod.length; i++ ) {
					if ( i == 0 ) {
						if ( up_wall.includes ( shape_mod[0] ) ) {
							tmp[i] = shape_mod[i] + 190;
						} else {
						tmp[i] = shape_mod[i] - 10; 
						}      
					} else {
					tmp[i] = shape_mod[i - 1];
					}
				}

				shape_mod = tmp;
				snakeValidate();
			},
	   right: function () {
	   
				var tmp = []; 
				shape_old = shape_mod;				
				
				for ( var i = 0; i < shape_mod.length; i++ ) {
					if ( i == 0 ) {
						if ( right_wall.includes ( shape_mod[0] ) ) {
							tmp[i] = shape_mod[i] - 9;
						} else {
						tmp[i] = shape_mod[i] + 1; 
						}      
					} else {
					tmp[i] = shape_mod[i - 1];
					}
				}

				shape_mod = tmp;
				snakeValidate();
			},
		down: function () {
		
				var tmp = []; 
				shape_old = shape_mod;				
				
				for ( var i = 0; i < shape_mod.length; i++ ) {
					if ( i == 0 ) {
						if ( down_wall.includes ( shape_mod[0] ) ) {
							tmp[i] = shape_mod[i] - 190;
						} else {
						tmp[i] = shape_mod[i] + 10; 
						}      
					} else {
					tmp[i] = shape_mod[i - 1];
					}
				}
				
				shape_mod = tmp;
				snakeValidate();
			}
	};
	
	document.addEventListener('keydown', function(event) 
	{
		if (event.code == 'ArrowLeft') {

			drawSnakeLeft();
		} 
		else if (event.code == 'ArrowRight') {
		
			drawSnakeRight();
		}
		else if (event.code == 'ArrowUp') {

			drawSnakeUp();
		} 
		else if (event.code == 'ArrowDown') {
		
			drawSnakeDown();
		}
	});	