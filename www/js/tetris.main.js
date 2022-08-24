	
	const shape_   = [
					  [14, 15, 16, 25],		// Member		_ID 0
					  [14, 15, 16],			// line			_ID 1
					  [15, 24, 25, 34],		// Zuu			_ID 2
					  [14, 15, 24, 25],		// Rectangle	_ID 3
					  [16, 24, 25, 26],		// L			_ID 4
					  [15, 16, 24, 25],		// Zuu revers	_ID 5
					  [14, 24, 25, 26]		// L revers		_ID 6
				     ];
	var shapeArr   = [];
	
	var up_wall    = [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39];
	var left_wall  = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200];
	var right_wall = [19,29,39,49,59,69,79,89,99,109,119,129,139,149,159,169,179,189,199,209];
	var down_wall  = [200,201,202,203,204,205,206,207,208,209];
	
	var shape_mod  = [];
	var wall 	   = [];

	var _ID		   = 0;
	var future_ID  = 0;
	var _num   	   = 0;
	
	var _score     = 0;
	var hiscore    = findCookie( 'hiscore' ).toString();
	var _level     = 0;
	var _speed     = 1000;
	
	var timeoutId;
	var intervalId;
	var intervalIdTimer = setInterval ( stopwatch, 5e2 );
	
	var audio = new Audio(); // Создаём новый элемент Audio
	var soundRadio = false;
	var musicRadio = false;

	// var audio = new Audio(); // Создаём новый элемент Audio
	// audio.preload = 'auto';
	// _level = 1 ? audio.src = './music/amb_river.ogg' : audio.src = './music/amb_brzeg.ogg'; // Указываем путь к звуку 
	// audio.loop = true;
	
	
	
		function init() {
			
			_num = 0;
			
			clearShapeWindow( [14, 15, 16, 24, 25, 26, 34] );
			
			if (shapeArr.length == 0) 
			{		
				_ID = Math.floor(Math.random() * 7);
				shape_mod = shape_[_ID];		
				initArr();
				
			} else {
				
				equalsArr(future_ID - 1);
				shape_mod = shapeArr[future_ID - 1];
				
			}

			document.querySelector('.point').innerHTML = 'S : ' + _score;
			
			
			if ( Number(_score) >= 500 ) {
				_speed = 800;
				_level = 1;
			} 
			if ( Number(_score) >= 1500 ) {
				
				_speed = 750;
				_level = 2;
			} 
			if ( Number(_score) >= 3000 ) {
				_speed = 700;
				_level = 3;
			} 
			if ( Number(_score) >= 4000 ) {
				_speed = 650;
				_level = 4;
			} 
			if ( Number(_score) >= 5000 ) {
				_speed = 600;
				_level = 5;
			}
			if ( Number(_score) >= 8000 ) {
				_speed = 550;
				_level = 6;
			}
			if ( Number(_score) >= 10000 ) {
				_speed = 500;
				_level = 7;
			}
			if ( Number(_score) >= 12000 ) {
				_speed = 450;
				_level = 8;
			}
			if ( Number(_score) >= 15000 ) {
				_speed = 400;
				_level = 9;
			}
			if ( Number(_score) < 500 ) {
				_speed = 900;
			} 
			
			document.querySelector('.level').innerHTML = 'L: ' + _level;
			
			if ( gameValidate(wall) == 0 ) {
				
				finishGame( '<H1>GAME OVER</H1>' );

				if ( hiscore < _score ) {
					addCookie( 'hiscore', _score, 14 );
				}
				
			} else {
				
				drawShape();			
				
				if (shapeArr.length == future_ID) {
					
					initArr();
					drawShapeWindow( shapeArr[future_ID] );
					// console.log('future_ID shape initArr() ' + future_ID);
					
				} else {
					
					drawShapeWindow( shapeArr[future_ID] );
					// console.log('future_ID shape ' + future_ID);
				}

				future_ID++;
			}
			
			
		}
		
		function randomShape( arr ) {
			
			let n = arr.length;

			for(let i = 0; i < n; i++) {
				let x = Math.floor(Math.random() * (n - 1));
				let tmp = arr[i];
				arr[i] = arr[x];
				arr[x] = tmp;
				
			}		
			return arr;
		}
		
		function equalsArr(arg) {
			
			for(let i = 0; i < shape_.length; i++) {
				
				if(JSON.stringify(shape_[i]) === JSON.stringify(shapeArr[arg])) {
					_ID = i;
				}
			}
		}
		
		function initArr() {
			for(let j = 0; j < shape_.length; j++) {
				shapeArr[j] = [];
				for(let k = 0; k < shape_[j].length; k++) {
					shapeArr[j][k] = shape_[j][k];
				}
			}
			randomShape( shapeArr );
			future_ID = 0;
		}

		function drawArea()
		{
			if ( findCookie( 'wall' ) != "" ) {
				
				wall_cookie = findCookie( 'wall' );
				shape_mod   = [14,15,24,25];
				
				if ( gameValidate( wall_cookie ) != 0 ) {
					var arg = confirm('Имеется сохранёная игра. Cумма очков ' + Number( findCookie( '_score' ).toString() ) + '. Продолжить игру?');
				}
			}
			
			document.writeln("<div class='display-area'><table><tbody>");		
			for (let j = 1; j < 21; j++) {
				document.writeln("<tr>");

				for (let i = 0; i < 10; i++) {
					document.writeln("<td class='td-border' id=" + j + "" + i + "><canvas id='canva_" + j + "" + i + "' width='20' height='20'></canvas></td>");
				}
				document.writeln("</tr>");
			}
			document.writeln("</tbody></table></div>");	
			
			drawWindow();
			
			if ( arg ) {
				if ( findCookie( '_score' ) != "" ) {
					_score = Number( findCookie( '_score' ).toString() ); 
				}
				
				if ( findCookie( 'wall' ) != "" ) {
					wall = findCookie( 'wall' );
					drawShapePaint( wall );
				}				
			} else {
				removeCookie( '_score' );
				removeCookie( 'wall' );
			}

			init();
		}
		
		function drawWindow()
		{
			document.writeln("<div class='window-area'><table><tbody>");		
			for (var j = 0; j < 5; j++) {
				document.writeln("<tr>");

				for (var i = 3; i < 8; i++) {
					document.writeln("<td id=" + j + "_" + i + "><canvas id='canva_w_" + j + "" + i + "' width='20' height='20'></canvas></td>");
				}
				document.writeln("</tr>");
			}
			document.writeln("</tbody></table></div>");	
		}
		
		function drawNotes() {
			document.writeln("<div id='notes'>");
			document.writeln("<p>HISCORE</p>");
			document.writeln("<p id='hi'>0000000</p>");
			document.writeln("</div>");
			document.getElementById('hi').innerHTML = hiscore;
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
		
		function drawShapeWindow( args ) {

			for ( var i = 0; i < args.length; i++ ) {
				var arg = args[i].toString().split('');
				document.getElementById(arg[0] + '_' + arg[1]).style.backgroundColor = 'gray';
				document.getElementById(arg[0] + '_' + arg[1]).style.border = '0.1px solid black';	
				drawPast( 'canva_w_' + args[i] );	
			}		
		}
		
		function clearShapeWindow( args ) {

			for ( var i = 0; i < args.length; i++ ) {
				var arg = args[i].toString().split('');
				document.getElementById(arg[0] + '_' + arg[1]).style.background = 'none';
				document.getElementById(arg[0] + '_' + arg[1]).style.border = 'none';	
				drawPastClear( 'canva_w_' + args[i] );	
			}		
		}
		
		
		function gameValidate(args) 
		{
			
			var j = 0;

			shape_mod.forEach( (item) => {

				if ( args.findIndex ( (el) => el == item ) != -1 ) {
					j++;
				} 

			});

			return j == 0 ? 1 : 0;
		}
		
		function leftBorder(mas) {
			var tmp = []
			var t   = 0;
			for ( var i = 0; i < 3; i++ ) {
				for ( var k = 0; k < mas.length; k++ ) {
					tmp[t] = mas[k] + i; 
					t++;
				}
			}
			return tmp;
		}
		
		function rightBorder(mas) {
			var tmp = []
			var t   = 0;
			for ( var i = 0; i < 3; i++ ) {
				for ( var k = 0; k < mas.length; k++ ) {
					tmp[t] = mas[k] - i; 
					t++;
				}
			}
			return tmp;
		}

		function drawShape() 
		{			
			
			drawShapePaint( shape_mod );
			
			if ( gameValidate( down_wall ) == 1 ) {
				
				if ( gameValidate( wall.map(item => Number(item) - 10) ) == 1 ) {
				
					setTimeout( clearShape, _speed, shape_mod );	
					
					oneDownShape( shape_mod );
					
					timeoutId = setTimeout( drawShape, _speed );
					
				} 
				else {
					colovratiy();
				}	
			} 
			else {
				colovratiy();
			}	
		}
		
		function colovratiy() {
			
			getSoundGame( 'car_impact_02_win32.mp3' );
			
			wall = wall.concat( shape_mod );
			wall.sort( (a, b) => a - b );
			recurPoint( wall, 0 );
			
			// console.log(wall); 
			addCookie( 'wall', wall, 10 );
			
			// console.log(_score);
			addCookie( '_score', _score, 10 );
			
			init();		
		}
		
		function recurPoint( arr, p_line ) {

			var tmp = [];
			var del = [];
			var box = arr;
			var j = 0;
			var point_line = p_line;
			
			for ( var i = 0; i < box.length; i++ ) {
			
				var m = box[i].toString().split('');
				
				f = m[m.length - 2];
				//     console.log('f - ' + m);

				for ( var k = i; k < box.length; k++ ) {

					var m = box[k].toString().split('');

					//       console.log(m[m.length - 2] + m[m.length - 1]);

					if ( f == m[m.length - 2] && m[m.length - 1] == j ) {

						j++;

						if ( j == 10 ) {
							// извлечь начало массива и увеличиваем на 10
							tmp = arr.splice(0, k - 9).map(item => Number(item) + 10);

							// console.log('tmp - ' + tmp);
							// console.log('arr - ' + arr);

							del = arr.splice(0, 10);
							
							// console.log('point - ' + del);
							
							fireWall( del, 0 );
							
							getSoundGame( 'concrete_floor_break_01_win32.mp3' );
							
							// setTimeout( clearShape, 400, del );
							// console.log('tmp - ' + tmp);

							setTimeout( clearShape, 325, tmp.map(item => Number(item) - 10) );
							// console.log('tmp - ' + tmp);
							// console.log(arr);

							wall = tmp.concat(arr); // соединяем с остатками

							// console.log('wall - ' + wall);
							wall.sort( (a, b) => a - b );

							setTimeout( drawShapePaint, 325, wall );

							// _score = _score + 10;
							point_line = point_line + 1;
							
							setTimeout( recurPoint, 325, wall, point_line );

							switch ( point_line ) {
								case 1:
										_score = _score + 10;
									break;
								case 2:
										_score = _score + 20;
									break;
								case 3:
										_score = _score + 20;
									break;
								default:
									null;
							}
							
							// console.log(wall); 
							addCookie( 'wall', wall, 10 );
							
							// console.log(_score);
							addCookie( '_score', _score, 10 );
							
							document.querySelector('.point').innerHTML = 'S: ' + _score;
							// console.log( 'point_line = ' + point_line );
							
							k = box.length;
							i = box.length;
						}
					} 
					else {
						j = 0;
						break;
					}
				}
			}			
		}
		
		function fireWall( arg, i ) {

			if ( i !== 5) {
				i !== 0 ? drawShapePaint( arg ) : null;
				setTimeout( clearShape, 25, arg );
				setTimeout( fireWall, 50, arg, ++i );
			}
		}
		
		function oneLeftShape(shape) {

			var j = 0;
			shape.forEach( (item) => {

				if ( left_wall.findIndex ( (el) => el == item ) != -1 ) {
					j++;
				} 

			});
			if ( j == 0 ) {
				if ( gameValidate( wall.map(item => Number(item) + 1) ) == 1 ) {
					shape_mod = shape.map(item => Number(item) - 1);			
				}
			}
			
			getSoundGame( 'player_foley_switch_4_win32.mp3' );
		}
		
		function oneRightShape(shape) {

			var j = 0;
			shape.forEach( (item) => {

				if ( right_wall.findIndex ( (el) => el == item ) != -1 ) {
					j++;
				} 

			});
			if ( j == 0 ) {
				if ( gameValidate( wall.map(item => Number(item) - 1) ) == 1 ) {
					shape_mod = shape.map(item => Number(item) + 1);
				}
			}
			
			getSoundGame( 'player_foley_switch_4_win32.mp3' );
		}
		
		function oneDownShape(shape) {
			
			shape_mod = shape.map(item => Number(item) + 10);
		}	
		
		function rotateShape(arr, _ID) {
			
			if ( _ID == 0 ) { // Member
				var tmp = [
					[arr[0] + 9, arr[1] + 0, arr[2] + 0, arr[3] + 0],				
					[arr[0] - 9, arr[1] - 1, arr[2] - 1, arr[3] + 0], 		
					[arr[0] + 0, arr[1] + 0, arr[2] + 0, arr[3] - 9],			
					[arr[0] + 0, arr[1] + 1, arr[2] + 1, arr[3] + 9] 	
				];
				
				_num++;
				if ( _num == 4 ) {
					_num = 0;
				}

				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			} 
			else if ( _ID == 1 ) {  // line
				var tmp = [
					[arr[0] + 9, arr[1] + 0, arr[2] - 9],
					[arr[0] - 9, arr[1] + 0, arr[2] + 9],
				];
				<!-- _num == 0 ? shape_mod = tmp[_num++] : shape_mod = tmp[_num--];		 -->
				_num == 0 ? tmp[_num++] : tmp[_num--];
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 3 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 3 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}					
			} 
			else if ( _ID == 2 ) { // Zuu
				var tmp = [
					[arr[0] + 2, arr[1] + 10, arr[2] + 1, arr[3] + 9],
					[arr[0] - 2, arr[1] - 10, arr[2] - 1, arr[3] - 9],
				];
				<!-- _num == 0 ? shape_mod = tmp[_num++] : shape_mod = tmp[_num--];	 -->
				_num == 0 ? tmp[_num++] : tmp[_num--];	
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			} 
			else if ( _ID == 3 ) { // Rectangle
				shape_mod = arr;
			} 
			else if ( _ID == 4 ) { // L
				var tmp = [
					[arr[0] +  2, arr[1] +  9, arr[2] +  0, arr[3] -  9],		
					[arr[0] -  1, arr[1] +  1, arr[2] + 10, arr[3] + 10], 					 
					[arr[0] +  9, arr[1] +  0, arr[2] -  9, arr[3] -  2],				
					[arr[0] - 10, arr[1] - 10, arr[2] -  1, arr[3] +  1] 	
				];

				_num++;
				if ( _num == 4 ) {
					_num = 0;
				}
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			} 
			else if ( _ID == 5 ) { // Zuu revers
				var tmp = [
					[arr[0] + 11, arr[1] + 2, arr[2] + 9, arr[3]],
					[arr[0] - 11, arr[1] - 2, arr[2] - 9, arr[3]],
				];
				<!-- _num == 0 ? shape_mod = tmp[_num++] : shape_mod = tmp[_num--];	 -->
				_num == 0 ? tmp[_num++] : tmp[_num--];	
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}

			} 
			else if ( _ID == 6 ) { // L revers
				var tmp = [
					[arr[0] - 1, arr[1] - 1, arr[2] - 9, arr[3] - 9],		
					[arr[0] + 1, arr[1] - 8, arr[2] + 0, arr[3] + 9], 					 
					[arr[0] + 9, arr[1] + 9, arr[2] + 1, arr[3] + 1],				
					[arr[0] - 9, arr[1] + 0, arr[2] + 8, arr[3] - 1] 	
				];
				
				_num++;
				if ( _num == 4 ) {
					_num = 0;
				}
				
				if ( gameValidate(left_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( leftBorder(left_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) + 1);
				} 
				else if ( gameValidate(right_wall) == 0 ) {
					var j = 0;
					tmp[_num].forEach( (item) => {
						if ( rightBorder(right_wall).findIndex ( (el) => el == item ) != -1 ) {
							j++;
						} 
					});

					j == 4 ? shape_mod = tmp[_num] : shape_mod = tmp[_num].map(item => Number(item) - 1);
				} 
				else {
					shape_mod = tmp[_num];
				}
			}
			
			getSoundGame( 'player_foley_switch_4_win32.mp3' );
		}
		
		document.addEventListener('keydown', function(event) 
		{
			if (event.code == 'ArrowLeft') {
				
				oneLeftShape(shape_mod);
			} 
			else if (event.code == 'ArrowRight') {

				oneRightShape(shape_mod);
			} 
			else if (event.code == 'ArrowUp') {
			
				rotateShape(shape_mod, _ID);
			} 
			else if (event.code == 'ArrowDown') {
				getDownPlusSound();
				// _speed = 10;
			} 
			else if (event.code == 'Space') {
				pauseResume();
			}
		});	
		
		function getDownPlusSound() {
			
			_speed = 10;
			getSoundGame( 'bullet_by_machines_01_win32.mp3' ); 
		}
		
		function getSoundGame( arg ) {
			
			// var soundRadio = document.getElementById('soundRadio').checked;
			
			if ( soundRadio ) {
				var audio = new Audio();
				// audio.preload = 'auto';
				audio.src = './music/' + arg;
				audio.play();				
			}
		}
		
		function getSound() {
			soundRadio === false ? soundRadio = true : soundRadio = false;
			// console.log(soundRadio);
		}
		
		function getMusicGame() {
			
			// audio.preload = 'auto';
			// _level = 1 ? audio.src = './music/amb_river.ogg' : audio.src = './music/amb_brzeg.ogg'; // Указываем путь к звуку 

			audio.src = './music/music_ms04_battle_win32 (online-audio-converter.com).mp3'; 
			audio.loop = true;			
			// var musicRadio = document.getElementById('musicRadio').checked;
	
			musicRadio === true ? audio.play() : audio.pause();
		}
		
		function getMusic() {
			musicRadio === false ? musicRadio = true : musicRadio = false;
			getMusicGame();
		}
		
		
		function addCookie(szName, szValue, dtDaysExpires) 
		{
			var dtExpires = new Date();
			var dtExpiryDate = "";

			dtExpires.setTime(dtExpires.getTime() + 
			dtDaysExpires * 24 * 60 * 60 * 1000);

			dtExpiryDate = dtExpires.toGMTString();

			document.cookie = 
			szName + "=" + szValue + "; expires=" + dtExpiryDate;
		}
		
		function findCookie( szName ) 
		{
			var i = 0;
			var nStartPosition = 0;
			var nEndPosition = 0;  
			var szCookieString = document.cookie;  
			var str = "";
			var arr = [];

			while ( i <= szCookieString.length ) 
			{
				nStartPosition = i;
				nEndPosition = nStartPosition + szName.length;

				if( szCookieString.substring( nStartPosition,nEndPosition ) == szName ) 
				{
					nStartPosition = nEndPosition + 1;
					nEndPosition = document.cookie.indexOf( ";", nStartPosition );

					if( nEndPosition < nStartPosition ) {
						nEndPosition = document.cookie.length;
					}

					str = document.cookie.substring( nStartPosition, nEndPosition );  
					arr = str.split(",");

					for ( var j = 0; j < arr.length; j++ ) {
						arr[j] = Number(arr[j]);
					}

					return arr;
					break;    
				}
				i++;  
			}
			return "";
		}
		
		function removeCookie( szName ) 
		{
			var dtExpires = new Date();
			dtExpires.setTime(dtExpires.getTime() - 1);

			var szValue = findCookie( szName );

			document.cookie = szName + "=" + szValue + "; expires=" + dtExpires.toGMTString();
		}