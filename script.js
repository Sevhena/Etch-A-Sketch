function createGrid(height, width) {
    
    for (let i = 0; i < height; i++) {

        const row = document.createElement('div');
        row.classList.toggle('row');

        for (let j = 0; j < width; j++) {
            const block = document.createElement('div');
            block.classList.toggle('block');
            row.appendChild(block);
        }

        grid.appendChild(row);
    }
}

const grid = document.querySelector("#grid");
createGrid(16, 16);

const blocks = document.querySelectorAll('.block');

blocks.forEach(block => {

    block.addEventListener('mouseover', (event) => {
        event.target.style.backgroundColor = 'green';
        console.log(event.target);
    });
});
