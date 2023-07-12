function createGrid(size) {
    
    for (let i = 0; i < size; i++) {

        const row = document.createElement('div');
        row.classList.toggle('row');

        for (let j = 0; j < size; j++) {
            const block = document.createElement('div');
            block.classList.toggle('block');
            row.appendChild(block);
        }

        grid.appendChild(row);
    }

    blocks = document.querySelectorAll('.block');

    blocks.forEach(block => {

        block.addEventListener('mouseover', (event) => colour(event.target));
    });
}

function colour(block) {
    block.style.backgroundColor = 'green';
}

function reset() {
    blocks.forEach((block) => block.style.backgroundColor = 'white');
}

const grid = document.querySelector("#grid");
const dimensionsBtn = document.querySelector('#dimensions');
const resetBtn = document.querySelector('#reset');

let blocks;
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