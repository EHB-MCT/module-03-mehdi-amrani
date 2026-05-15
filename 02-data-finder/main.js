let sizes = [];
let cols = 10;
let rows = 10;
let numCircles = cols * rows;

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

    let cellW = width / cols;
    let cellH = height / rows;

    noStroke();

    // Loop through the sizes
    for (let i = 0; i < cols; i++){ 
        for (let j = 0; j < rows; j++) {
            let index = j * cols + i;

            // Check for found index: red or blue
            if (index == foundIndex) {
                fill("red");
            } else {
                fill(0, 150, 220);
            }

            circle(i * cellW + cellW/2, j * cellH + cellH/2, sizes[index]);
            
            // fill(255);
            // text(sizes[index], x, y);
        }
    }
}

function resetData() {
    //generate sizes
    sizes = [];
    for (let i = 0; i < numCircles; i++) {
        sizes.push(random(10, 100));
    }
    //TODO reset foundIndex
    foundIndex = -1;
    //TODO calculate stats
    calculateStats();
}

function findValue() {
    //get input value
    let inputValue = parseFloat(document.getElementById('find-input').value);

    //search for value
    foundIndex = sizes.findIndex(function(size) {
        return Math.round(size) == Math.round(inputValue);
    });

    //if value not found, alert
    if (foundIndex == -1) {
        alert("Value not found!");
    }
}

function sortUp() {
    // sort ascending
    sizes.sort(function(sizeA, sizeB){
        if (sizeA < sizeB) {
            return -1;
        } else {
            return 1;
        }
    });
}

function sortDown() {
    // sort descending
    sizes.sort(function(sizeA, sizeB){
        if (sizeA > sizeB) {
            return -1;
        } else {
            return 1;
        }
    });
}

function calculateStats() {
    //use reduce to calculate total
    let total = sizes.reduce(function(sum, size){
        return sum + size;
    }, 0);

    //calculate average
    let average = total / sizes.length;

    //add both to DOM
    document.querySelector("#total-mass").innerText = Math.round(total);
    document.querySelector("#avg-size").innerText = Math.round(average);
}