const API_PATH = "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/";
const GREETING_DELAY = 120;
const BUTTON_DELAY = 400;
const TRANSITION_DELAY = 800;

var user = new Array();

let startButton = document.querySelector("#play");
startButton.addEventListener("click", async function (evt) {
	try {
		//reset the screen
		let displayElement = document.querySelector("#status");
		displayElement.innerHTML = "";
		let background = document.querySelector("body");
		background.style.backgroundColor = "black";

		//initialize the game buttons
		let buttons = {};
		buttons.red = new SimoneButton(
			"#redSq",
			"red",
			"lightred",
			"sounds/red.wav",
			"R"
		);
		buttons.blue = new SimoneButton(
			"#blueSq",
			"blue",
			"lightblue",
			"sounds/blue.wav",
			"B"
		);
		buttons.green = new SimoneButton(
			"#greenSq",
			"green",
			"lightgreen",
			"sounds/green.wav",
			"G"
		);
		buttons.yellow = new SimoneButton(
			"#yellowSq",
			"yellow",
			"lightyellow",
			"sounds/yellow.wav",
			"Y"
		);

		//retrieve the number of rounds to play
		let totalRounds = document.querySelector("#rounds").value;
		//if rounds is undefined, play 10 rounds
		if (totalRounds == "") {
			totalRounds = 10;
		}

		//intitalize the greeting and solution sequences
		let greeting = await getGreetingSeq();
		let solution = await getSolutionSeq(totalRounds);

		playGame(buttons, greeting, solution, solution.length);
	} catch (error) {
		//if something went wrong, print the error to the console
		console.log(error);
	}
});

class SimoneButton {
	constructor(htmlID, color, highlightColor, sound, char) {
		//initialize the fields of the button
		this.htmlElement = document.querySelector(htmlID);
		this.color = color;
		this.highlightColor = highlightColor;
		this.sound = sound;
		this.char = char;

		//add the event listeners
		this.htmlElement.addEventListener("mousedown", function (evt) {
			user.push(char);
			this.className = highlightColor;
			new Audio(sound).play();
		});
		this.htmlElement.addEventListener("mouseup", function (evt) {
			this.className = color;
		});
		this.htmlElement.addEventListener("mouseout", function (evt) {
			this.className = color;
		});
		this.htmlElement.addEventListener("mouseover", function (evt) {
			this.classList.add("hover");
		});
	}

	playSound() {
		new Audio(this.sound).play();
	}
	glowButton() {
		this.htmlElement.className = this.highlightColor;
		this.playSound();
	}
	unglowButton() {
		this.htmlElement.className = this.color;
	}
}

async function getGreetingSeq() {
	try {
		// this is key -- wait here until axios request resolves!
		let result = await axios.get(`${API_PATH}?cmd=start`);
		return result.data.sequence;
	} catch (result) {
		// code to run if unsuccessful
		console.log(result);
	}
}

async function getSolutionSeq(totalRounds) {
	try {
		// this is key -- wait here until axios request resolves!
		let result = await axios.get(
			`${API_PATH}?cmd=getSolution&rounds=${totalRounds}`
		);
		return result.data.key;
	} catch (result) {
		// code to run if unsuccessful
		console.log(result);
	}
}

async function displaySequence(buttons, sequence, length, delay) {
	let i = 0;
	let interval = setInterval(() => {
		if (i == length) {
			clearInterval(interval);
		} else {
			highlightButton(buttons, sequence[i], delay);
			i++;
		}
	}, delay);
}

async function playGame(buttons, greeting, solution, totalRounds) {
	let displayElement = document.querySelector("#status");
	// display greeting sequence
	// 120 ms interval between each button
	await displaySequence(buttons, greeting, greeting.length, GREETING_DELAY);

	await new Promise((r) => {
		setTimeout(r, 4 * TRANSITION_DELAY);
	});

	// 4 second delay between greeting and game
	for (let seqLength = 1; seqLength <= totalRounds; seqLength++) {
		//display "sequence of seqLength"
		await new Promise((r) => {
			setTimeout(r, TRANSITION_DELAY);
		});

		//display button sequence
		// 400 ms interval between each button
		await displaySequence(buttons, solution, seqLength, BUTTON_DELAY);

		//reset user for this turn
		user = new Array();

		for (let i = 0; i < seqLength; i++) {
			//let user duplicate the sequence
			while (user.length < i + 1) {
				//if the user has not entered anything yet, wait
				await new Promise((r) => {
					setTimeout(r, 50);
				});
			}

			//check if they entered the correct button
			if (user[i] == solution[i]) {
				if (i != seqLength - 1) {
					//if button press is correct, display "So far so good! i more to go!"
					displayElement.innerHTML = `So far so good! ${
						seqLength - i - 1
					} more to go!`;
				}
			}
			//if they were wrong, display the game over screen
			else {
				// change background to bright pink
				let background = document.querySelector("body");
				background.style.backgroundColor = "hotpink";
				// display "Incorrect! You lose!"
				displayElement.innerHTML = `Incorrect! You lose!`;
				//play wrong.wav followed directly with lose.wav
				new Audio("sounds/wrong.wav").play();
				new Audio("sounds/lose.wav").play();
				//return
				return "Lost";
			}
		}
		//if we have more rounds, prep for the next round
		if (seqLength != totalRounds) {
			//at end of round, play nextRound.wav
			new Audio("sounds/nextRound.wav").play();
			//display "Good job! Prepare for next round."
			displayElement.innerHTML = `Good job! Prepare for next round.`;
			await new Promise((r) => {
				setTimeout(r, TRANSITION_DELAY);
			});
			// 800 ms delay
			// display "Round seqLength of totalRounds"
			displayElement.innerHTML = `Round ${seqLength + 1} of ${totalRounds}`;
		} else {
			//If the player wins, play the appropriate sound bites
			new Audio("sounds/win.mp3").play();
			//display "Yay you win!"
			displayElement.innerHTML = `Yay you win!`;
			//change the background to DeepSkyBlue
			let background = document.querySelector("body");
			background.style.backgroundColor = "DeepSkyBlue";
			return "Win";
		}
	}
}

function highlightButton(buttons, char, delay) {
	switch (char) {
		case "R":
			setTimeout(() => {
				buttons.red.glowButton();
				setTimeout(() => {
					buttons.red.unglowButton();
				}, delay);
			}, delay);

			break;
		case "B":
			setTimeout(() => {
				buttons.blue.glowButton();
				setTimeout(() => {
					buttons.blue.unglowButton();
				}, delay);
			}, delay);

			break;
		case "G":
			setTimeout(() => {
				buttons.green.glowButton();
				setTimeout(() => {
					buttons.green.unglowButton();
				}, delay);
			}, delay);

			break;
		case "Y":
			setTimeout(() => {
				buttons.yellow.glowButton();
				setTimeout(() => {
					buttons.yellow.unglowButton();
				}, delay);
			}, delay);
			break;
		default:
			console.log(`error! ${char} is not a vaild color.`);
	}
}
