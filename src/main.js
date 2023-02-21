import { shipFactory, gameboardFactory, playerFactory } from "./game.js";
import { displayBoard } from "./DOM.js";
import "./styles.css";

// build player boards

const player1 = playerFactory("Bryn");
const computer = playerFactory("computer");

player1.playerBoard.board = [
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

displayBoard(player1);
displayBoard(computer);

let turn = player1;

function gameLoop() {
  if (turn === player1) {
    turn = computer;
  } else {
    computer.takeTurn(player1, computer.getCoords(player1));
    displayBoard(player1);
    // call display function to deal with hit result
    turn = player1;
    gameLoop();
  }
}

function playerTurn(coords) {
  player1.takeTurn(computer, coords);
  // call display function to deal with hit result
  displayBoard(computer);
  gameLoop();
}

gameLoop();

export { playerTurn };
