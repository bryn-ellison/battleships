const { shipFactory } = require("./game");

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
