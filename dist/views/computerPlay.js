"use strict";
/**
 * Reference:
 * https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
 */
class ComputerPlay {
  constructor(board, player, opponent) {
    this.player = "x";
    this.opponent = "o";
    this.board = board;
    this.player = player;
    this.opponent = opponent;
  }
  anyMovesLeft(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "-") {
          return true;
        }
      }
    }
    return false;
  }
  evaluate(board) {
    // check all rows
    for (let row = 0; row < board.length; row++) {
      if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
        if (board[row][0] === this.player) {
          return +10;
        } else if (board[row][0] === this.opponent) {
          return -10;
        }
      }
    }
    // check all columns
    for (let col = 0; col < board.length; col++) {
      if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        if (board[0][col] === this.player) {
          return +10;
        } else if (board[0][col] === this.opponent) {
          return -10;
        }
      }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === this.player) {
        return +10;
      } else if (board[0][0] === this.opponent) {
        return -10;
      }
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === this.player) {
        return +10;
      } else if (board[0][2] === this.opponent) {
        return -10;
      }
    }
  }
  minimax(board, depth, isMax) {
    let score = this.evaluate(board);
    if (score) {
      return score;
    }
    if (!this.anyMovesLeft(board)) {
      return 0;
    }
    // If is is maximizer's move
    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "-") {
            board[i][j] = this.player;
          }
          // Call minimax recursively and choose
          // the maximum value
          best = Math.max(best, this.minimax(board, depth + 1, !isMax));
          // Undo the move
          board[i][j] = "-";
        }
      }
      return best;
    } else {
      // If this minimizer's move
      let best = 1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "-") {
            board[i][j] = this.opponent;
          }
          // Call minimax recursively and choose
          // the minimum value
          best = Math.min(best, this.minimax(board, depth + 1, !isMax));
          // Undo the move
          board[i][j] = "-";
        }
      }
      return best;
    }
  }
  findBestMove(board) {
    let bestVal = -1000;
    let bestMove = {
      row: -1,
      col: -1,
    };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "-") {
          board[i][j] = this.player;
        }
        let moveVal = this.minimax(board, 0, false);
        board[i][j] = "-";
        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove.row = i;
          bestMove.col = j;
        }
      }
    }
    return bestMove;
  }
}
