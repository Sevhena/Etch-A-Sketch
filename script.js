function createGrid(size) {
    
    for (let i = 0; i < size; i++) {

        const row = document.createElement('div');
        row.classList.toggle('row');
        row.setAttribute('data-row', "" + i);
        colourDict.push([]);

        for (let j = 0; j < size; j++) {
            const block = document.createElement('div');
            block.classList.toggle('block');
            row.setAttribute('data-column', "" + j);
            row.appendChild(block);
            colourDict[i].push("rgb(255,255,255)");
        }

        grid.appendChild(row);
    }

    blocks = document.querySelectorAll('.block');

    blocks.forEach(block => {

        block.addEventListener('mouseover', (event) => colourBlock(event.target));
    });
}

function getColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
}

function getUsableRGB(colour) {
    let rgbValues = colour.slice(4);
    rgbValues = rgbValues.slice(0, rgbValues.length-1);
    rgbValues = rgbValues.split(",");

    rgbValues = rgbValues.map(value => {
        return Math.floor(parseInt(value.trim()));
    });

    return rgbValues;
}

function darkenBlock(colour, darkeningRatio) {
    const prevColour = getUsableRGB(colour);
    const r = prevColour[0] - darkeningRatio[0] >= 0 ? prevColour[0] - darkeningRatio[0] : 0;
    const g = prevColour[1] - darkeningRatio[1] >= 0 ? prevColour[1] - darkeningRatio[1] : 0;
    const b = prevColour[2] - darkeningRatio[2] >= 0 ? prevColour[2] - darkeningRatio[2] : 0;

    console.log(`rgb(${r},${g},${b})`)

    return `rgb(${r},${g},${b})`;
}

function colourBlock(block) {

    const row = parseInt(block.parentElement.getAttribute('data-row'));
    const column = parseInt(block.getAttribute('data-column'));

    if (block.classList.contains("coloured")) {
        block.style.backgroundColor = darkenBlock(block.style.backgroundColor, colourDict[row][column]);
    }
    else {
        block.classList.add('coloured');
        block.style.backgroundColor = getColour();
        colourDict[row][column] = getUsableRGB(block.style.backgroundColor).map(value => {
            return value * 0.1;
        });
    }
}

function reset() {
    blocks.forEach((block) => block.style.backgroundColor = 'white');
    colourDict = [];
}

const grid = document.querySelector("#grid");
const dimensionsBtn = document.querySelector('#dimensions');
const resetBtn = document.querySelector('#reset');

let blocks;
let colourDict = [];
createGrid(16); //Default grid size

resetBtn.addEventListener('click', reset);

dimensionsBtn.addEventListener('click', (event) => {
    const size = parseInt(prompt("Enter a number for the new n x n dimensions of the grid:"));
    
    if (size > 100) {
        alert("Dimension inputted is too large. Please enter a number from 1 to 100.");
        return;
    }

    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    createGrid(size);
})

// window.addEventListener("beforeunload", (event) => {
//     event.returnValue = "Are you sure you want to leave the page? All progress will be lost.";
// });