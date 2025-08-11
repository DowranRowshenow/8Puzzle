export default class Game {
    constructor(size = 3) {
        this.size = size;
        this.board = this.createBoard();
        this.emptyTile = this.findEmptyTile();
        this.moves = 0;
    }

    createBoard() {
        const board = [];
        let value = 1;
        for (let i = 0; i < this.size; i++) {
            board.push([]);
            for (let j = 0; j < this.size; j++) {
                board[i].push(value++);
            }
        }
        board[this.size - 1][this.size - 1] = 0; // Empty tile
        return board;
    }

    findEmptyTile() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) {
                    return { row: i, col: j };
                }
            }
        }
    }

    moveTile(row, col) {
        const emptyTile = this.findEmptyTile();
        if (this.isValidMove(row, col, emptyTile.row, emptyTile.col)) {
            this.swapTiles(row, col, emptyTile.row, emptyTile.col);
            this.moves++;
            return true;
        }
        return false;
    }

    isValidMove(row, col, emptyRow, emptyCol) {
        return (
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow)
        );
    }

    swapTiles(row1, col1, row2, col2) {
        [this.board[row1][col1], this.board[row2][col2]] = [
            this.board[row2][col2],
            this.board[row1][col1],
        ];
        this.emptyTile = { row: row1, col: col1 };
    }

    isSolved() {
        let value = 1;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (i === this.size - 1 && j === this.size - 1) {
                    if (this.board[i][j] !== 0) return false;
                } else {
                    if (this.board[i][j] !== value++) return false;
                }
            }
        }
        return true;
    }

    shuffle() {
        let shuffleCount = this.size * this.size * 10;
        for (let i = 0; i < shuffleCount; i++) {
            const neighbors = this.getNeighbors(this.emptyTile.row, this.emptyTile.col);
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            this.moveTile(randomNeighbor.row, randomNeighbor.col);
        }
        this.moves = 0;
    }

    getNeighbors(row, col) {
        const neighbors = [];
        if (row > 0) neighbors.push({ row: row - 1, col });
        if (row < this.size - 1) neighbors.push({ row: row + 1, col });
        if (col > 0) neighbors.push({ row, col: col - 1 });
        if (col < this.size - 1) neighbors.push({ row, col: col + 1 });
        return neighbors;
    }
}
