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
const signX = document.querySelector(".sign-x");
const signO = document.querySelector(".sign-o");

// ------------------------- MODULES AND FACTORIES

let cells = [["", "", "", "", "", "", "", "", ""]];

const displayController = (() => {})();

const player = (name, char) => {
  return { name, char };
};

// ------------------------- FUNCTIONS
const clearBoard = function () {
  grids.forEach((grid, i) => {
    grid.innerHTML = "";
    cells[i] = "";
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

const swapSigns = function () {
  if (signX.textContent === "X") {
    signX.value = signX.textContent = "0";
    signO.value = signO.textContent = "X";
  } else {
    signX.value = signX.textContent = "X";
    signO.value = signO.textContent = "O";
  }
};

const changeName = function () {
  console.log(
    changeNameBtns[0].previousElementSibling.classList.contains("player1")
  );
};
changeName();

// -------------------------EVENT LISTENERS

grids.forEach((grid, i) => {
  grid.addEventListener("click", function (e) {
    grid.value = cells[i] = "X";
    grid.innerHTML = cells[i] = "X";
  });
});

resetGame.addEventListener("click", clearBoard);

swapBtn.addEventListener("click", swapSigns);

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

changeNameBtns.forEach((changeNameBtn) => {
  changeNameBtn.addEventListener("click", function () {
    if (changeNameBtn.previousElementSibling.classList.contains("player1")) {
    }
  });
});
