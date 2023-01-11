"use strict";

// ------------------------- VARIABLES
const gameArea = document.querySelector(".game-area");
const playerSelect = document.querySelector(".player-select");
const p1 = document.querySelector(".player1");
const p2 = document.querySelector(".player2");
const board = document.querySelector(".board");
const grids = document.querySelectorAll(".grid");
const newGame = document.querySelector(".new-game");
const swapBtn = document.querySelector(".swap-signs");
const resetGame = document.querySelector(".reset-game");
let botBtn = document.querySelector(".bot-button");
const selectBtns = document.querySelectorAll(".select-button");
const resetOrNew = document.querySelector(".reset-or-new");
const changeNameBtns = document.querySelectorAll(".change-name");
const difficulty = document.querySelector(".diff");
const difficultyText = document.querySelector(".diffText");
const signX = document.querySelector(".sign-x");
const signO = document.querySelector(".sign-o");
const outcome = document.querySelector(".outcome");
const outcomeText = document.querySelector(".outcome-text");

// ------------------------- MODULES AND FACTORIES

let cells = new Array(9);
let cellIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const displayController = (() => {})();

const player = (name, sign, turn) => {
  return { name, sign, turn };
};

let curr, next;

// ------------------------- PLAYERS

const player1 = player("Player 1", "X", true);
const player2 = player("Player 2", "0", false);
const bot = player("Tic Tac Foe", "0", false);

// ------------------------- FUNCTIONS
const clearBoard = function () {
  cells = new Array(9);
  cellIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  count = 0;
  winner = null;
  difficulty.value = "placeholder";
  difficultyText.style.display = "none";
  difficulty.style.display = "block";

  showBtns();

  grids.forEach((grid, i) => {
    grid.innerHTML = "";
  });
  curr.sign = "X";
  next.sign = "0";
  curr.turn = true;
  next.turn = false;

  if (curr === bot) {
    difficultyText.style.display = "block";
    difficultyText.textContent = `${
      difficulty.value.charAt(0).toUpperCase() + difficulty.value.slice(1)
    } Difficulty`;

    hideBtns();
    setTimeout(() => {
      if (difficulty.value === "easy" || difficulty.value === "placeholder") {
        difficulty.value = "easy";
        botMove();
      } else {
        bestBotMove(true);
      }
    }, 800);
  }
};

const createBoard = function (player1, player2) {
  p1.textContent = player1;
  p2.textContent = player2;
  playerSelect.style.display = "none";
  swapBtn.style.display = resetGame.style.display = "block";
  resetOrNew.style.display = board.style.display = "flex";
};

const reloadGame = function () {
  changeNameBtns.forEach((changeNameBtn) => {
    setName(changeNameBtn);
  });
  outcomeText.style.display = outcome.style.display = "none";
  showBtns();
  clearBoard();
  playerSelect.style.display = "flex";
  resetOrNew.style.display = board.style.display = "none";
};

const hideBtns = function () {
  changeNameBtns.forEach((changeNameBtn) => {
    changeNameBtn.style.visibility = "hidden";
  });
  difficulty.style.visibility = "hidden";
  swapBtn.style.visibility = "hidden";
};

const showBtns = function () {
  changeNameBtns.forEach((changeNameBtn) => {
    changeNameBtn.previousElementSibling.textContent === "Tic Tac Foe"
      ? (changeNameBtn.style.visibility = "hidden")
      : (changeNameBtn.style.visibility = "visible");
  });
  difficulty.style.visibility = "visible";
  swapBtn.style.visibility = "visible";
};

const swapPlayer = function () {
  if (next === bot || curr === bot) {
    if (curr === player1) {
      next = player1;
      curr = bot;
    } else {
      next = bot;
      curr = player1;
    }
  } else {
    if (curr === player1) {
      next = player1;
      curr = player2;
    } else {
      next = player2;
      curr = player1;
    }
  }
};

const swapSigns = function () {
  signO.classList.toggle("sign-o");
  signO.classList.toggle("sign-x");
  signX.classList.toggle("sign-o");
  signX.classList.toggle("sign-x");

  swapPlayer();

  if (signX.textContent === "X") {
    signO.value = signO.textContent = "X";
    signX.value = signX.textContent = "0";
    curr.sign = "X";
    next.sign = "0";
    next.turn = false;
    curr.turn = true;
  } else {
    signX.value = signX.textContent = "X";
    signO.value = signO.textContent = "0";
    curr.sign = "X";
    next.sign = "0";
    curr.turn = true;
    next.turn = false;
  }

  if (difficulty.value === "easy" || difficulty.value === "placeholder") {
    difficulty.value = "easy";
  }

  hideBtns();
  if (curr === bot) {
    difficulty.style.display = "none";
    difficultyText.style.display = "block";
    difficultyText.textContent = `${
      difficulty.value.charAt(0).toUpperCase() + difficulty.value.slice(1)
    } Difficulty`;

    setTimeout(() => {
      if (difficulty.value === "easy") {
        difficulty.value = "easy";
        botMove();
      } else {
        bestBotMove(true);
      }
    }, 800);
  }
};

