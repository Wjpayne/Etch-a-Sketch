const container = document.getElementById('container');
const resetButton = document.getElementById('reset');
const colorModeButton = document.getElementById('colorMode');

let randomColors = false; // toggle random color mode
let mouseDown = false;    // track if mouse is pressed

// Track mouse globally
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
    // Set initial data attribute for shading (0 = no dark)
    square.dataset.shade = 0;
    container.appendChild(square);
  }

  addDrawEffect();
}

// Draw effect with shading / random colors
function addDrawEffect() {
  const squares = document.querySelectorAll('.grid-square');

  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      if (mouseDown) drawSquare(square);
    });

    square.addEventListener('mousedown', () => drawSquare(square));
  });
}

// Apply color/shading to a square
function drawSquare(square) {
  if (randomColors) {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    square.style.backgroundColor = randomColor;
  } else {
    // Gradual shading
    let shade = parseInt(square.dataset.shade);
    if (shade < 10) shade += 1; // increase shade by 1
    square.dataset.shade = shade;

    const brightness = 100 - shade * 10; // decrease brightness
    square.style.backgroundColor = `hsl(0, 0%, ${brightness}%)`; // black shading
  }
}

// Reset button
resetButton.addEventListener('click', () => {
  let newSize = prompt("Enter new grid size (max 64):");
  newSize = parseInt(newSize);
  if (newSize && newSize > 0 && newSize <= 64) {
    createGrid(newSize);
  } else {
    alert("Invalid size! Please enter a number between 1 and 64.");
  }
});

// Toggle random color mode
colorModeButton.addEventListener('click', () => {
  randomColors = !randomColors;
  colorModeButton.textContent = `Random Colors: ${randomColors ? "On" : "Off"}`;
});

// Initialize default 16x16 grid
createGrid(16);