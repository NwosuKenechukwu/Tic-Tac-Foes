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

const player = (name, sign, turn) => {
  return { name, sign, turn };
};

let curr, next;

// ------------------------- PLAYERS

const player1 = player("Player", "X", true);
const player2 = player("Player", "0", false);
const bot = player("Tic Tac Foe", "0", false);

// ------------------------- FUNCTIONS
const clearBoard = function () {
  grids.forEach((grid, i) => {
    showBtns();
    grid.innerHTML = "";
    cells[i] = "";
    if (curr.sign === "X") {
      curr.turn = true;
      next.turn = false;
    } else {
      curr.turn = false;
      next.turn = true;
    }
  });
};

const createBoard = function (player1, player2) {
  p1.textContent = player1;
  p2.textContent = player2;
  playerSelect.style.display = "none";
  resetOrNew.style.display = board.style.display = "flex";
};

const reloadGame = function () {
  showBtns();
  clearBoard();
  playerSelect.style.display = "flex";
  resetOrNew.style.display = board.style.display = "none";
};

const hideBtns = function () {
  changeNameBtns.forEach((changeNameBtn) => {
    changeNameBtn.style.visibility = "hidden";
  });
  swapBtn.style.visibility = "hidden";
};

const showBtns = function () {
  changeNameBtns.forEach((changeNameBtn) => {
    changeNameBtn.previousElementSibling.textContent === "Tic Tac Foe"
      ? (changeNameBtn.style.visibility = "hidden")
      : (changeNameBtn.style.visibility = "visible");
  });
  swapBtn.style.visibility = "visible";
};

// -------------------------EVENT LISTENERS

grids.forEach((grid, i) => {
  grid.addEventListener("click", function (e) {
    hideBtns();
    if (grid.textContent !== "") return;
    if (curr.turn === true) {
      curr.turn = false;
      next.turn = true;
      grid.value = cells[i] = curr.sign;
      grid.innerHTML = cells[i] = curr.sign;
    } else {
      next.turn = false;
      curr.turn = true;
      grid.value = cells[i] = next.sign;
      grid.innerHTML = cells[i] = next.sign;
    }

    changeNameBtns.forEach((changeNameBtn) => {
      if (changeNameBtn.textContent === "OK") {
        (changeNameBtn.previousElementSibling.classList.contains("player1")
          ? p1
          : p2
        ).textContent =
          document.querySelector(".input-field").value === ""
            ? "Player"
            : document.querySelector(".input-field").value;
        changeNameBtn.textContent = "Change Name";
      }
    });
  });
});

resetGame.addEventListener("click", clearBoard);

swapBtn.addEventListener("click", function () {
  if (p2.textContent !== "Tic Tac Toe") {
    if (signX.textContent === "X") {
      signO.value = signO.textContent = next.sign = "X";
      signX.value = signX.textContent = curr.sign = "0";
      next.turn = true;
      curr.turn = false;
    } else {
      signX.value = signX.textContent = curr.sign = "X";
      signO.value = signO.textContent = next.sign = "0";
      curr.turn = true;
      next.turn = false;
    }
  } else {
    if (signX.textContent === "X") {
      signO.value = signO.textContent = next.sign = "X";
      signX.value = signX.textContent = curr.sign = "0";
      next.turn = true;
      curr.turn = false;
    } else {
      signX.value = signX.textContent = curr.sign = "X";
      signO.value = signO.textContent = next.sign = "0";
      curr.turn = true;
      next.turn = false;
    }
  }
});

newGame.addEventListener("click", reloadGame);

selectBtns.forEach((selectBtn) => {
  selectBtn.addEventListener("click", function (e) {
    if (e.target.classList.contains("player-vs-bot")) {
      createBoard(player1.name, bot.name);
      curr = player1;
      next = bot;
      botBtn.style.visibility = "hidden";
    } else {
      createBoard(player1.name, player2.name);
      curr = player1;
      next = player2;
      botBtn.style.visibility = "visible";
    }
  });
});

changeNameBtns.forEach((changeNameBtn) => {
  changeNameBtn.addEventListener("click", function () {
    if (changeNameBtn.textContent === "OK") {
      (changeNameBtn.previousElementSibling.classList.contains("player1")
        ? p1
        : p2
      ).textContent =
        document.querySelector(".input-field").value === ""
          ? "Player"
          : document.querySelector(".input-field").value;
      changeNameBtn.textContent = "Change Name";
    } else if (
      changeNameBtn.previousElementSibling.classList.contains("player-name") &&
      changeNameBtn.textContent !== "OK"
    ) {
      changeNameBtn.previousElementSibling.classList.contains("player1")
        ? (p1.innerHTML = `<input type="text" class="input-field" />`)
        : (p2.innerHTML = `<input type="text" class="input-field" />`);
      document.querySelector(".input-field").focus();
      changeNameBtn.textContent = "OK";
    }
  });
});
