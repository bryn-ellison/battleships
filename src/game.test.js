const { shipFactory, gameboardFactory, playerFactory } = require("./game");

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe("shipFactory", () => {
  test("returns ship object with correct properties", () => {
    expect(shipFactory(3)).toEqual(
      expect.objectContaining({
        length: expect.any(Number),
        hit: expect.any(Function),
        isSunk: expect.any(Function),
      })
    );
  });
  test("returns correct length when intialised", () => {
    expect(shipFactory(3).length).toEqual(3);
  });
  test("isSunk returns false boolean when invoked", () => {
    expect(shipFactory().isSunk()).toEqual(false);
  });
  test("test hit and isSunk function work when ship with length of 2 is hit 2 times", () => {
    const testShip = shipFactory(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toEqual(true);
  });
});

describe("gameboardFactory", () => {
  test("returns board object with correct properties", () => {
    expect(gameboardFactory()).toEqual(
      expect.objectContaining({
        board: expect.any(Array),
      })
    );
  });
  test("exported board arrays should be correct format", () => {
    expect(gameboardFactory().board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  test("placeShip method should place a ship in first two places on board", () => {
    const testBoard = gameboardFactory();
    testBoard.placeShip([
      [0, 0],
      [0, 1],
    ]);
    expect(testBoard.board).toEqual([
      ["D", "D", 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  test("placeShip method should place 2 length 3 ships in correct places on board", () => {
    const testBoard = gameboardFactory();
    testBoard.placeShip([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
    testBoard.placeShip([
      [3, 4],
      [4, 4],
      [5, 4],
    ]);
    expect(testBoard.board).toEqual([
      ["S", "S", "S", 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "C", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "C", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "C", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  test("placeShip method should place a length 4 ship in correct places on board", () => {
    const testBoard = gameboardFactory();
    testBoard.placeShip([
      [3, 4],
      [4, 4],
      [5, 4],
      [6, 4],
    ]);
    expect(testBoard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  test("placeship should create correct ship object in ships array in gameboard object", () => {
    const testBoard = gameboardFactory();
    testBoard.placeShip([
      [0, 0],
      [0, 1],
    ]);
    expect(testBoard.ships[0]).toEqual(
      expect.objectContaining({
        length: 2,
        hit: expect.any(Function),
        isSunk: expect.any(Function),
        vesselType: "D",
      })
    );
  });
  test("receiveAttack function should hit correct coordinate on gameboard object and register miss if not on target", () => {
    const testBoard = gameboardFactory();
    testBoard.receiveAttack([0, 9]);
    expect(testBoard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, "M"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  test("receiveAttack function should register hit on correct ship if on correct coordinate on gameboard array", () => {
    const testBoard = gameboardFactory();
    testBoard.placeShip([
      [0, 0],
      [0, 1],
    ]);
    testBoard.receiveAttack([0, 0]);
    expect(testBoard.board).toEqual([
      ["H", "D", 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  test("recieveAttack function should register hit on correct ship object if coords hit", () => {
    const testBoard = gameboardFactory();
    testBoard.placeShip([
      [0, 0],
      [0, 1],
    ]);
    testBoard.receiveAttack([0, 0]);
    testBoard.receiveAttack([0, 1]);
    expect(testBoard.ships[0].isSunk()).toEqual(true);
  });
});

describe("playerFactory function", () => {
  test("should return player object with correct properties", () => {
    expect(playerFactory("Bryn")).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        playerBoard: expect.any(Object),
        takeTurn: expect.any(Function),
      })
    );
  });
  test("should return valid playerboard object when created", () => {
    const player1 = playerFactory("Bryn");
    expect(player1.playerBoard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  test("should attack other player using takeTurn method", () => {
    const player1 = playerFactory("Bryn");
    const computer = playerFactory("computer");
    computer.playerBoard.placeShip([
      [0, 0],
      [0, 1],
    ]);
    player1.takeTurn(computer, [0, 0]);
    expect(computer.playerBoard.board[0][0]).toEqual("H");
  });
  test("should sink enemy ship with correct amount of hits using takeTurn method", () => {
    const player1 = playerFactory("Bryn");
    const computer = playerFactory("computer");
    computer.playerBoard.placeShip([
      [0, 0],
      [0, 1],
    ]);
    player1.takeTurn(computer, [0, 0]);
    player1.takeTurn(computer, [0, 1]);
    expect(computer.playerBoard.ships[0].isSunk()).toEqual(true);
  });
  test("getcoords function should return a random pair of coordinates", () => {
    const player1 = playerFactory("Bryn");
    const computer = playerFactory("computer");
    expect(computer.getCoords(player1)).toEqual([5, 5]);
  });
});
