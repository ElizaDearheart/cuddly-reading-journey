////// GameBoard

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
    makeMove,
    resetBoard,
    checkWin,
    printBoard,
    checkTie,
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

  const switchPlayer = () => {
    currentPlayer =
      currentPlayer === gamePlayers[0] ? gamePlayers[1] : gamePlayers[0];
  };

  const printRound = () => {
    gameBoard.printBoard(gameBoard.getBoard());
    console.log(`${currentPlayer.name}'s turn.`);
  };

  const playRound = (index) => {
    if (gameBoard.makeMove(index, currentPlayer.symbol)) {
      if (
        gameBoard.checkWin(gameBoard.getBoard(), currentPlayer.symbol) === true
      ) {
        printRound();
        console.log(
          `Contratulations ${currentPlayer.name}!  You win! Do you want to play again?`,
        );
        //gameBoard.resetBoard();
      } else if (gameBoard.checkTie(gameBoard.getBoard()) === false) {
        console.log("It is a draw.  Game Over");
      } else {
        switchPlayer();
        printRound();
      }
    } else {
      console.log("Move not allowed, please pick a different spot");
      printRound();
      return;
    }
  };
  printRound();
  return {
    playRound,
    getCurrentPlayer,
  };
}

const game = GameController();
