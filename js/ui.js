export default class UI {
    constructor(game, boardElement, movesElement, timeElement, highScoresList) {
        this.game = game;
        this.boardElement = boardElement;
        this.movesElement = movesElement;
        this.timeElement = timeElement;
        this.highScoresList = highScoresList;
        this.timer = null;
        this.seconds = 0;
        this.imageSrc = null;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${this.game.size}, 1fr)`;
        for (let i = 0; i < this.game.size; i++) {
            for (let j = 0; j < this.game.size; j++) {
                const tileValue = this.game.board[i][j];
                const tile = document.createElement('div');
                tile.classList.add('tile');
                if (tileValue === 0) {
                    tile.classList.add('empty');
                }
                tile.textContent = tileValue;
                tile.dataset.row = i;
                tile.dataset.col = j;

                if (this.imageSrc) {
                    tile.style.backgroundImage = `url(${this.imageSrc})`;
                    const tileSize = 100 / (this.game.size - 1);
                    const x = (tileValue - 1) % this.game.size;
                    const y = Math.floor((tileValue - 1) / this.game.size);
                    tile.style.backgroundPosition = `${x * tileSize}% ${y * tileSize}%`;
                    tile.style.backgroundSize = `${this.game.size * 100}%`;
                    tile.textContent = '';
                }

                this.boardElement.appendChild(tile);
            }
        }
        this.updateInfo();
    }

    updateInfo() {
        this.movesElement.textContent = this.game.moves;
    }

    startTimer() {
        this.seconds = 0;
        this.timeElement.textContent = `${this.seconds}s`;
        this.timer = setInterval(() => {
            this.seconds++;
            this.timeElement.textContent = `${this.seconds}s`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    handleTileClick(event) {
        const tile = event.target.closest('.tile');
        if (tile && !tile.classList.contains('empty')) {
            const row = parseInt(tile.dataset.row);
            const col = parseInt(tile.dataset.col);
            if (this.game.moveTile(row, col)) {
                this.renderBoard();
                if (this.game.isSolved()) {
                    this.stopTimer();
                    alert(`You solved the puzzle in ${this.seconds} seconds and ${this.game.moves} moves!`);
                    this.updateHighScores();
                }
            }
        }
    }

    updateHighScores() {
        const score = {
            size: this.game.size,
            time: this.seconds,
            moves: this.game.moves
        };
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(score);
        highScores.sort((a, b) => a.time - b.time);
        localStorage.setItem('highScores', JSON.stringify(highScores.slice(0, 5)));
        this.renderHighScores();
    }

    renderHighScores() {
        this.highScoresList.innerHTML = '';
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `${score.size}x${score.size} - ${score.time}s - ${score.moves} moves`;
            this.highScoresList.appendChild(li);
        });
    }
}
