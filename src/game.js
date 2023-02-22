import { gameEnd } from "./main";

// create ships

const shipFactory = (length) => {
  let health = length;
  function hit() {
    this.health--;
  }
  function isSunk() {
    if (this.health === 0) {
      return true;
    } else {
      return false;
    }
  }

  return { health, hit, isSunk, length };
};

// create gameboards

const gameboardFactory = () => {
  function createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    return board;
  }
  const board = createBoard();
  const ships = [];
  let livesLeft = 17;
  let type;
  let subBuilt = false;
  function placeShip(coords) {
    const length = coords.length;
    switch (length) {
      case 2:
        type = "D";
        break;
      case 3:
        if (subBuilt === false) {
          type = "S";
          subBuilt = true;
        } else {
          type = "C";
        }
        break;
      case 4:
        type = "B";
        break;
      case 5:
        type = "A";
        break;
    }
    coords.forEach((element) => {
      this.board[element[0]][element[1]] = type;
    });
    const ship = shipFactory(length);
    ship.vesselType = type;
    ships.push(ship);
  }
  function receiveAttack(coords, attacker) {
    if (this.board[coords[0]][coords[1]] === 0) {
      this.board[coords[0]][coords[1]] = "M";
    } else if (
      this.board[coords[0]][coords[1]] === "D" ||
      this.board[coords[0]][coords[1]] === "S" ||
      this.board[coords[0]][coords[1]] === "C" ||
      this.board[coords[0]][coords[1]] === "B" ||
      this.board[coords[0]][coords[1]] === "A"
    ) {
      const shipTypeHit = this.board[coords[0]][coords[1]];
      this.board[coords[0]][coords[1]] = "H";
      livesLeft--;
      this.ships.forEach((element) => {
        if (element.vesselType === shipTypeHit) {
          element.hit();
        }
      });
      checkGameOver(attacker);
    } else return false;
  }
  function checkGameOver(attacker) {
    if (livesLeft === 0) {
      gameEnd(attacker);
    }
  }
  return { board, placeShip, ships, receiveAttack, checkGameOver };
};

// create players

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();
  function takeTurn(enemy, coords) {
    enemy.playerBoard.receiveAttack(coords, this.name);
  }
  function getCoords(enemy) {
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);
    if (
      enemy.playerBoard.board[y][x] === "M" ||
      enemy.playerBoard.board[y][x] === "H"
    ) {
      return getCoords(enemy);
    } else {
      return [y, x];
    }
  }
  return { name, playerBoard, takeTurn, getCoords };
};

export { shipFactory, gameboardFactory, playerFactory };
