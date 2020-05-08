class Game {
  gameState = {};
  game = null;

  constructor(player) {
    this.gameState = {
      player,
      latestPlay: [],
    };

    this.game = new TicTacToe(this.gameState.player);
  }

  initializeGame() {
    this.game.initializeBoard();
    const board = this.populateBoard(this.game.getBoard());
    let html = document.getElementsByClassName("game-board")[0];

    html.innerHTML = "";
    html.insertAdjacentHTML("afterbegin", board);
  }

  selectPlayer(obj) {
    const player = obj.getAttribute("value");
    this.game = new TicTacToe(player);
    this.initializeGame();
  }

  populateBoard(board) {
    let result = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let value = board[i][j];
        let disabled = value !== "-";
        let isLatestPlay = false;

        if (
          i === this.gameState.latestPlay[0] &&
          j === this.gameState.latestPlay[1]
        ) {
          isLatestPlay = true;
        }

        result.push(
          `
        <div 
          class="grid ${disabled ? "disabled" : "enabled"}  ${
            isLatestPlay ? "latest" : ""
          }" 
          data-row="${i}"
          data-column="${j}"
          onclick="newGame.registerPlay(this)"
        >
          ${disabled ? board[i][j] : ""}
        </div>
        `
        );
      }
    }

    return result.join("");
  }

  registerPlay(obj) {
    let value = this.game.getCurrentPlayer();
    let row = obj.getAttribute("data-row");
    let column = obj.getAttribute("data-column");

    this.gameState.latestPlay = [Number(row), Number(column)];
    this.game.placeMark(Number(row), Number(column));

    let updatedBoard = this.populateBoard(this.game.getBoard());
    let gameElement = document.getElementsByClassName("game-board")[0];
    gameElement.innerHTML = "";
    gameElement.insertAdjacentHTML("afterbegin", updatedBoard);

    if (this.game.isWinner()) {
      console.log(`${this.game.getCurrentPlayer()} is the winner`);
      // reset the game
      this.initializeGame();
      // TODO: show the result and reset the game
    } else if (this.game.isBoardFull()) {
      // reset the game
      this.initializeGame();
      console.log("this game is a draw");
    } else {
      this.game.changePlayer();
    }
  }
}

const newGame = new Game("x");
newGame.initializeGame();
