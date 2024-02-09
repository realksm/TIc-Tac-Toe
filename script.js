const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGame = document.querySelector(".btn");

let currPlayer;
let gameGrid;
let fillCount;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  fillCount = 0;
  newGame.classList.remove("active");
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  gameinfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currPlayer;
    boxes[index].style.pointerEvents = "none";
    gameGrid[index] = currPlayer;
    fillCount++;
    swapTurn();
    checkGameOver();
  }
}
function swapTurn() {
  if (currPlayer === "X") {
    currPlayer = "O";
  } else {
    currPlayer = "X";
  }
  gameinfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((pos) => {
    if (
      (gameGrid[pos[0]] !== "" ||
        gameGrid[pos[1]] !== "" ||
        gameGrid[pos[2]] !== "") &&
      gameGrid[pos[0]] === gameGrid[pos[1]] &&
      gameGrid[pos[1]] === gameGrid[pos[2]]
    ) {
      if (gameGrid[pos[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[pos[0]].classList.add("win");
      boxes[pos[1]].classList.add("win");
      boxes[pos[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    gameinfo.innerText = `Winner Player - ${answer}`;
    newGame.classList.add("active");
    return;
  }

  if (fillCount === 9) {
    gameinfo.innerText = "Game Tied!";
    newGame.classList.add("active");
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGame.addEventListener("click", initGame);
