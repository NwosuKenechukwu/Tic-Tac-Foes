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

let cells = new Array(9);

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
  count = 0;

  grids.forEach((grid, i) => {
    showBtns();
    grid.innerHTML = "";
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
  changeNameBtns.forEach((changeNameBtn) => {
    setName(changeNameBtn);
  });
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
};

const setName = function (btn) {
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

  if (btn) btn.textContent = "Change Name";
  if (p1.textContent === "") p1.textContent = "Player 1";
  if (p2.textContent === "") p2.textContent = "Player 2";
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

const checkVertical = function () {
  for (let i = 0; i < 3; i++) {
    if (
      cells[i] !== undefined &&
      cells[i] === cells[i + 3] &&
      cells[i] === cells[i + 6]
    ) {
      endGame(cells[i]);
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
      endGame(cells[i]);
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
      endGame(cells[i]);
    }

    if (
      cells[i] !== undefined &&
      cells[i] === cells[i + 2] &&
      cells[i] === cells[i + 4] &&
      i === 2
    ) {
      endGame(cells[i]);
    }
  }
};

let count = 0;
const endGame = function (sign) {
  if (count > 0) return;
  curr.sign === sign
    ? console.log(`${curr.name} Wins!`)
    : console.log(`${next.name} Wins!`);

  count++;
};

// -------------------------EVENT LISTENERS

grids.forEach((grid, i) => {
  grid.addEventListener("click", function (e) {
    hideBtns();

    // if (swapBtn.style.visibility === "hidden") {
    //   curr =
    // }

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

    checkVertical();
    checkHorizontal();
    checkDiagonal();

    {
      changeNameBtns.forEach((changeNameBtn) => {
        if (changeNameBtn.textContent === "OK") confirmName(changeNameBtn);
      });
    }
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
      createBoard(player1.name, bot.name);
      curr = player1;
      signX.textContent = player1.sign;
      next = bot;
      signO.textContent = bot.sign;
      botBtn.style.visibility = "hidden";
    } else {
      createBoard(player1.name, player2.name);
      curr = player1;
      signX.textContent = player1.sign;
      next = player2;
      signO.textContent = player2.sign;
      botBtn.style.visibility = "visible";
    }
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
