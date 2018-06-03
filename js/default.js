(function(){
	'use strict';

	let times = 0,
		turn = 0,
		checked = 0;

	let x = [],
		o = [];

	let container = document.getElementsByClassName('container')[0],
		containers = document.getElementsByTagName('div');

	// X
	let imgXfake = document.createElement("img");
		imgXfake.src = "img/x-opacity.png";
		imgXfake.classList.add('fake');

	let imgXreal = document.createElement("img");
		imgXreal.src = "img/x.png";
		imgXreal.classList.add('real');

	// O
	let imgOfake = document.createElement("img");
		imgOfake.src = "img/o-opacity.png";
		imgOfake.classList.add('fake');

	let imgOreal = document.createElement("img");
		imgOreal.src = "img/o.png";
		imgOreal.classList.add('real');

	function clicked(e, i){
		times++;
	}

	function over(e, i){
		if(turn == 0){
			containers[i].appendChild(imgXfake);
		}else if(turn == 1){
			containers[i].appendChild(imgOfake);
		}
	}

	function createButton(text){
		// Create a <button> element
		var btn = document.createElement("BUTTON");

		// Create a text node
		var t = document.createTextNode(text);

		// Append the text to <button>  
		btn.appendChild(t);

		// Append <button> to <body>
		document.body.appendChild(btn);

		btn.onclick = function(){
			location.reload();
		};
	}

	for(let i = 0; i < containers.length; i++){

		containers[i].addEventListener('click', function(e){

			var checkImageFake = containers[i].getElementsByClassName('fake');
			var checkImageReal = containers[i].getElementsByClassName('real');

			if(checkImageReal.length <= 0){
				clicked(e, i);

				if(turn == 0){
					var img = imgXreal.cloneNode();
					x.push(i);
					checked++;
				}else if(turn == 1){
					var img = imgOreal.cloneNode();
					o.push(i);
					checked++;
				}

				console.log(`x:${x} o:${o}`);

				containers[i].appendChild(img);

				if(turn == 0){
					containers[i].removeChild(imgXfake);
				}else if(turn == 1){
					containers[i].removeChild(imgOfake);
				}

				if(turn < 1)
					turn++;
				else if(turn == 1)
					turn = 0;

				// Iterate through an array to check wether
				// it has the values inputted.
				// array parameter is the array to input the values.
				function iterateX(array){
					// Use the temp variable to check if all values
					// are contained within the array.
					let temp = 0;

					// Iterate through all the array and check for the values.
					for(let i = 0; i < array.length; i++){
						// indexOf checks if there is an index of this value.
						// -1 means there is no value matched for this array.
						if(x.indexOf(array[i]) > -1){
							temp++;
						}
					}

					// Check if the number of matched values equals the
					// length of the array parameter.
					if( temp == array.length ){
						return true;
					}
				}

				function iterateO(array){
					// Use the temp variable to check if all values
					// are contained within the array.
					let temp = 0;

					// Iterate through all the array and check for the values.
					for(let i = 0; i < array.length; i++){
						// indexOf checks if there is an index of this value.
						// -1 means there is no value matched for this array.
						if(o.indexOf(array[i]) > -1){
							temp++;
						}
					}

					// Check if the number of matched values equals the
					// length of the array parameter.
					if( temp == array.length ){
						return true;
					}
				}

				var gameOver = document.getElementById('gameOver');

				// Check if any of the players won the game.
				if(iterateX([0,1,2]) || iterateX([0,3,6])
					|| iterateX([2,5,8]) || iterateX([6,7,8])
					|| iterateX([3,4,5]) || iterateX([1,4,7])
					|| iterateX([0,4,8]) || iterateX([2,4,6])){
					gameOver.innerHTML += 'X won!';
					console.log('X won!');
					turn = 2;

					createButton('Restart');
				}
				if(iterateO([0,1,2]) || iterateO([0,3,6])
					|| iterateO([2,5,8]) || iterateO([6,7,8])
					|| iterateO([3,4,5]) || iterateO([1,4,7])
					|| iterateO([0,4,8]) || iterateO([2,4,6])){
					gameOver.innerHTML += 'O won!';
					console.log('O won!');
					turn = 2;

					createButton('Restart');
				}
			}

			// Check if game is over.
			if(checked == containers.length){
				console.log('game over!');
				gameOver.innerHTML += 'Game Over!';
			}
		});

		containers[i].addEventListener('mouseenter', function(e){
			var checkImageFake = containers[i].getElementsByClassName('fake');
			var checkImageReal = containers[i].getElementsByClassName('real');

			if(checkImageReal[0] === undefined){
				over(e, i);
			}
			else{
				// console.log(checkImageReal[0].src);
			}
		});

		containers[i].addEventListener('mouseleave', function(e){
			var checkImageFake = containers[i].getElementsByClassName('fake');
			var checkImageReal = containers[i].getElementsByClassName('real');

			if(checkImageFake.length > 0){
				if(turn == 0){
					containers[i].removeChild(imgXfake);
				}else{
					containers[i].removeChild(imgOfake);
				}
			}
		});
	}
})();