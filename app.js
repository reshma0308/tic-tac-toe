const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector("#resetBtn");
const gameInfo = document.querySelector("#gameInfo");

let currentPlayer = "X";
let count = 0;
let gameOver = false;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Add visual feedback for hover effects
cells.forEach(cell => {
  cell.addEventListener('mouseenter', () => {
    if (cell.innerText === "" && !gameOver) {
      cell.style.transform = "translateY(-4px) scale(1.05)";
      cell.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)";
    }
  });
  
  cell.addEventListener('mouseleave', () => {
    if (cell.innerText === "") {
      cell.style.transform = "";
      cell.style.boxShadow = "";
    }
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].innerText !== "" &&
      cells[a].innerText === cells[b].innerText &&
      cells[b].innerText === cells[c].innerText
    ) {
      // Add winning class to winning cells
      cells[a].classList.add("winning");
      cells[b].classList.add("winning");
      cells[c].classList.add("winning");
      
      // Add winner class to game info
      gameInfo.classList.add("winner-message");
      gameInfo.innerText = `🎉 Player ${cells[a].innerText} wins! 🎉`;
      
      gameOver = true;
      cells.forEach(cell => cell.disabled = true);
      
      // Add confetti effect simulation
      setTimeout(() => {
        createConfetti();
      }, 500);
      
      return true;
    }
  }
  return false;
}

function checkDraw() {
  if (count === 9 && !gameOver) {
    gameInfo.innerText = "🤝 It's a draw! 🤝";
    gameInfo.style.color = "#ffd700";
    gameInfo.style.textShadow = "0 0 15px rgba(255, 215, 0, 0.6)";
  }
}

// Create confetti effect
function createConfetti() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '1000';
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }, i * 50);
  }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(${window.innerHeight + 10}px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.innerText === "" && !gameOver) {
      // Add click animation
      cell.style.transform = "scale(0.95)";
      setTimeout(() => {
        cell.style.transform = "";
      }, 150);
      
      cell.innerText = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());
      count++;
      
      if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameInfo.innerText = `Player ${currentPlayer}'s Turn`;
        gameInfo.style.color = currentPlayer === "X" ? "#ff6b6b" : "#4ecdc4";
        checkDraw();
      }
    }
  });
});

resetBtn.addEventListener("click", () => {
  // Add reset animation
  resetBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    resetBtn.style.transform = "";
  }, 150);
  
  currentPlayer = "X";
  count = 0;
  gameOver = false;
  
  // Reset all cells with animation
  cells.forEach((cell, index) => {
    setTimeout(() => {
      cell.innerText = "";
      cell.disabled = false;
      cell.classList.remove("x", "o", "winning");
      cell.style.transform = "scale(0.8)";
      setTimeout(() => {
        cell.style.transform = "";
      }, 200);
    }, index * 50);
  });
  
  // Reset game info
  setTimeout(() => {
    gameInfo.innerText = `Player ${currentPlayer}'s Turn`;
    gameInfo.classList.remove("winner-message");
    gameInfo.style.color = "rgba(255, 255, 255, 0.95)";
    gameInfo.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.3)";
  }, 400);
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    resetBtn.click();
  }
});

// Add focus styles for accessibility
resetBtn.addEventListener('focus', () => {
  resetBtn.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
  resetBtn.style.outlineOffset = '2px';
});

resetBtn.addEventListener('blur', () => {
  resetBtn.style.outline = '';
  resetBtn.style.outlineOffset = '';
});

// Initialize game with fade-in effect
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.8s ease-in-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
