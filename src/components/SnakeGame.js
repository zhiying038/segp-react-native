// Snake Game 

const button = document.getElementById("play");
const score = document.getElementById("score");
const canvas = document.getElementById("draw-board");
const ctx = canvas.getContext("2d");

// GAME STATE
var state = {
  gameover: true,
  // Initial Direction right
  direction: 2,
  // Snake array
  snake: [
    { x: 10, y: 10, direction: 2 },
    { x: 10, y: 20, direction: 2 },
    { x: 10, y: 30, direction: 2 }
  ],
  food: { x: 0, y: 0 },
  score: 0
};


// DRAW SECTION
// Snake
function drawSnakePart(ctx,x,y,head=false) {
  // Set the fillstyle to green if it is head else white
  ctx.fillStyle = head ? "green":"white";
  // draw a rectangle at (x,y) coordinates with width and height of 10px
  ctx.fillRect(x,y,10,10);
}

// Food
function drawFood(ctx,x,y) {
  // Starting Path
  ctx.beginPath();
  ctx.fillStyle="red";
  // Circle
  ctx.arc(x+5,y+5,5,0,2*Math.PI);
 // Closing path
  ctx.stroke();
 // Filling area enclosed by the path
  ctx.fill();
}

// Draw Background
function drawBackground(){
  // Background colour
  ctx.fillStyle="black";
  // ** Draw a rectangle at (0,0) coordinates with width and height of 250px
  ctx.fillRect(0,0,250,250);
}

// Draw Whole Snake
function drawSnake() {
  // ** Draw the snake form tail so that head is drawn last. It makes the head appear above all other drawings.
  for (let i = state.snake.length - 1; i >= 0; --i) {
    drawSnakePart(ctx,state.snake[i].x, state.snake[i].y, i === 0);
  }
}



// Game Logic
function mod(m, val) {
  while (val < 0) {
    val += m;
  }
  return val % m;
}

// Adding Snake Part
function addPart() {
  // Retrieving the last part or tail of snake
  let tail = state.snake[state.snake.length - 1];

  // New Part details
  let direction = tail.direction;
  let x = tail.x;
  let y = tail.y;

  switch (direction) {
    // DOWN
    case 1:
      y = mod(250, y - 10);
      break;
    // UP
    case -1:
      y = mod(250, y + 10);
      break;
    // LEFT
    case -2:
      x = mod(250, x + 10);
      break;
    // RIGHT
    case 2:
      x = mod(250, x - 10);
      break;
  }
  //   Add new Part to the snake
  state.snake.push({ x, y, direction });
}

function eatFood() {
  // Head
  let x = state.snake[0].x;
  let y = state.snake[0].y;
  // Tail
  let fx = state.food.x;
  let fy = state.food.y;
  // Snake at the food -> if head n food at same position 
  if (x == fx && y == fy) {
    state.score++;
    score.innerHTML = "Score: " + state.score;
    addPart();
    generateFood();
  }
}


// Move Snake
function moveSnake() {
  // New head coordinates
  let x = state.snake[0].x;
  let y = state.snake[0].y;

  // Snake Direction
  switch (state.direction) {
    // DOWN - Move 1 box down
    case 1:
      y = mod(250, y + 10);
      break;
    // UP - Move 1 box up
    case -1:
      y = mod(250, y - 10);
      break;
    // LEFT - Move 1 box left
    case -2:
      x = mod(250, x - 10);
      break;
    // RIGHT - Move 1 box right
    case 2:
      x = mod(250, x + 10);
      break;
  }
  // Making a new copy of snake
  const newSnake = [{ x, y, direction:state.direction }];
  const snakeLength = state.snake.length;
  // ** Change the value of a part with the part ahead of it.
  for (let i = 1; i < snakeLength; ++i) {
    newSnake.push({ ...state.snake[i - 1] });
  }
  state.snake = newSnake;
}


// Check game over
function checkGameOver() {
  const head = state.snake[0];
  // If head collides with snake other parts
  // If those two collides then game over
  return state.snake.some(
    (part, i) => i !== 0 && head.x === part.x && head.y === part.y);
}

// Generating Food
function generateFood() {

// Random box between 0 - 25
  let x = Math.floor(Math.random() * 25) * 10;
  let y = Math.floor(Math.random() * 25) * 10;

  // Select food area that doesn't collide with the snake
  while (state.snake.some(part => part.x === x && part.y === y)) {
    x = Math.floor(Math.random() * 25) * 10;
    y = Math.floor(Math.random() * 25) * 10;
  }
// Next Food
  state.food = { x, y };
}



// To compare time in the function
var start = 0;

function draw(timestamp) {
  start++;

  if (timestamp - start > 1000/10 ) {
    
    if (checkGameOver()) {
      state.gameover = true;
      return;
    }
    moveSnake();
    drawBackground();
    drawFood(ctx, state.food.x, state.food.y);
    drawSnake();
    eatFood();

    start = timestamp;
  }

  if (!state.gameover) window.requestAnimationFrame(draw);
}

// EVENT  HANDLING
// Add event Listener on the document ?
document.addEventListener("keydown", event => {
  
  
  // Check if Arrow keys are pressed
  if (! /Arrow/gi.test(event.key))
    return;

  event.preventDefault();

  let direction = 0;
  // Check direction
  switch (event.key) {
    case "ArrowDown":
      direction = 1;
      break;
    case "ArrowUp":
      direction = -1;
      break;
    case "ArrowLeft":
      direction = -2;
      break;
    case "ArrowRight":
      direction = 2;
      break;
  }

  if (
    // If direction changed
    direction &&
    // If snake direction and current direction are same
    state.direction === state.snake[0].direction && state.direction !== -direction) 
    {
    state.direction = direction;
  }
});

// Event Handler
play.onclick = function() {
  //   If game is not running
  if (state.gameover) {
    state = {
      gameover: false,
      direction: 2,
      snake: [
        { x: 10, y: 10, direction: 2 },
        { x: 10, y: 20, direction: 2 },
        { x: 10, y: 30, direction: 2 }
      ],

      food: { x: 0, y: 0 },

      score: 0
    };
    score.innerHTML = "Score: " + 0;
    generateFood();
    window.requestAnimationFrame(draw);
  }
};




