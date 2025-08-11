export default class Solver {
    constructor(game) {
        this.game = game;
    }

    solve() {
        const openSet = new PriorityQueue();
        const closedSet = new Set();
        const startNode = {
            board: this.game.board,
            moves: [],
            g: 0,
            h: this.calculateHeuristic(this.game.board),
        };
        openSet.enqueue(startNode, startNode.g + startNode.h);

        while (!openSet.isEmpty()) {
            const currentNode = openSet.dequeue().element;

            if (this.isSolved(currentNode.board)) {
                return currentNode.moves;
            }

            closedSet.add(JSON.stringify(currentNode.board));

            const emptyTile = this.findEmptyTile(currentNode.board);
            const neighbors = this.getNeighbors(emptyTile.row, emptyTile.col);

            for (const neighbor of neighbors) {
                const newBoard = this.copyBoard(currentNode.board);
                this.swapTiles(newBoard, emptyTile.row, emptyTile.col, neighbor.row, neighbor.col);
                const boardString = JSON.stringify(newBoard);

                if (closedSet.has(boardString)) {
                    continue;
                }

                const g = currentNode.g + 1;
                const h = this.calculateHeuristic(newBoard);
                const f = g + h;
                const newNode = {
                    board: newBoard,
                    moves: [...currentNode.moves, { from: emptyTile, to: neighbor }],
                    g,
                    h,
                };

                if (!openSet.has(boardString) || f < openSet.getPriority(boardString)) {
                    openSet.enqueue(newNode, f, boardString);
                }
            }
        }
        return null; // No solution found
    }

    calculateHeuristic(board) {
        let heuristic = 0;
        for (let i = 0; i < this.game.size; i++) {
            for (let j = 0; j < this.game.size; j++) {
                const value = board[i][j];
                if (value !== 0) {
                    const targetRow = Math.floor((value - 1) / this.game.size);
                    const targetCol = (value - 1) % this.game.size;
                    heuristic += Math.abs(i - targetRow) + Math.abs(j - targetCol);
                }
            }
        }
        return heuristic;
    }

    isSolved(board) {
        let value = 1;
        for (let i = 0; i < this.game.size; i++) {
            for (let j = 0; j < this.game.size; j++) {
                if (i === this.game.size - 1 && j === this.game.size - 1) {
                    if (board[i][j] !== 0) return false;
                } else {
                    if (board[i][j] !== value++) return false;
                }
            }
        }
        return true;
    }

    findEmptyTile(board) {
        for (let i = 0; i < this.game.size; i++) {
            for (let j = 0; j < this.game.size; j++) {
                if (board[i][j] === 0) {
                    return { row: i, col: j };
                }
            }
        }
    }

    getNeighbors(row, col) {
        const neighbors = [];
        if (row > 0) neighbors.push({ row: row - 1, col });
        if (row < this.game.size - 1) neighbors.push({ row: row + 1, col });
        if (col > 0) neighbors.push({ row, col: col - 1 });
        if (col < this.game.size - 1) neighbors.push({ row, col: col + 1 });
        return neighbors;
    }

    copyBoard(board) {
        return board.map(row => [...row]);
    }

    swapTiles(board, row1, col1, row2, col2) {
        [board[row1][col1], board[row2][col2]] = [board[row2][col2], board[row1][col1]];
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority, boardString) {
        const queueElement = { element, priority, boardString };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > queueElement.priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    has(boardString) {
        return this.items.some(item => item.boardString === boardString);
    }

    getPriority(boardString) {
        const item = this.items.find(item => item.boardString === boardString);
        return item ? item.priority : Infinity;
    }
}
