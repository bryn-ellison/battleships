// create ships

const shipFactory = (length) => {
  let hits = 0;
  const isSunk = () => {
    if (hits >= length) {
      return true;
    } else {
      return false;
    }
  };
  const hit = () => {
    hits++;
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
  let type;
  const placeShip = (coords) => {
    const length = coords.length;
    switch (length) {
      case 2:
        type = "D";
        break;
      case 3:
        type = "S";
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

  return { board, placeShip, ships };
};

module.exports = { shipFactory, gameboardFactory };
