//const axios = require("axios");

let startButton = document.querySelector("#play");
startButton.addEventListener("click", async function (evt) {
	try {
		//fetch the greeting sequence from the API
		let greeting = await axios.get(
			"http://cs.pugetsound.edu/~dchiu/cs240/api/simone/",
			{ cmd: "start" }
		);

		//retrieve the number of rounds to play
		let rounds = document.querySelector("#rounds").value;

		//fetch a solution sequence from the API
		let solution = await axios.get(
			"http://cs.pugetsound.edu/~dchiu/cs240/api/simone/",
			{ cmd: "getSolution", rounds: rounds }
		);

		playGame(greeting, solution, rounds);
	} catch (error) {
		//if something went wrong, print the error to the console
		console.log(error);
	}
});

let redButton = document.querySelector("#redSq");
redButton.addEventListener("click", function (evt) {
	console.log("red clicked");
});
let blueButton = document.querySelector("#blueSq");
blueButton.addEventListener("click", function (evt) {
	console.log("blue clicked");
});
let greenButton = document.querySelector("#greenSq");
greenButton.addEventListener("click", function (evt) {
	console.log("green clicked");
});
let yellowButton = document.querySelector("#yellowSq");
yellowButton.addEventListener("click", function (evt) {
	console.log("yellow clicked");
});

async function playGame(greeting, solution, totalRounds) {
	let displayElement = document.querySelector("#status");
	// display greeting sequence
	for(let i = 0; i < greeting.length; i++) {
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
			// 400 ms interval between each button
			setTimeout(() => {}, 400);
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

highlightButton(char) {
}
