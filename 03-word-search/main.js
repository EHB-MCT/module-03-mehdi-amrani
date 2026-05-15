let container = document.querySelector("#canvas-container");

let characters = [];
let cols = 60;
let rows = 40;
let cellW, cellH;

function setup() {
	let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
	canvas.parent(container);

	textFont("Share Tech Mono");
	textAlign(CENTER, CENTER);

	cellW = width / cols;
	cellH = height / rows;

	// 2. Initialize Data

	// Create a loop (rows * cols)
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let obj = {
				char: String.fromCharCode(floor(random(65, 91))),
				x: cellW * j + cellW / 2,
				y: cellH * i + cellH / 2,
				found: false,
			};
			characters.push(obj);
		}
	}
	console.log(characters.length);
	// For each item, create an Object: { char: randomChar, x: ..., y: ..., found: false }
	// Push object to 'characters' array

	// Listen for input changes, call updateSearch() when input changes
	document.querySelector("#search-input").addEventListener("input", updateSearch);
}

function draw() {
	background(255);

	// 3. Draw the Grid
	characters.forEach(function (item) {
		if (item.found === true) {
			fill("black");
			textStyle(BOLD);
		} else if (item.found === false) {
			fill("grey");
			textStyle(NORMAL);
		}
		text(item.char, item.x, item.y);
	});
	// Loop through characters array
	// Check if item.found is true -> Fill Black/Bold
	// Else -> Fill Grey/Normal
	// Draw text(item.char, item.x, item.y)
}

function updateSearch() {
	// 4. Implement sequential search

	// First: Reset all characters (set found = false)
	characters.forEach(function (item) {
		item.found = false;
	});

	// Get input value
	let inputVal = this.value.toUpperCase();

	// Split input value into array of characters
	let searchChars = inputVal.split("");
	let lastFoundIndex = -1;

	// Loop through searchChars
	searchChars.forEach(function (searchChar) {
		// Find the matching object index in 'characters' array
		// Condition: char matches AND index > lastFoundIndex
		let foundIndex = characters.findIndex(function (item, index) {
			return item.char === searchChar && index > lastFoundIndex;
		});

		// If found:
		// Set update found attribute and update lastFoundIndex
		if (foundIndex !== -1) {
			characters[foundIndex].found = true;
			lastFoundIndex = foundIndex;
		}
	});
}