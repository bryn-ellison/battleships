import { player1, computer, playerTurn } from "../src/main.js";

const body = document.querySelector("body");
const main = document.createElement("div");
main.id = "main";
body.appendChild(main);

function displayBoard(boardObj) {
  let firstRun = false;
  if (document.getElementById(`${boardObj.name}-gameboard`) === null) {
    firstRun = true;
  }
  const boardContainer = document.createElement("div");
  boardContainer.classList = "board-container";
  boardContainer.id = `${boardObj.name}-gameboard`;
  const boardArr = boardObj.playerBoard.board;
  boardArr.forEach((elementY, indexY) => {
    elementY.forEach((elementX, indexX) => {
      const gridSquare = document.createElement("div");
      gridSquare.classList = "grid-square";
      if (elementX === "H") gridSquare.classList = "hit-square";
      if (elementX === "M") gridSquare.classList = "miss-square";
      gridSquare.id = `${indexY}, ${indexX}`;
      if (boardObj.name === "computer") {
        gridSquare.addEventListener("click", () => {
          playerTurn([indexY, indexX]);
        });
      } else {
        if (
          elementX === "D" ||
          elementX === "S" ||
          elementX === "C" ||
          elementX === "B" ||
          elementX === "A"
        )
          gridSquare.classList = "ship-square";

        gridSquare.textContent = elementX;
      }

      boardContainer.appendChild(gridSquare);
    });
  });
  if (firstRun) {
    main.appendChild(boardContainer);
  } else {
    const oldChild = document.getElementById(`${boardObj.name}-gameboard`);
    main.replaceChild(boardContainer, oldChild);
  }
}

// display hit or miss function

export { displayBoard };
