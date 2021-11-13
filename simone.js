let startButton = document.querySelector("#play");
startButton.addEventListener("click", function (evt) {
	console.log("play clicked");

	try {
		//fetch the greeting sequence from the API
		//retrieve the number of rounds to play
		//fetch a solution sequence from the API
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
