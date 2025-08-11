import Game from './game.js';
import UI from './ui.js';
import Solver from './solver.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesElement = document.getElementById('moves');
    const timeElement = document.getElementById('time');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const solveBtn = document.getElementById('solve-btn');
    const difficultySelect = document.getElementById('difficulty');
    const imageSelectors = document.querySelectorAll('.puzzle-img');
    const uploadInput = document.getElementById('upload-img');
    const highScoresList = document.getElementById('high-scores-list');

    let game = new Game(3);
    let ui = new UI(game, gameBoard, movesElement, timeElement, highScoresList);

    ui.renderBoard();
    ui.renderHighScores();

    shuffleBtn.addEventListener('click', () => {
        game.shuffle();
        ui.renderBoard();
        ui.startTimer();
    });

    solveBtn.addEventListener('click', async () => {
        solveBtn.disabled = true;
        solveBtn.textContent = 'Solving...';
        const solver = new Solver(game);
        const moves = solver.solve();
        if (moves) {
            for (const move of moves) {
                game.moveTile(move.to.row, move.to.col);
                ui.renderBoard();
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        } else {
            alert('No solution found!');
        }
        solveBtn.disabled = false;
        solveBtn.textContent = 'Solve';
    });

    gameBoard.addEventListener('click', (event) => {
        ui.handleTileClick(event);
    });

    difficultySelect.addEventListener('change', () => {
        const size = parseInt(difficultySelect.value);
        game = new Game(size);
        ui = new UI(game, gameBoard, movesElement, timeElement);
        ui.renderBoard();
        ui.stopTimer();
    });

    imageSelectors.forEach(img => {
        img.addEventListener('click', () => {
            ui.imageSrc = img.src;
            ui.renderBoard();
            document.querySelector('.puzzle-img.selected')?.classList.remove('selected');
            img.classList.add('selected');
        });
    });

    uploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                ui.imageSrc = e.target.result;
                ui.renderBoard();
                document.querySelector('.puzzle-img.selected')?.classList.remove('selected');
            };
            reader.readAsDataURL(file);
        }
    });
});