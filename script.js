"use strict";

// ------------------------- VARIABLES
const grids = document.querySelectorAll(".grid");
const newGame = document.querySelector(".new-game");

// ------------------------- MODULES AND FACTORIES
const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  return { board };
})();

const displayController = (() => {})();

const player = (name) => {
  return { name };
};

// ------------------------- FUNCTIONS
const clearBoard = function () {
  grids.forEach((grid) => {
    grid.innerHTML = "";
  });
};

// ------------------------- EVENT LISTENERS
grids.forEach((grid) => {
  grid.addEventListener("click", function (e) {
    grid.value = "X";
    grid.innerHTML = "X";
    console.log(e);
  });
});

newGame.addEventListener("click", function () {
  clearBoard();
});
