
document.addEventListener('DOMContentLoaded', () => {
    const playerText = document.getElementById('playerText');
    const restartBtn = document.getElementById('restartBtn');
    const boxes = document.querySelectorAll('.box');
    const playerXScoreDisplay = document.getElementById('playerXScore');
    const playerOScoreDisplay = document.getElementById('playerOScore');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let playerXScore = 0;
    let playerOScore = 0;
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleBoxClick(e) {
        const index = e.target.dataset.index;
        if (gameState[index] === '' && gameActive) {
            gameState[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            if (checkWin()) {
                playerText.textContent = `Player ${currentPlayer} wins!`;
                updateScore();
                gameActive = false;
            } else if (checkDraw()) {
                playerText.textContent = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                playerText.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkDraw() {
        return gameState.every(cell => {
            return cell !== '';
        });
    }

    function checkWin() {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore++;
            playerXScoreDisplay.textContent = playerXScore;
        } else {
            playerOScore++;
            playerOScoreDisplay.textContent = playerOScore;
        }
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        playerText.textContent = `Player ${currentPlayer}'s turn`;
        boxes.forEach(box => {
            box.textContent = '';
        });
    }

    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });

    restartBtn.addEventListener('click', restartGame);
});
