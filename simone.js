//const axios = require("axios");

var simoneButtons = {};

let startButton = document.querySelector("#play");
startButton.addEventListener("click", function (evt) {
	try {
		//initialize the game buttons
		simoneButtons.red = new SimoneButton(
			"#redSq",
			"red",
			"lightred",
			"sounds/red.wav"
		);
		simoneButtons.blue = new SimoneButton(
			"#blueSq",
			"blue",
			"lightblue",
			"sounds/blue.wav"
		);
		simoneButtons.green = new SimoneButton(
			"#greenSq",
			"green",
			"lightgreen",
			"sounds/green.wav"
		);
		simoneButtons.yellow = new SimoneButton(
			"#yellowSq",
			"yellow",
			"lightyellow",
			"sounds/yellow.wav"
		);

		//fetch the greeting sequence from the API
		let greeting = axios.get(
			"http://cs.pugetsound.edu/~dchiu/cs240/api/simone/",
			{ cmd: "start" }
		);

		//retrieve the number of rounds to play
		let rounds = document.querySelector("#rounds").value;

		//fetch a solution sequence from the API
		let solution = axios.get(
			"http://cs.pugetsound.edu/~dchiu/cs240/api/simone/",
			{ cmd: "getSolution", rounds: rounds }
		);

		playGame(greeting, solution, rounds);
	} catch (error) {
		//if something went wrong, print the error to the console
		console.log(error);
	}
});

class SimoneButton {
	constructor(htmlID, color, highlightColor, sound) {
		this.htmlElement = document.querySelector(htmlID);
		this.color = color;
		this.highlightColor = highlightColor;
		this.sound = sound;
	}

	playSound() {
		new Audio(this.sound).play();
	}
	glowButton() {
		this.htmlElement.className = this.highlightColor;
	}
	unglowButton() {
		this.htmlElement.className = this.color;
	}
}

//redButton.addEventListener("click", function (evt) {
//	console.log("red clicked");
//});

async function playGame(greeting, solution, totalRounds) {
	let displayElement = document.querySelector("#status");
	// display greeting sequence
	for (let i = 0; i < greeting.length; i++) {
		//highlight button
		highlightButton(greeting[i]);
		// 120 ms interval between each button
		setTimeout(() => {}, 120);
	}

	// 4 second delay
	setTimeout(() => {}, 4000);
	// start of the first round
	for (let seqLength = 1; seqLength <= totalRounds; seqLength++) {
		//display "sequence of seqLength"
		displayElement.innerHTML = `sequence of ${seqLength}`;

		for (let i = 1; i <= seqLength; i++) {
			//display button sequence
			for (let j = 0; j < i; j++) {
				//highlight button
				highlightButton(solution[j]);
				// 400 ms interval between each button
				setTimeout(() => {}, 400);
			}

			//let user duplicate the sequence
			// fill in...

			let incorrect = false;
			if (incorrect) {
				//play wrong.wav followed directly with lose.wav
				// change background to bright pink
				let background = document.querySelector("body");
				background.style.backgroundColor = "DeepSkyBlue";
				// display "Incorrect! You lose!"
				displayElement.innerHTML = `Incorrect! You lose!`;
				//return
				return "Lost";
			}

			if (i != seqLength) {
				//if button press is correct, display "So far so good! i more to go!"
				displayElement.innerHTML = `So far so good! ${
					seqLength - i
				} more to go!`;
			}
		}
		//if we have more rounds, prep for the next round
		if (seqLength != totalRounds) {
			//at end of round, play nextRound.wav
			//display "Good job! Prepare for next round."
			displayElement.innerHTML = `Good job! Prepare for next round.`;
			// 800 ms delay
			setTimeout(() => {}, 800);
			// display "Round seqLength of totalRounds"
			displayElement.innerHTML = `Round ${seqLength} of ${totalRounds}`;
			// 800 ms delay
			setTimeout(() => {}, 800);
		}
	}

	//If the player wins, play the appropriate sound bites
	//change the background to DeepSkyBlue
	let background = document.querySelector("body");
	background.style.backgroundColor = "DeepSkyBlue";
	//display "Yay you win!"
	displayElement.innerHTML = `Yay you win!`;
	return "Win";
}

function highlightButton(char) {
	if (char == "R") {
		let redButton = document.querySelector("#redSq");
		redButton.setAttribute("class", "lightred");
		redButton.setAttribute("class", "red");
	} else if (char == "B") {
		let blueButton = document.querySelector("#blueSq");
		blueButton.setAttribute("class", "lightblue");
		blueButton.setAttribute("class", "blue");
	} else if (char == "G") {
		let greenButton = document.querySelector("#greenSq");
		greenButton.setAttribute("class", "lightgreen");
		greenButton.setAttribute("class", "green");
	} else if (char == "Y") {
		let yellowButton = document.querySelector("#yellowSq");
		yellowButton.setAttribute("class", "lightyellow");
		yellowButton.setAttribute("class", "yellow");
	} else {
		console.log(`error! ${char} is not a vaild color.`);
	}
}
