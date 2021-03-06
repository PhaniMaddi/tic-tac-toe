import { ComputerPlay } from "./computerPlay";

export class TicTacToe {
  board: string[][] = [];
  currentPlayer: string;
  opponent: string;
  gameType: string;
  computerPlay: any;

  constructor(player: string, gameType: string) {
    this.currentPlayer = player;
    this.opponent = player === "x" ? "o" : "x";
    this.gameType = gameType;

    this.computerPlay = new ComputerPlay(this.currentPlayer, this.opponent);
  }

  /**
   * initializeBoard
   */
  public initializeBoard(): void {
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
  public changePlayer() {
    if (this.currentPlayer === "x") {
      this.currentPlayer = "o";
    } else {
      this.currentPlayer = "x";
    }
  }

  /**
   * placeMark
   */
  public placeMark(row: number, col: number): boolean {
    if (this.board[row][col] === "-") {
      this.board[row][col] = this.currentPlayer;
      return true;
    }
  }

  /**
   * playComputerHand
   */
  public playComputerHand() {
    const { row, col } = this.computerPlay.findBestMove(
      JSON.parse(JSON.stringify(this.board))
    );

    this.board[row][col] = this.opponent;
  }

  /**
   * getCurrentPlayer
   */
  public getCurrentPlayer() {
    return this.currentPlayer;
  }

  /**
   * isBoardFull
   */
  public isBoardFull(): boolean {
    let emptyCount: number = 0;
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
  public isWinner(): boolean {
    return this.checkRows() || this.checkColumns() || this.checkDiagonals();
  }

  private checkRows(): boolean {
    const board: string[][] = this.board;
    for (let i = 0; i < 3; i++) {
      if (this.checkRowCol(board[i][0], board[i][1], board[i][2])) {
        return true;
      }
    }
    return false;
  }

  private checkColumns(): boolean {
    const board: string[][] = this.board;
    for (let i = 0; i < 3; i++) {
      if (this.checkRowCol(board[0][i], board[1][i], board[2][i])) {
        return true;
      }
    }
    return false;
  }

  private checkDiagonals(): boolean {
    const board: string[][] = this.board;
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

  private checkRowCol(c1: string, c2: string, c3: string): boolean {
    return c1 !== "-" && c1 === c2 && c2 === c3;
  }
}