const setName = function (btn) {
  if ((btn.textContent = "Change Name")) {
    if (p1.textContent === "") p1.textContent = "Player 1";
    if (p2.textContent === "") p2.textContent = "Player 2";
  }

  if (next === bot || curr === bot) {
    if (curr === player1) {
      curr.name = p1.textContent;
      next.name = p2.textContent;
    } else {
      next.name = p1.textContent;
      curr.name = p2.textContent;
    }
  } else {
    if (curr === player1) {
      curr.name = p1.textContent;
      next.name = p2.textContent;
    } else {
      next.name = p1.textContent;
      curr.name = p2.textContent;
    }
  }
};

const confirmName = function (btn) {
  (btn.previousElementSibling.classList.contains("player1")
    ? p1
    : p2
  ).textContent = document.querySelector(".input-field").value;

  setName(btn);
};

const changeName = function (btn) {
  if (btn.previousElementSibling.classList.contains("player1")) {
    p1.innerHTML = `<input type="text" class="input-field" />`;
    if (p2.nextElementSibling.textContent === "OK") {
      p2.textContent = "Player 2";
      p2.nextElementSibling.textContent = "Change Name";
    }
  } else {
    p2.innerHTML = `<input type="text" class="input-field" />`;
    if (p1.nextElementSibling.textContent === "OK") {
      p1.textContent = "Player 1";
      p1.nextElementSibling.textContent = "Change Name";
    }
  }
  document.querySelector(".input-field").focus();
  btn.textContent = "OK";
};

const checkIfEmpty = function (cell) {
  return cells[cell] === undefined;
};

const checkVertical = function () {
  for (let i = 0; i < 3; i++) {
    if (
      cells[i] !== undefined &&
      cells[i] === cells[i + 3] &&
      cells[i] === cells[i + 6]
    ) {
      winner = cells[i];
    }
  }
};

const checkHorizontal = function () {
  for (let i = 0; i < 7; i += 3) {
    if (
      cells[i] !== undefined &&
      cells[i] === cells[i + 1] &&
      cells[i] === cells[i + 2]
    ) {
      winner = cells[i];
    }
  }
};

const checkDiagonal = function () {
  for (let i = 0; i < 3; i += 2) {
    if (
      cells[i] !== undefined &&
      cells[i] === cells[i + 4] &&
      cells[i] === cells[i + 8] &&
      i === 0
    ) {
      winner = cells[i];
    }

    if (
      cells[i] !== undefined &&
      cells[i] === cells[i + 2] &&
      cells[i] === cells[i + 4] &&
      i === 2
    ) {
      winner = cells[i];
    }
  }
};

const checkWinner = function () {
  winner = null;
  checkHorizontal();
  checkVertical();
  checkDiagonal();
  checkDraw();
  if (typeof winner !== "string") {
    return null;
  } else {
    return winner;
  }
};

const checkDraw = function () {
  if (
    cells.filter((cell) => cell !== undefined).length === 9 &&
    count === 0 &&
    winner === null
  ) {
    winner = "Draw";
  }
};

let count = 0;
let winner = null;
const endGame = function (sign) {
  if (count > 0) return;
  winner = sign;

  count++;

  board.style.display =
    swapBtn.style.display =
    resetGame.style.display =
      "none";

  outcome.style.display = "flex";
  outcomeText.style.display = "block";

  if (curr.sign === sign) {
    outcomeText.textContent = `${curr.name} Wins! 🏆`;
  } else if (next.sign === sign) {
    outcomeText.textContent = `${next.name} Wins! 🏆`;
  } else {
    outcomeText.textContent = `It's a Draw! ⚔`;
  }
};

const botMove = function () {
  let randomCell = cellIndex[Math.floor(Math.random() * cellIndex.length)];
  if (next === bot && next.turn === true) {
    if (checkIfEmpty(randomCell)) {
      next.turn = false;
      curr.turn = true;
      grids[randomCell].value =
        grids[randomCell].innerHTML =
        cells[randomCell] =
          next.sign;
      cellIndex.splice(cellIndex.indexOf(randomCell), 1);
    }
  } else if (curr === bot && curr.turn === true) {
    if (checkIfEmpty(randomCell)) {
      curr.turn = false;
      next.turn = true;
      grids[randomCell].value =
        grids[randomCell].innerHTML =
        cells[randomCell] =
          curr.sign;
      cellIndex.splice(cellIndex.indexOf(randomCell), 1);
    }
  }
};

