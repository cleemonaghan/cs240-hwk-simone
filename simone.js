const { default: axios } = require("axios");

let startButton = document.querySelector("#play");
startButton.addEventListener("click", async function (evt) {
	console.log("play clicked");

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

function playGame(greeting, solution, rounds) {}
