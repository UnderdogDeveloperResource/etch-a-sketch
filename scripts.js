const GRID_SIZE = 500;
const BORDER_SIZE = 2;
const DEFAULT_GRID_DIMENSION = 16;
let currentSize = DEFAULT_GRID_DIMENSION;
let isColor = false;
let isErase = false;

window.addEventListener('load', initialize)

function initialize() {   
    // setup grid
    const grid = document.querySelector('#grid');
    grid.style.width = GRID_SIZE;
    grid.style.height = GRID_SIZE;
    grid.style.borderWidth = BORDER_SIZE;
    grid.style.borderColor = 'black';
    grid.style.borderStyle = 'solid'    

    // Initialize event listeners
    const btnPrompt = document.querySelector('#btnPrompt');
    btnPrompt.addEventListener('click', getGridSize);

    const btnClear = document.querySelector('#btnClear');
    btnClear.addEventListener('click', ClearGrid);
    
    const chkShowGridlines = document.querySelector('#showGridlines');
    chkShowGridlines.addEventListener('change', toggleGridLines);

    const chkCoolorMode = document.querySelector('#colorMode');
    chkCoolorMode.addEventListener('change', toggleColorMode);

    const chkEraseMode = document.querySelector('#eraseMode');
    chkEraseMode.addEventListener('change', toggleEraseMode);

    // Create default grid
    CreateGrid(DEFAULT_GRID_DIMENSION);
}

function CreateGrid(squareSize) {
    const grid = document.querySelector('#grid');

    // Create a size x size grid
    for(let i = 0; i < squareSize; ++i) {
        for(let j = 0; j < squareSize; ++j) {
            const gridSquare = document.createElement('div');
            const chkShowGridlines = document.querySelector('#showGridlines');
            
            gridSquare.classList.add('grid-square');
            gridSquare.style.width = (GRID_SIZE - (BORDER_SIZE * 2)) / squareSize;
            gridSquare.style.height = (GRID_SIZE - (BORDER_SIZE * 2)) / squareSize;
            gridSquare.style.borderStyle = 'solid';
            gridSquare.style.borderColor = 'gray';
            gridSquare.style.borderWidth = chkShowGridlines.checked
                ? 1
                : 0;

            gridSquare.addEventListener('mouseover', (e) => {
                var element = e.target;
                if(isErase) {
                    element.style.backgroundColor = 'transparent';
                }
                else {
                    element.style.backgroundColor = isColor
                        ? getRandomColor()
                        : 'black';
                }
            })

            grid.appendChild(gridSquare);
        }
    }
}

function ClearGrid() {
    // Erase mode should be toggled off when clearing a grid
    const chkEraseMode = document.querySelector('#eraseMode');
    chkEraseMode.checked = false;    
    chkEraseMode.dispatchEvent(new Event('change'));

    // Remove grid items
    const grid = document.querySelector('#grid');
    if(grid.children.length > 0) {        
        while(grid.lastElementChild) {
            grid.removeChild(grid.lastElementChild);
        }
    }

    // Generate new grid
    CreateGrid(currentSize);
}

function getGridSize() {
    currentSize = prompt("How many grid squares per side do you want? (1 - 100)");
    if(currentSize > 100) currentSize = 100;
    else if (!currentSize || currentSize <= 0) {
        currentSize = DEFAULT_GRID_DIMENSION;
        return;
    }

    ClearGrid();
}

function toggleGridLines() {
    const showGridLines = document.querySelector('#showGridlines').checked;    
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.borderWidth = showGridLines
            ? 1 
            : 0;
    });
}

function toggleColorMode() {
    isColor = document.querySelector('#colorMode').checked;
}

function toggleEraseMode() {
    isErase = document.querySelector('#eraseMode').checked;
}

function getRandomColor() {
    const h = getRandomNumber(360);
    const s = getRandomNumber(100);
    const l = getRandomNumber(100);

    return `hsl(${h}deg, ${s}%, ${l}%)`;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}