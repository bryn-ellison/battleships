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

const player1 = playerFactory("Bryn");
const computer = playerFactory("Computer");
let turn = player1;
const shipArr = [
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
    computerSetup();
    gameLoop();
  } else {
    setupPlayer();
  }
}

function computerSetup() {
  console.log("computer setting up");
  computer.playerBoard.board = [
    ["D", "D", 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "A"],
    [0, 0, "S", 0, 0, 0, 0, 0, 0, "A"],
    [0, 0, "S", 0, 0, 0, 0, 0, 0, "A"],
    [0, 0, "S", 0, 0, 0, 0, 0, 0, "A"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "A"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, "C", "C", "C", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "B", "B", "B", "B", 0],
  ];

  // display boards

  displayBoard(computer);
}

function gameLoop() {
  if (turn === player1) {
    updateConsoleStatus(`${player1.name} take your shot...`);
    turn = computer;
  } else {
    updateConsoleStatus("Computer shoots...");
    computer.takeTurn(player1, computer.getCoords(player1));
    displayBoard(player1);
    turn = player1;
    gameLoop();
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

displayGameConsole();
displayBoard(player1);
displayBoard(computer);
//setupGame(player1, computer);

export { playerTurn, gameEnd, player1, computer, placePlayerShip, setupPlayer };
