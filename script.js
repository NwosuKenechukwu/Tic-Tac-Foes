"use strict";

// ------------------------- VARIABLES
const gameArea = document.querySelector(".game-area");
const playerSelect = document.querySelector(".player-select");
const p1 = document.querySelector(".player1");
const p2 = document.querySelector(".player2");
const board = document.querySelector(".board");
const grids = document.querySelectorAll(".grid");
const newGame = document.querySelector(".new-game");
const resetGame = document.querySelector(".reset-game");
let botBtn = document.querySelector(".bot-button");
const selectBtns = document.querySelectorAll(".select-button");
const resetOrNew = document.querySelector(".reset-or-new");

// ------------------------- MODULES AND FACTORIES
const gameBoard = (() => {
  let board = [["", "", "", "", "", "", "", "", ""]];

  return { board };
})();

const displayController = (() => {})();

const player = (name, char) => {
  return { name, char };
};

// ------------------------- FUNCTIONS
const clearBoard = function () {
  grids.forEach((grid) => {
    grid.innerHTML = "";
  });
};

const createBoard = function (player1, player2) {
  p1.textContent = player1;
  p2.textContent = player2;
  playerSelect.style.display = "none";
  resetOrNew.style.display = board.style.display = "flex";
};

const reloadGame = function () {
  clearBoard();
  playerSelect.style.display = "flex";
  resetOrNew.style.display = board.style.display = "none";
};

// -------------------------EVENT LISTENERS

grids.forEach((grid, i) => {
  grid.addEventListener("click", function (e) {
    console.log(i);
    grid.value = board[i] = "X";
    grid.innerHTML = board[i] = "X";
  });
});

resetGame.addEventListener("click", clearBoard);

newGame.addEventListener("click", reloadGame);

selectBtns.forEach((selectBtn) => {
  selectBtn.addEventListener("click", function (e) {
    if (e.target.classList.contains("player-vs-bot")) {
      createBoard("Player", "Tic-Tac-Foe");
      botBtn.style.visibility = "hidden";
    } else {
      createBoard("Player 1", "Player 2");
      botBtn.style.visibility = "visible";
    }
  });
});
