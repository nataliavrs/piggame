"use script";

let currentScores = document.querySelectorAll(".current-score");
let player = document.querySelectorAll(".player");
let points = document.querySelectorAll(".points");
let currentScore = 0;
let currentPlayer = 0;

// Roll dice
document.getElementById("dice").addEventListener("click", function () {
  if (Number(points[currentPlayer].innerHTML) >= 20) {
    console.log(`Player ${currentPlayer + 1} wins!`);
  } else {
    //   Random number
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    //   Show dice face image
    const diceImg = document.getElementById("dice-img");
    diceImg.src = `images/dice-${randomNumber}.png`;
    diceImg.classList.remove("hide");
    console.log("roll dice", randomNumber);
    //   Add points to current player's score
    currentScores[currentPlayer].innerHTML = currentScore += randomNumber;

    //   If rolls "1" loses current points and skips turn
    if (randomNumber === 1 && currentPlayer === 0) {
      currentPlayer = 1;
      currentScore = 0;
      player[0].classList.remove("active-player");
      player[1].classList.add("active-player");
      currentScores[0].innerHTML = 0;
      console.log("player 1", currentPlayer);
    } else if (randomNumber === 1 && currentPlayer === 1) {
      currentPlayer = 0;
      currentScore = 0;
      player[1].classList.remove("active-player");
      player[0].classList.add("active-player");
      currentScores[1].innerHTML = 0;
      console.log("player 2", currentPlayer);
    }
  }
});

// Hold points
document.getElementById("hold").addEventListener("click", function () {
  console.log("hold points");
  points[currentPlayer].innerHTML =
    Number(points[currentPlayer].innerHTML) + currentScore;
  currentScore = 0;
  currentScores[currentPlayer].innerHTML = currentScore;

  if (Number(points[currentPlayer].innerHTML) >= 20) {
    console.log(`Player ${currentPlayer + 1} wins!`);
  } else {
    if (currentPlayer === 0) {
      currentPlayer = 1;
      player[0].classList.remove("active-player");
      player[1].classList.add("active-player");
    } else {
      currentPlayer = 0;
      player[1].classList.remove("active-player");
      player[0].classList.add("active-player");
    }
  }
});

// New game
document.getElementById("restart").addEventListener("click", function () {
  currentPlayer = 0;
  currentScore = 0;
  points[0].innerHTML = currentScore;
  points[1].innerHTML = currentScore;
  currentScores[0].innerHTML = currentScore;
  currentScores[1].innerHTML = currentScore;
  player[1].classList.remove("active-player");
  player[0].classList.add("active-player");
});
