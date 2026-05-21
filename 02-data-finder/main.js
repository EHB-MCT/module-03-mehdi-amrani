let sizes = [];
const cols = 10;
const rows = 10;
const numCircles = cols * rows;
const minSize = 10;
const maxSize = 100;

// Stores index for find function
let foundIndex = -1;

function setup() {
    let container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('canvas-container');
    textAlign(CENTER, CENTER);

    resetData();

    // DOM Listeners
    document.getElementById('btn-find').addEventListener('click', findValue);
    document.getElementById('btn-sort-up').addEventListener('click', sortUp);
    document.getElementById('btn-sort-down').addEventListener('click', sortDown);
    document.getElementById('btn-reset').addEventListener('click', resetData);
}

function draw() {
    background(255); // White background

    const cellW = width / cols;
    const cellH = height / rows;

    noStroke();

    // Loop through the sizes
    for (let index = 0; index < sizes.length; index++) {
        const x = index % cols;
        const y = Math.floor(index / cols);
        const circleSize = min(sizes[index], cellW * 0.85, cellH * 0.85);

        // Check for found index: red or blue
        if (index === foundIndex) {
            fill("red");
        } else {
            fill(0, 150, 220);
        }

        circle(x * cellW + cellW / 2, y * cellH + cellH / 2, circleSize);
    }
}

function resetData() {
    // Generate whole numbers so findIndex can match the user's number exactly.
    sizes = [];
    for (let i = 0; i < numCircles; i++) {
        sizes.push(floor(random(minSize, maxSize + 1)));
    }

    foundIndex = -1;
    calculateStats();
}

function findValue() {
    const inputElement = document.getElementById('find-input');
    const rawValue = inputElement.value.trim();
    const inputValue = Number(rawValue);

    if (rawValue === "" || !Number.isFinite(inputValue)) {
        foundIndex = -1;
        alert("Enter a value to find.");
        inputElement.focus();
        return;
    }

    foundIndex = sizes.findIndex(function (size) {
        return size === inputValue;
    });

    if (foundIndex === -1) {
        alert("Value not found!");
    }
}

function sortUp() {
    // sort ascending
    sizes.sort(function (sizeA, sizeB) {
        return sizeA - sizeB;
    });
    foundIndex = -1;
    calculateStats();
}

function sortDown() {
    // sort descending
    sizes.sort(function (sizeA, sizeB) {
        return sizeB - sizeA;
    });
    foundIndex = -1;
    calculateStats();
}

function calculateStats() {
    // Use reduce to calculate total
    const total = sizes.reduce(function (sum, size) {
        return sum + size;
    }, 0);

    const average = total / sizes.length;

    document.querySelector("#total-mass").innerText = total;
    document.querySelector("#avg-size").innerText = average.toFixed(1);
}

function windowResized() {
    const container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, container.offsetHeight);
}
