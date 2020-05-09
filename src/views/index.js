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
    this.populateGameInfo();
    this.populateBoard(this.game.getBoard());
  }

  registerPlay(row, column) {
    this.gameState.latestPlay = [Number(row), Number(column)];
    this.game.placeMark(Number(row), Number(column));

    this.populateBoard(this.game.getBoard());

    if (this.game.isWinner() || this.game.isBoardFull()) {
      // reset the game
      this.populateGameInfo();
      setTimeout(() => {
        this.initializeGame();
      }, 5000);
    } else {
      this.game.changePlayer();
      this.populateGameInfo();
    }
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
          onclick="registerPlay(this)"
        >
          ${disabled ? board[i][j] : ""}
        </div>
        `
        );
      }
    }

    let html = document.getElementsByClassName("game-board")[0];
    html.innerHTML = "";
    html.insertAdjacentHTML("afterbegin", result.join(""));
  }

  populateGameInfo() {
    let player = this.game.getCurrentPlayer();
    let gameInfo = `${player} to play`;

    if (this.game.isWinner()) {
      gameInfo = `
      <div>${player} is the winner. Game will restart in 5 secs</div>
      `;
    } else if (!this.game.isWinner() && this.game.isBoardFull()) {
      gameInfo = `
      <div>This game was a draw. Game will restart in 5 secs</div>
      `;
    }

    let gameElement = document.getElementsByClassName("game-info")[0];
    gameElement.innerHTML = "";
    gameElement.insertAdjacentHTML("afterbegin", gameInfo);
  }
}
