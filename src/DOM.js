import {
  player1,
  computer,
  playerTurn,
  setupGame,
  setupPlayer,
  placePlayerShip,
} from "../src/main.js";

const body = document.querySelector("body");
const main = document.createElement("div");
main.id = "main";
body.appendChild(main);

function displayBoard(boardObj) {
  let firstRun = false;
  if (document.getElementById(`${boardObj.name}-gameboard`) === null) {
    firstRun = true;
  }
  const playerContainer = document.createElement("div");
  playerContainer.id = `${boardObj.name}-player-container`;
  playerContainer.classList = "player-container";
  const boardContainer = document.createElement("div");
  boardContainer.classList = "board-container";
  boardContainer.id = `${boardObj.name}-gameboard`;
  const boardArr = boardObj.playerBoard.board;
  boardArr.forEach((elementY, indexY) => {
    elementY.forEach((elementX, indexX) => {
      const gridSquare = document.createElement("div");
      gridSquare.classList = "grid-square";
      gridSquare.id = `${indexY}, ${indexX}`;
      if (boardObj.name === "Computer") {
        gridSquare.classList = "computer-grid-square";
        gridSquare.addEventListener("click", () => {
          if (elementX === "M" || elementX === "H") return null;
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
      }
      if (elementX === "H") gridSquare.classList = "hit-square";
      if (elementX === "M") gridSquare.classList = "miss-square";
      boardContainer.appendChild(gridSquare);
    });
  });

  if (firstRun) {
    playerContainer.appendChild(boardContainer);
  } else {
    const oldChild = document.getElementById(`${boardObj.name}-gameboard`);
    oldChild.replaceWith(boardContainer);
  }
  main.appendChild(playerContainer);
  displayConsole(boardObj, firstRun);
}

function displayConsole(boardObj, firstRun) {
  const playerContainer = document.getElementById(
    `${boardObj.name}-player-container`
  );
  const consoleContainer = document.createElement("div");
  consoleContainer.id = `${boardObj.name}-console`;
  consoleContainer.classList = "player-console";
  const boardName = document.createElement("h3");
  boardName.classList = "board-names";
  boardName.textContent = `${boardObj.name}'s waters`;
  consoleContainer.appendChild(boardName);
  if (firstRun) {
    playerContainer.appendChild(consoleContainer);
  } else {
    const oldChild = document.getElementById(`${boardObj.name}-console`);
    oldChild.replaceWith(consoleContainer);
  }
}

function displayGameOver(winner) {
  const gameOverContainer = document.createElement("div");
  gameOverContainer.id = "game-over-container";
  const gameOverText = document.createElement("h3");
  gameOverText.id = "game-over-text";
  gameOverText.textContent = "GAME OVER";
  const winnerMessage = document.createElement("p");
  winnerMessage.id = "winner-message";
  winnerMessage.textContent = `${winner} wins!!!`;
  const restartBtn = document.createElement("button");
  restartBtn.id = "restart-btn";
  restartBtn.textContent = "Play again";
  restartBtn.addEventListener("click", () => {
    // add new restart game function
    main.removeChild(gameOverContainer);
  });
  gameOverContainer.appendChild(gameOverText);
  gameOverContainer.appendChild(winnerMessage);
  gameOverContainer.appendChild(restartBtn);
  main.appendChild(gameOverContainer);
}

function placePlayerShips(shipName, shipLength) {
  let isVertical = false;
  const emptyGridSquares = document.querySelectorAll(".grid-square");
  const shipGridSquares = document.querySelectorAll(".ship-square");
  const btnContainer = document.querySelector("#btn-container");
  const rotateBtn = document.createElement("button");
  rotateBtn.classList = "console-btn";
  rotateBtn.textContent = "Rotate ship";
  rotateBtn.addEventListener("click", () => {
    if (isVertical) {
      isVertical = false;
    } else {
      isVertical = true;
    }
  });
  btnContainer.appendChild(rotateBtn);

  function getCoordX(e, i) {
    const xCoord = Number(e.target.id.split(",")[1]) + i;
    const coord = `${e.target.id.split(",")[0]}, ${xCoord.toString()}`;
    const currentSquare = document.getElementById(coord);
    return currentSquare;
  }

  function getCoordY(e, i) {
    const yCoord = Number(e.target.id.split(",")[0]) + i;
    const coord = `${yCoord.toString()},${e.target.id.split(",")[1]}`;
    const currentSquare = document.getElementById(coord);
    return currentSquare;
  }

  emptyGridSquares.forEach((element, index) => {
    element.addEventListener("mouseover", (e) => {
      for (let i = 0; i < shipLength; i++) {
        let currentSquare;
        if (isVertical) {
          currentSquare = getCoordY(e, i);
        } else {
          currentSquare = getCoordX(e, i);
        }
        currentSquare.classList = "ship-square";
      }
    });
    element.addEventListener("mouseout", (e) => {
      for (let i = 0; i < shipLength; i++) {
        let currentSquare;
        if (isVertical) {
          currentSquare = getCoordY(e, i);
        } else {
          currentSquare = getCoordX(e, i);
        }
        currentSquare.classList = "ship-square";
        let isShipSquare = false;
        shipGridSquares.forEach((element) => {
          if (element === currentSquare) {
            isShipSquare = true;
          }
        });
        if (isShipSquare === false) currentSquare.classList = "grid-square";
      }
    });
    element.addEventListener("click", (e) => {
      let placeCoords = [];
      let isShipSquare = false;
      for (let i = 0; i < shipLength; i++) {
        let currentSquare;
        if (isVertical) {
          currentSquare = getCoordY(e, i);
        } else {
          currentSquare = getCoordX(e, i);
        }
        const coords = currentSquare.id;
        placeCoords.push([coords[0], coords[3]]);
        currentSquare.classList = "ship-square";
        shipGridSquares.forEach((element) => {
          if (element === currentSquare) {
            isShipSquare = true;
          }
        });
      }
      if (isShipSquare) return;
      btnContainer.removeChild(rotateBtn);
      placePlayerShip(placeCoords);
    });
  });
}

function displayGameConsole() {
  const gameConsoleContainer = document.createElement("div");
  gameConsoleContainer.id = "game-console-container";
  const title = document.createElement("h1");
  title.id = "title";
  title.textContent = "BATTLESHIPS";
  const statusArea = document.createElement("div");
  statusArea.id = "status-area";
  const status = document.createElement("p");
  status.id = "status-text";
  status.textContent = "Welcome to Battleships!";
  const btnContainer = document.createElement("div");
  btnContainer.id = "btn-container";
  const startGameBtn = document.createElement("button");
  startGameBtn.classList = "console-btn";
  startGameBtn.textContent = "Start game";
  startGameBtn.addEventListener("click", () => {
    setupPlayer();
    startGameBtn.style.display = "none";
  });
  gameConsoleContainer.appendChild(title);
  statusArea.appendChild(status);
  gameConsoleContainer.appendChild(statusArea);
  btnContainer.appendChild(startGameBtn);
  gameConsoleContainer.appendChild(btnContainer);
  main.appendChild(gameConsoleContainer);
}

function updateConsoleStatus(statusMessage) {
  const status = document.getElementById("status-text");
  status.textContent = `${statusMessage}`;
}

export {
  displayBoard,
  displayGameOver,
  placePlayerShips,
  displayGameConsole,
  updateConsoleStatus,
};