let scoresTable = {
  X: 10,
  0: -10,
  Draw: 0,
};

const minimax = function (board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) return scoresTable[result] + depth;

  if (next === bot) {
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === undefined) {
          board[i] = player1.sign;
          let score = minimax(board, depth + 1, false);
          board[i] = undefined;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === undefined) {
          board[i] = bot.sign;
          let score = minimax(board, depth + 1, true);
          board[i] = undefined;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  } else {
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === undefined) {
          board[i] = bot.sign;
          let score = minimax(board, depth + 1, false);
          board[i] = undefined;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === undefined) {
          board[i] = player1.sign;
          let score = minimax(board, depth + 1, true);
          board[i] = undefined;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
};

const bestBotMove = function (starting) {
  let bestScore = starting ? -Infinity : Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (cells[i] === undefined) {
      cells[i] = bot.sign;
      let score = starting ? minimax(cells, 0, false) : minimax(cells, 0, true);
      cells[i] = undefined;
      if (starting) {
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
  }

  bot.turn = false;
  player1.turn = true;
  grids[move].value = grids[move].innerHTML = cells[move] = bot.sign;

  setTimeout(function () {
    checkWinner();
    if (winner !== null) endGame(winner);
  }, 610);

  cellIndex.splice(cellIndex.indexOf(move), 1);
};

// -------------------------EVENT LISTENERS

grids.forEach((grid, i) => {
  grid.addEventListener("click", function (e) {
    hideBtns();

    if (difficulty.value === "easy" || difficulty.value === "placeholder") {
      difficulty.value = "easy";
    }
    difficulty.style.display = "none";
    difficultyText.style.display = "block";
    difficultyText.textContent = `${
      difficulty.value.charAt(0).toUpperCase() + difficulty.value.slice(1)
    } Difficulty`;

    if (grid.textContent !== "") return;
    if (next === player2 || curr === player2) {
      if (curr.turn === true) {
        curr.turn = false;
        next.turn = true;
        grid.value = grid.innerHTML = cells[i] = curr.sign;
      } else {
        next.turn = false;
        curr.turn = true;
        grid.value = grid.innerHTML = cells[i] = next.sign;
      }
    }

    if (next === bot || curr === bot) {
      if (player1.turn === true) {
        bot.turn = true;
        player1.turn = false;
        grid.value = grid.innerHTML = cells[i] = player1.sign;
        cellIndex.splice(cellIndex.indexOf(i), 1);
        if (cells.filter((cell) => cell !== undefined).length !== 9) {
          setTimeout(function () {
            if (
              difficulty.value === "easy" ||
              difficulty.value === "placeholder"
            ) {
              difficulty.value = "easy";
              botMove();
            } else {
              bestBotMove(false);
            }
          }, 600);
        }
      }
    }

    setTimeout(function () {
      checkWinner();
      if (winner !== null) endGame(winner);
    }, 610);

    changeNameBtns.forEach((changeNameBtn) => {
      if (changeNameBtn.textContent === "OK") confirmName(changeNameBtn);
    });
  });
});

resetGame.addEventListener("click", clearBoard);

swapBtn.addEventListener("click", function () {
  swapSigns();
});

newGame.addEventListener("click", reloadGame);

selectBtns.forEach((selectBtn) => {
  selectBtn.addEventListener("click", function (e) {
    if (e.target.classList.contains("player-vs-bot")) {
      player1.name = "Player 1";
      createBoard(player1.name, bot.name);
      curr = player1;
      next = bot;
      clearBoard();
      signX.textContent = curr.sign;
      signO.textContent = next.sign;
      botBtn.style.display = "none";
      difficulty.style.display = "block";
    } else {
      player1.name = "Player 1";
      player2.name = "Player 2";
      createBoard(player1.name, player2.name);
      curr = player1;
      next = player2;
      clearBoard();
      signX.textContent = curr.sign;
      signO.textContent = next.sign;
      botBtn.style.display = "block";
      difficulty.style.display = "none";
      difficultyText.style.display = "none";
    }
    showBtns();
  });
});

changeNameBtns.forEach((changeNameBtn, i) => {
  changeNameBtn.addEventListener("click", function () {
    if (changeNameBtn.textContent === "OK") {
      confirmName(changeNameBtn);
    } else if (
      changeNameBtn.previousElementSibling.classList.contains("player-name") &&
      changeNameBtn.textContent !== "OK"
    ) {
      changeName(changeNameBtn);
    }
  });
});
