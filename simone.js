const { default: axios } = require("axios");

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

function playGame(greeting, solution, rounds) {
	// display greeting sequence
	// 120 ms interval between each button

	// 4 second delay
	// start of the first round
	for (let seqLenth = 0; seqLenth < rounds; seqLenth++) {
		for (let i = 0; i < seqLenth; i++) {
			//display sequence of seqLenth
			// 400 ms interval between each button
			if (incorrect) {
				//play wrong.wav followed directly with lose.wav
				// change background to bright pink
				// display "Incorrect! You lose!"
				//return
			}

			//if button press is correct, display "So far so good! x more to go!"
		}

		//at end of round, display "Good job! Prepare for next round."
		// 800 ms delay
		// display "Round x of seqLenth"
		// 800 ms delay.
	}

	//If the player wins, play the appropriate sound bites
	//change the background to DeepSkyBlue
	//display "Yay you win!"
}
