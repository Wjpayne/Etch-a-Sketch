const container = document.getElementById('container');
const resetButton = document.getElementById('reset');
const colorModeButton = document.getElementById('colorMode');

let randomColors = false; // toggle for color mode
let mouseDown = false;    // track if mouse button is pressed

// Track mouse state globally
document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

// Create the grid dynamically
function createGrid(size) {
  container.innerHTML = ''; // clear old grid
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    container.appendChild(square);
  }

  addDrawEffect(); // apply draw effect after creating grid
}

// Draw on squares while mouse is pressed
function addDrawEffect() {
  const squares = document.querySelectorAll('.grid-square');

  squares.forEach(square => {
    // Draw on hover if mouse is down
    square.addEventListener('mouseover', () => {
      if (mouseDown) {
        drawSquare(square);
      }
    });

    // Draw on single click
    square.addEventListener('mousedown', () => drawSquare(square));
  });
}

// Function to apply color to a square
function drawSquare(square) {
  if (randomColors) {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    square.style.backgroundColor = randomColor;
  } else {
    square.style.backgroundColor = 'black';
  }
}

// Reset button functionality
resetButton.addEventListener('click', () => {
  let newSize = prompt("Enter new grid size (max 64):");
  newSize = parseInt(newSize);
  if (newSize && newSize > 0 && newSize <= 64) {
    createGrid(newSize);
  } else {
    alert("Invalid size! Please enter a number between 1 and 64.");
  }
});

// Toggle random colors mode
colorModeButton.addEventListener('click', () => {
  randomColors = !randomColors;
  colorModeButton.textContent = `Random Colors: ${randomColors ? "On" : "Off"}`;
});

// Initialize default 16x16 grid
createGrid(16);
