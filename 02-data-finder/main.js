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

    fill(0,150,220);
    noStroke();
    // Loop through the sizes
    for (let i = 0; i < cols; i++){ 
        for (let j = 0; j < rows; j++) {
            let index = i*j;
            circle(i * cellW + cellW/2, j * cellH + cellH/2, sizes[index]);
            
            // fill(255);
            // text(sizes[index], x, y);
        }
    }
    // Drawing
    // Check for found index: red or blue


}

function resetData() {
    //generate sizes
    sizes = [];
    for (let i = 0; i < numCircles; i++) {
        sizes.push(random(10,100));
    }
    //TODO reset foundIndex
    foundIndex = -1;
    //TODO calculate stats

}

function findValue() {
    //get input value
    //search for value

    //if value not found, alert
    if (foundIndex == -1) {
        alert("Value not found!");
    }
}

function sortUp() {
    // sort ascending

}

function sortDown() {
    // sort descending

}

function calculateStats() {
    //use reduce to calculate total

    //calculate average

    //add both to DOM
}