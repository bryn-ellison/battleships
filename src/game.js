// create ships

const shipFactory = (length) => {
  let health = length;
  const hit = () => {
    health--;
  };
  const isSunk = () => {
    if (health === 0) {
      return true;
    } else {
      return false;
    }
  };

  return { length, hit, isSunk };
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
  const placeShip = (coords) => {
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
      board[element[0]][element[1]] = type;
    });
    const ship = shipFactory(length);
    ship.vesselType = type;
    ships.push(ship);
  };
  const receiveAttack = (coords) => {
    if (board[coords[0]][coords[1]] === 0) {
      board[coords[0]][coords[1]] = "M";
    } else if (
      board[coords[0]][coords[1]] === "D" ||
      board[coords[0]][coords[1]] === "S" ||
      board[coords[0]][coords[1]] === "C" ||
      board[coords[0]][coords[1]] === "B" ||
      board[coords[0]][coords[1]] === "A"
    ) {
      const shipTypeHit = board[coords[0]][coords[1]];
      board[coords[0]][coords[1]] = "H";
      livesLeft--;
      ships.forEach((element) => {
        if (element.vesselType === shipTypeHit) {
          element.hit();
        }
      });
      checkGameOver();
    } else return false;
  };
  const checkGameOver = () => {
    if (livesLeft === 0) {
      console.log("GAME OVER!");
    }
  };
  return { board, placeShip, ships, receiveAttack };
};

// create players

const playerFactory = (name) => {
  const playerBoard = gameboardFactory();
  const takeTurn = (enemy, coords) => {
    enemy.playerBoard.receiveAttack(coords);
  };
  const getCoords = (enemy) => {
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);
    if (enemy.playerBoard.board[y][x] === 0) {
      return [y, x];
    } else {
      getCoords(enemy);
    }
  };
  return { name, playerBoard, takeTurn, getCoords };
};

module.exports = { shipFactory, gameboardFactory, playerFactory };
