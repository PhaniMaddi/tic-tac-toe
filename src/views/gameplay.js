"use strict";

class TicTacToe {
  constructor(player) {
    this.board = [];
    this.currentPlayer = player;
  }
  /**
   * initializeBoard
   */
  initializeBoard() {
    for (let i = 0; i < 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = "-";
      }
    }
  }
  /**
   * getBoard
   */
  getBoard() {
    return this.board;
  }
  /**
   * changePlayer
   */
  changePlayer() {
    if (this.currentPlayer === "x") {
      this.currentPlayer = "o";
    } else {
      this.currentPlayer = "x";
    }
  }
  /**
   * placeMark
   */
  placeMark(row, col) {
    if (this.board[row][col] === "-") {
      this.board[row][col] = this.currentPlayer;
      return true;
    }
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  /**
   * isBoardFull
   */
  isBoardFull() {
    let emptyCount = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === "-") {
          if (emptyCount > 0) return false;
          emptyCount++;
        }
      }
    }

    return emptyCount === 0;
  }
  /**
   * isWinner
   */
  isWinner() {
    return this.checkRows() || this.checkColumns() || this.checkDiagonals();
  }
  checkRows() {
    const board = this.board;
    for (let i = 0; i < 3; i++) {
      if (this.checkRowCol(board[i][0], board[i][1], board[i][2]) === true) {
        return true;
      }
    }
    return false;
  }
  checkColumns() {
    const board = this.board;
    for (let i = 0; i < 3; i++) {
      if (this.checkRowCol(board[0][i], board[1][i], board[2][i]) === true) {
        return true;
      }
    }
    return false;
  }
  checkDiagonals() {
    const board = this.board;
    for (let i = 0; i < 3; i++) {
      if (
        this.checkRowCol(board[0][0], board[1][1], board[2][2]) ||
        this.checkRowCol(board[0][2], board[1][1], board[2][0])
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  checkRowCol(c1, c2, c3) {
    return c1 !== "-" && c1 === c2 && c2 === c3;
  }
}
//# sourceMappingURL=gameplay.js.map
