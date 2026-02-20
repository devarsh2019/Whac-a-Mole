const blocks = document.querySelectorAll(".game-content");

//Class BoardState which two methods setMole and removeMole
class BoardState {
  constructor(id, hasMole) {
    this.id = id;
    this.hasMole = hasMole;
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

//Initialize board State by looping for 12 indexes
const boardState = [];
blocks.forEach((block, index) => {
  boardState.push(new BoardState(index, false));
});

//Set the score
let score = 0;
const scoreDisplay = document.getElementById("score-counter");

blocks.forEach((block, index) => {
  block.addEventListener("click", () => {
    if (boardState[index].hasMole) {
      boardState[index].removeMole();
      score++;
      scoreDisplay.textContent = score;
    }
  });
});

//Set the timer
let timeLeft = 30;
let timerInterval;
const timerDisplay = document.getElementById("Timer");

//Start the Game by clicking the button
let moleInterval;
const startBtn = document.getElementById("start-game");
startBtn.addEventListener("click", startGame);

function startGame() {
  console.log("Game Started");
  score = 0;
  scoreDisplay.textContent = score;
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
  if (moleInterval) {
    clearInterval(moleInterval);
  }
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  moleInterval = setInterval(() => {
    randomMole();
  }, 1000);

  timerInterval = setInterval(() => {
    updateTimer();
  }, 1000);
}

//Function for updating the timer and reflects the changes on the UI
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

//Function to alert when the Game is Over
function endGame() {
  clearInterval(moleInterval);
  clearInterval(timerInterval);
  alert("Time is Over !");
}

//Function to generate the random mole
function randomMole() {
  const activeMoles = boardState.filter((block) => block.hasMole).length;

  if (activeMoles >= 3) {
    return;
  }

  const emptyBlocks = boardState.filter((block) => !block.hasMole);

  if (emptyBlocks.length === 0) return;

  const randomBlock =
    emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];

  randomBlock.setMole();

  setTimeout(() => {
    randomBlock.removeMole();
  }, 3000);
}
