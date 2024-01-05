
        // Initialize the game board
        const board = document.getElementById('board');
        const result = document.getElementById('result');
        const restartBtn = document.getElementById('restartBtn');
        let currentPlayer = '✖';
        let gameOver = false;

        const cells = [];

        function initializeBoard() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    cell.addEventListener('click', handleCellClick);
                    board.appendChild(cell);
                    cells.push(cell);
                }
            }
        }

        function handleCellClick(event) {
            if (gameOver) return;

            const cell = event.target;
            const row = cell.dataset.row;
            const col = cell.dataset.col;

            if (cell.textContent === '') {
                cell.textContent = currentPlayer;
                if (checkWinner(row, col)) {
                    result.textContent = `Player ${currentPlayer} wins!`;
                    gameOver = true;
                    showRestartButton();
                } else if (isBoardFull()) {
                    result.textContent = 'It\'s a draw!';
                    gameOver = true;
                    showRestartButton();
                } else {
                    currentPlayer = currentPlayer === '✖' ? 'Ｏ' : '✖';
                }
            }
        }

        function checkWinner(row, col) {
            return (
                checkLine(0, 0, 0, 1, 0, 2) || // Check row 0
                checkLine(1, 0, 1, 1, 1, 2) || // Check row 1
                checkLine(2, 0, 2, 1, 2, 2) || // Check row 2
                checkLine(0, 0, 1, 0, 2, 0) || // Check column 0
                checkLine(0, 1, 1, 1, 2, 1) || // Check column 1
                checkLine(0, 2, 1, 2, 2, 2) || // Check column 2
                checkLine(0, 0, 1, 1, 2, 2) || // Check diagonal \
                checkLine(0, 2, 1, 1, 2, 0)    // Check diagonal /
            );

            function checkLine(r1, c1, r2, c2, r3, c3) {
                return (
                    cells[index(r1, c1)].textContent !== '' &&
                    cells[index(r1, c1)].textContent === cells[index(r2, c2)].textContent &&
                    cells[index(r1, c1)].textContent === cells[index(r3, c3)].textContent
                );
            }

            function index(row, col) {
                return row * 3 + col;
            }
        }

        function isBoardFull() {
            return cells.every(cell => cell.textContent !== '');
        }

        function showRestartButton() {
            restartBtn.style.display = 'block';
        }

        function restartGame() {
            // Reset the game state
            currentPlayer = '✖';
            gameOver = false;
            result.textContent = '';
            restartBtn.style.display = 'none';

            // Clear the board
            cells.forEach(cell => {
                cell.textContent = '';
            });
        }

        // Initialize the game
        initializeBoard();