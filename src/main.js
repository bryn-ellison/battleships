const { shipFactory, gameboardFactory, playerFactory } = require("./game");
const { displayBoard } = require("./DOM");
import "./styles.css";

const player1 = playerFactory("Bryn");
const computer = playerFactory("computer");

let turn = player1;

displayBoard(player1.playerBoard.board);

module.exports = { player1, computer };
