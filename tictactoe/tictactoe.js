// store game board
// factory for players
// function to keep track of turn
// function to place marker
// function to check for win/tie

function GameBoard() {
  let board = Array(9).fill(" ");

  const getBoard = () => board;

  const makeMove = (index, symbol) => {
    console.log(board);
    if (board[index] === " ") {
      board[index] = symbol;
      console.log(board);
      //return true;
    } else return;
  };
  const printBoard = (symbol) => {
    let value = "";
    for (let i = 0; i < board.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        value += "\n";
      }
      value += board[symbol] ? board[symbol] : " ";
      if (i % 3 !== 2) {
        value += " | ";
      }
    }
    console.log(value);
  };

  const resetBoard = () => {
    board = Array(9).fill(" ");
  };
  const checkWin = (symbol) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winningCombinations.some((combination) => {
      return combination.every((index) => board[index] === symbol);
    });
  };
  return {
    getBoard,
    makeMove,
    resetBoard,
    checkWin,
    printBoard,
  };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two",
) {
  const board = GameBoard();

  const gamePlayers = [
    {
      name: playerOneName,
      symbol: "X",
    },
    {
      name: playerTwoName,
      symbol: "O",
    },
  ];

  let currentPlayer = gamePlayers[0];
  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () => {
    currentPlayer =
      currentPlayer === gamePlayers[0] ? gamePlayers[1] : gamePlayers[0];
  };

  const printNewRound = (symbol) => {
    board.printBoard(symbol);
    console.log(`${currentPlayer.name}'s turn.`);
  };

  const playRound = (index) => {
    board.makeMove(index, getCurrentPlayer().symbol);
    console.log(getCurrentPlayer().symbol);

    board.checkWin();
    switchPlayer();
    printNewRound();
  };
  printNewRound();
  return {
    playRound,

    getCurrentPlayer,
  };
}

const game = GameController();
