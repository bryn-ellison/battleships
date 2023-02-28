import { shipFactory, gameboardFactory, playerFactory } from "./game.js";
import {
  displayBoard,
  displayGameOver,
  placePlayerShips,
  displayGameConsole,
  updateConsoleStatus,
} from "./DOM.js";
import "./styles.css";

// build player boards

let player1 = playerFactory("Bryn");
let computer = playerFactory("Computer");
let turn = player1;
let shipArr = [
  ["Aircraft Carrier", 5],
  ["Battleship", 4],
  ["Submarine", 3],
  ["Cruiser", 3],
  ["Destroyer", 2],
];

function setupPlayer() {
  updateConsoleStatus(`${player1.name} please place your ${shipArr[0][0]}`);
  placePlayerShips(shipArr[0][0], shipArr[0][1]);
}

function placePlayerShip(coords) {
  shipArr.shift();
  player1.playerBoard.placeShip(coords);
  displayBoard(player1);
  if (shipArr.length === 0) {
    shipArr = [
      ["Aircraft Carrier", 5],
      ["Battleship", 4],
      ["Submarine", 3],
      ["Cruiser", 3],
      ["Destroyer", 2],
    ];
    computerSetup();
  } else {
    setupPlayer();
  }
}

function computerSetup() {
  function getCoords() {
    let coords = [];
    let isVertical = false;
    let rotateRandom = Math.floor(Math.random() * 10);
    if (rotateRandom > 4) isVertical = true;
    function getStartingCoords() {
      const y = Math.floor(Math.random() * 10);
      const x = Math.floor(Math.random() * 10);
      if (computer.playerBoard.board[y][x] !== 0) {
        return getStartingCoords();
      } else {
        return [y, x];
      }
    }
    const startingCoords = getStartingCoords();
    for (let i = 0; i < shipArr[0][1]; i++) {
      const yAxis = startingCoords[0];
      const xAxis = startingCoords[1];
      if (isVertical === true) {
        if (
          computer.playerBoard.board[yAxis + 1][xAxis] !== 0 ||
          yAxis + i > 9
        ) {
          return getCoords();
        } else {
          coords.push([[yAxis + i], [xAxis]]);
        }
      } else {
        if (
          computer.playerBoard.board[yAxis][xAxis + i] !== 0 ||
          xAxis + i > 9
        ) {
          return getCoords();
        } else {
          coords.push([[yAxis], [xAxis + i]]);
        }
      }
    }
    return coords;
  }

  function placeCompShip() {
    computer.playerBoard.placeShip(getCoords());
    shipArr.shift();
    if (shipArr.length === 0) {
      shipArr = [
        ["Aircraft Carrier", 5],
        ["Battleship", 4],
        ["Submarine", 3],
        ["Cruiser", 3],
        ["Destroyer", 2],
      ];
      gameLoop();
    } else {
      placeCompShip();
    }
  }
  placeCompShip();
}

function gameLoop() {
  if (turn === player1) {
    setTimeout(() => {
      updateConsoleStatus(`${player1.name} take your shot...`);
    }, 500);

    turn = computer;
  } else {
    setTimeout(() => {
      updateConsoleStatus("Computer shoots...");
      computer.takeTurn(player1, computer.getCoords(player1));
      displayBoard(player1);
      turn = player1;
      gameLoop();
    }, 800);
  }
}

function playerTurn(coords) {
  player1.takeTurn(computer, coords);
  displayBoard(computer);
  gameLoop();
}

function gameEnd(attacker) {
  displayGameOver(attacker);
}

function restartGame() {
  player1 = "";
  computer = "";
  player1 = playerFactory("Bryn");
  computer = playerFactory("Computer");
  displayBoard(player1);
  displayBoard(computer);
  setupPlayer();
}
displayGameConsole();
displayBoard(player1);
displayBoard(computer);
//setupGame(player1, computer);

export {
  playerTurn,
  gameEnd,
  player1,
  computer,
  placePlayerShip,
  setupPlayer,
  restartGame,
};
