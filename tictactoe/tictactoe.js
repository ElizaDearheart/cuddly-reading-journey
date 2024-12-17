///// GameBoard

function GameBoard() {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const printBoard = (board) => {
    let output = "";

    for (let i = 0; i < 3; i++) {
      let row = "";
      for (let j = 0; j < 3; j++) {
        row += board[i * 3 + j] || " ";
        if (j < 2) row += " | ";
      }
      output += row + "\n";
      if (i < 2) output += "--------- \n";
    }

    console.log(output);
  };

  const makeMove = (index, symbol) => {
    if (board[index] === "") {
      board[index] = symbol;
      return true;
    } else return false;
  };

  const checkWin = (board, symbol) => {
    // winningCombinations =
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],

    if (board[0] === board[1] && board[0] === board[2] && board[0] === symbol) {
      return true;
    } else if (
      board[3] === board[4] &&
      board[3] === board[5] &&
      board[3] === symbol
    ) {
      return true;
    } else if (
      board[6] === board[7] &&
      board[6] === board[8] &&
      board[6] === symbol
    ) {
      return true;
    } else if (
      board[0] === board[3] &&
      board[0] === board[6] &&
      board[0] === symbol
    ) {
      return true;
    } else if (
      board[1] === board[4] &&
      board[1] === board[7] &&
      board[1] === symbol
    ) {
      return true;
    } else if (
      board[2] === board[5] &&
      board[2] === board[8] &&
      board[2] === symbol
    ) {
      return true;
    } else if (
      board[0] === board[4] &&
      board[0] === board[8] &&
      board[0] === symbol
    ) {
      return true;
    } else if (
      board[2] === board[4] &&
      board[2] === board[6] &&
      board[2] === symbol
    ) {
      return true;
    } else return false;
  };

  const checkTie = (board) => {
    if (board.some((space) => space === "")) {
      return true;
    } else {
      return false;
    }
  };

  const resetBoard = () => {
    board = Array(9).fill("");
  };
  return {
    getBoard,
    printBoard,
    makeMove,
    checkWin,
    checkTie,
    resetBoard,
  };
}

///// Game Controlloer

function GameController(playerX = "Player X", playerO = "Player O") {
  const gameBoard = GameBoard();

  const gamePlayers = [
    {
      name: playerX,
      symbol: "X",
    },
    {
      name: playerO,
      symbol: "O",
    },
  ];

  const chooseFirst = Math.floor(Math.random() * gamePlayers.length);

  let currentPlayer = gamePlayers[chooseFirst];
  const getCurrentPlayer = () => currentPlayer;
  const getCurrentPlayerSymbol = () => currentPlayer.symbol;

  const switchPlayer = () => {
    currentPlayer =
      currentPlayer === gamePlayers[0] ? gamePlayers[1] : gamePlayers[0];
  };

  const printRound = () => {
    gameBoard.printBoard(gameBoard.getBoard());
    console.log(`${currentPlayer.name}'s turn.`);
  };

  const playRound = (index) => {
    let gameMessage;
    let gameOver;
    if (gameBoard.makeMove(index, currentPlayer.symbol)) {
      if (
        gameBoard.checkWin(gameBoard.getBoard(), currentPlayer.symbol) === true
      ) {
        printRound();
        gameMessage = `Contratulations ${currentPlayer.name}, you won!`;
        gameOver = true; //TODO: reassess need.  Not used atm.
      } else if (gameBoard.checkTie(gameBoard.getBoard()) === false) {
        gameMessage = "It's a draw.  Game Over.";
      } else {
        switchPlayer();
        printRound();
      }
    } else {
      printRound();
      gameMessage = `Move not allowed, ${currentPlayer.name}, please pick a different square...`;
    }
    return { gameMessage, gameOver };
  };
  printRound();

  return {
    playRound,
    getCurrentPlayer,
    getCurrentPlayerSymbol,
    getBoard: gameBoard.getBoard,
    resetBoard: gameBoard.resetBoard,
  };
}

///// Display Controller

function DisplayController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const messageDiv = document.querySelector(".message");
  const boardDiv = document.querySelector(".board");
  const resetButton = document.querySelector(".reset-button");
  resetButton.textContent = "New Game";
  let message;

  // display name of game
  const gameName = document.querySelector(".game-name");
  gameName.textContent = "Tic Tac Toe";

  const updateScreen = () => {
    // clear board
    boardDiv.textContent = "";

    // get gameboard and current player
    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();

    // display player's turn
    playerTurnDiv.textContent = `${currentPlayer.name}'s turn`;

    // display board
    board.forEach((space, index) => {
      const squareButton = document.createElement("button");
      squareButton.classList.add("square");
      squareButton.dataset.indexNumber = index;

      squareButton.textContent = space;
      boardDiv.appendChild(squareButton);
    });
  };
  function clickSquare(e) {
    const selectedSquare = e.target.dataset.indexNumber;
    if (!selectedSquare) {
      return;
    }

    const currentGame = game.playRound(selectedSquare);
    message = currentGame.gameMessage;
    // const gameOver = currentGame.gameOver;

    messageDiv.textContent = message;
    updateScreen();
  }
  //event listeners
  boardDiv.addEventListener("click", clickSquare);

  resetButton.addEventListener("click", () => {
    messageDiv.textContent = "";
    DisplayController();
  });

  //initial render
  updateScreen();
}
DisplayController();
