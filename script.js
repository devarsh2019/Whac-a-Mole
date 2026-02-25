// DOM REFERENCES
const gameContainer = document.querySelector(".game");
const startBtn = document.getElementById("start-game");
const pauseBtn = document.getElementById("pause-game");
const scoreDisplay = document.getElementById("score-counter");
const timerDisplay = document.getElementById("Timer");

// GAME CONFIG
const TOTAL_BLOCKS = 12;
const GAME_DURATION = 30;
const MOLE_INTERVAL = 1000;
const MOLE_LIFETIME = 3000;
const MAX_ACTIVE_MOLES = 3;

// GAME STATE
let boardState = [];
let blocks = [];
let score = 0;
let timeLeft = GAME_DURATION;
let moleInterval = null;
let timerInterval = null;
let isPaused = false;
let isGameRunning = false;

// BOARD STATE CLASS
class BoardState {
  constructor(id) {
    this.id = id;
    this.hasMole = false;
  }

  setMole() {
    if (!this.hasMole) {
      this.hasMole = true;
      blocks[this.id].classList.add("mole");
    }
  }

  removeMole() {
    if (this.hasMole) {
      this.hasMole = false;
      blocks[this.id].classList.remove("mole");
    }
  }
}

// INITIALIZE BOARD
function createBoard() {
  for (let i = 0; i < TOTAL_BLOCKS; i++) {
    const block = document.createElement("div");
    block.classList.add("game-content");
    gameContainer.appendChild(block);
  }

  blocks = document.querySelectorAll(".game-content");

  blocks.forEach((block, index) => {
    boardState.push(new BoardState(index));

    block.addEventListener("click", () => handleBlockClick(index));
  });
}

// EVENTLISTENER
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);

// Initialize board on load
createBoard();

// HANDLE BLOCK CLICK
function handleBlockClick(index) {
  if (boardState[index].hasMole) {
    boardState[index].removeMole();
    score++;
    scoreDisplay.textContent = score;
  }
}

// START GAME
function startGame() {
  if (isGameRunning) return;
  resetGameState();

  moleInterval = setInterval(randomMole, MOLE_INTERVAL);
  timerInterval = setInterval(updateTimer, 1000);

  isGameRunning = true;
  isPaused = false;
  pauseBtn.textContent = "Pause";
}

// RESET GAME STATE
function resetGameState() {
  score = 0;
  timeLeft = GAME_DURATION;

  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  clearInterval(moleInterval);
  clearInterval(timerInterval);

  boardState.forEach((block) => block.removeMole());
}

// UPDATE TIMER
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

// END GAME
function endGame() {
  clearInterval(moleInterval);
  clearInterval(timerInterval);

  isGameRunning = false;
  isPaused = false;
  pauseBtn.textContent = "Pause";

  alert("Time is Over !");
}

// RANDOM MOLE
function randomMole() {
  const activeMoles = boardState.filter((b) => b.hasMole).length;
  if (activeMoles >= MAX_ACTIVE_MOLES) return;

  const emptyBlocks = boardState.filter((b) => !b.hasMole);
  if (emptyBlocks.length === 0) return;

  const randomBlock =
    emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];

  randomBlock.setMole();

  setTimeout(() => {
    randomBlock.removeMole();
  }, MOLE_LIFETIME);
}

// PAUSE AND RESUME
function togglePause() {
  if (!isGameRunning) return;

  if (!isPaused) {
    clearInterval(moleInterval);
    clearInterval(timerInterval);
    isPaused = true;
    pauseBtn.textContent = "Resume";
  } else {
    moleInterval = setInterval(randomMole, MOLE_INTERVAL);
    timerInterval = setInterval(updateTimer, 1000);
    isPaused = false;
    pauseBtn.textContent = "Pause";
  }
}
