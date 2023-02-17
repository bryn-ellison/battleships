const body = document.querySelector("body");
const main = document.createElement("div");
main.id = "main";
body.appendChild(main);

function displayBoard(boardArr) {
  const boardContainer = document.createElement("div");
  boardContainer.classList = "board-container";
  boardArr.forEach((elementY, indexY) => {
    elementY.forEach((elementX, indexX) => {
      const gridSquare = document.createElement("div");
      gridSquare.classList = "grid-square";
      gridSquare.textContent = elementX;
      gridSquare.id = `${indexY}, ${indexX}`;
      boardContainer.appendChild(gridSquare);
    });
  });
  main.appendChild(boardContainer);
}

module.exports = { displayBoard };
