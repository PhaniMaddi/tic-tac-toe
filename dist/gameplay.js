"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computerPlay_1 = require("./computerPlay");
class TicTacToe {
    constructor(player, gameType) {
        this.board = [];
        this.currentPlayer = player;
        this.opponent = player === "x" ? "o" : "x";
        this.gameType = gameType;
        this.computerPlay = new computerPlay_1.ComputerPlay(this.board, this.currentPlayer, this.opponent);
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
        }
        else {
            this.currentPlayer = "x";
        }
    }
    /**
     * placeMark
     */
    registerMove(r, c) {
        if (this.board[r][c] === "-") {
            this.board[r][c] = this.currentPlayer;
            if (this.gameType === "single") {
                const { row, col } = this.computerPlay.findBestMove(this.board);
                this.board[row][col] = this.currentPlayer;
            }
            return true;
        }
    }
    /**
     * getCurrentPlayer
     */
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
                    if (emptyCount > 0)
                        return false;
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
            if (this.checkRowCol(board[i][0], board[i][1], board[i][2])) {
                return true;
            }
        }
        return false;
    }
    checkColumns() {
        const board = this.board;
        for (let i = 0; i < 3; i++) {
            if (this.checkRowCol(board[0][i], board[1][i], board[2][i])) {
                return true;
            }
        }
        return false;
    }
    checkDiagonals() {
        const board = this.board;
        for (let i = 0; i < 3; i++) {
            if (this.checkRowCol(board[0][0], board[1][1], board[2][2]) ||
                this.checkRowCol(board[0][2], board[1][1], board[2][0])) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    checkRowCol(c1, c2, c3) {
        return c1 !== "-" && c1 === c2 && c2 === c3;
    }
}
exports.TicTacToe = TicTacToe;
//# sourceMappingURL=gameplay.js.map