
	// var intervalIdTimer = setInterval ( stopwatch, 5e2 );
	var intervalIdNote;
	var btn   = document.getElementsByClassName('btn');
	var sec   = 0;
	var min   = 0;
	var hour  = 0;

	function stopwatch() {

		var timer = document.getElementById('timer');
		var a 	  = timer.style.opacity || 1;
		timer.style.opacity = ((parseInt(a)) ? 0 : 1);
		
		if ( timer.style.opacity == 1 ) {

			sec = watch( 'sec', sec );
			
			if ( sec == '00' ) {

				min = watch( 'min', min );
				
				if ( min == '00' ) {
				
					hour = watch( 'hour', hour );	
					
				}
			}
		}
	}
	
	function watch( str, data ) {
		Number(data) == 59 ? data = '00' : Number(++data);
		data.toString().length == 1 ? data = "0" + data : data;
		document.getElementById(str).innerHTML = data;
		return data; 		
	}
	
	function pauseResume() {	
		
		// if ( document.querySelector('.stop').textContent === "START" ) {
		if ( document.getElementById('notefication').textContent === "GAME OVER" ) {

			document.location.assign( document.URL );
		} 
		else {
			if ( timeoutId !== undefined ) {

				clearTimeout( timeoutId );
				timeoutId = undefined;
				
				clearInterval( intervalIdTimer );
				intervalIdTimer = undefined;
				
				finishGame( '<H1>PAUSE</H1>' );
				
				getSoundPause( 'magcharge_deactivate_win32.mp3' );
			} 
			else {
				clearInterval( intervalIdNote );
				document.getElementById('container').style.backgroundColor = 'white';
				document.getElementById('notefication').innerHTML = '';
				document.querySelector('.point').style.color = 'black';
				// document.querySelector('.stop').innerHTML = 'PAUSE';

				for ( var i = 0; i < btn.length; i++ ) {
					btn[i].disabled = false;
					// btn[i].style.backgroundColor = "rgb(76, 175, 80)"; 
				}
				
				if ( typeof drawShape == 'function' ) {
					intervalIdNote = undefined;
					intervalIdTimer = setInterval ( stopwatch, 5e2 );
					timeoutId = setTimeout( drawShape, _speed );
				} 
				
				if ( typeof drawSnakeUp == 'function' ) {
					intervalIdNote = undefined;
					intervalIdTimer = setInterval ( stopwatch, 5e2 );
					setTimeout( drawSnakeUp, speed);
				}
				
				getSoundPause( 'magcharge_activate_win32.mp3' );
			}				
		}
	}
	
	function getSoundPause( arg ) {
		var audio = new Audio();
		audio.preload = 'auto';
		audio.src = './music/' + arg;
		audio.play();
	}
	
	function finishGame( str ) {

		if ( str === '<H1>GAME OVER</H1>' ) {
			
			for ( var i = 0; i < btn.length; i++ ) {
				btn[i].disabled = true;
				// btn[i].style.backgroundColor = "rgb(205, 205, 205)";
			}
			clearInterval(intervalIdTimer);
			// document.querySelector('.stop').innerHTML = 'START';
		} 
		else if ( str == '<H1>PAUSE</H1>' ) {
			for ( var i = 0; i < btn.length; i++ ) {
				btn[i].disabled = true;
				// btn[i].style.backgroundColor = "rgb(205, 205, 205)";
			}			
			// document.querySelector('.stop').innerHTML = 'RESUME';
		}

		document.getElementById('notefication').innerHTML = str;
		document.getElementById('container').style.backgroundColor = 'gray';
		document.querySelector('.point').style.color = 'white';
		// console.log('method finishGame()');
		
		intervalIdNote = setInterval(function(){
			var a = document.getElementById('notefication').style.opacity || 1;
			document.getElementById('notefication').style.opacity = ((parseInt(a)) ? 0 : 1);
		}, 1e3);
	}
	