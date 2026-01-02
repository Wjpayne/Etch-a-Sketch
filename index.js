const container = document.getElementById('container');
const resetButton = document.getElementById('reset');
const colorModeButton = document.getElementById('colorMode');

let randomColors = false; // toggle for color mode

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

  addHoverEffect(); // apply hover after creating grid
}

// Add hover drawing effect
function addHoverEffect() {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      if (randomColors) {
        const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        square.style.backgroundColor = randomColor;
      } else {
        square.style.backgroundColor = 'black';
      }
    });
  });
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
