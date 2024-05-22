document.addEventListener('DOMContentLoaded', () => {
    let board = Array(9).fill(null);
    let isXNext = true;
  
    const squares = document.querySelectorAll('.square');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
  
    squares.forEach((square, index) => {
      square.addEventListener('click', () => handleSquareClick(index));
    });
  
    resetButton.addEventListener('click', resetGame);
  
    function handleSquareClick(index) {
      if (board[index] || calculateWinner(board)) return;
      board[index] = isXNext ? 'X' : 'O';
      isXNext = !isXNext;
      updateBoard();
      updateStatus();
    }
  
    function updateBoard() {
      squares.forEach((square, index) => {
        square.textContent = board[index];
        if (board[index] == 'X'){
            square.classList.add('x');
        } else if (board[index] == 'O'){
            square.classList.add('o');
        }
      });
    }
  
    function updateStatus() {
      const winner = calculateWinner(board);
      if (winner) {
        statusDisplay.textContent = `Winner: ${winner}`;
      } else if (board.every(Boolean)) {
        statusDisplay.textContent = 'Draw!';
      } else {
        statusDisplay.textContent = `Next player: ${isXNext ? 'X' : 'O'}`;
      }
    }
  
    function resetGame() {
      board = Array(9).fill(null);
      isXNext = true;
      updateBoard();
      updateStatus();
    }
  
    function calculateWinner(board) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }
  
    updateStatus();
  });
  