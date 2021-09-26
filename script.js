"use script";

let currentScores = document.querySelectorAll(".current-score");
let player = document.querySelectorAll(".player");
let points = document.querySelectorAll(".points");
let currentScore = 0;
let currentPlayer = 0;

// Roll dice
document.getElementById("dice").addEventListener("click", function () {
  //   Random number
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  //   Show dice face image
  const diceImg = document.getElementById("dice-img");
  diceImg.src = `images/dice-${randomNumber}.png`;
  console.log("roll dice", randomNumber);
  //   If rolls "1" loses current points and skips turn
  //   Add points to current
  currentScores[currentPlayer].innerHTML = currentScore += randomNumber;

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
});

// Hold points
document.getElementById("hold").addEventListener("click", function () {
  console.log("hold points");
  points[currentPlayer].innerHTML =
    Number(points[currentPlayer].innerHTML) + currentScore;
  currentScore = 0;
  currentScores[currentPlayer].innerHTML = currentScore;

  if (currentPlayer === 0) {
    currentPlayer = 1;
    player[0].classList.remove("active-player");
    player[1].classList.add("active-player");
  } else {
    currentPlayer = 0;
    player[1].classList.remove("active-player");
    player[0].classList.add("active-player");
  }
});
