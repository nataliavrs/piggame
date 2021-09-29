"use script";

// TODO
/*
Refactor
*/

let currentScore = 0;
let currentPlayer = 0;
const winningPoints = 20;
const currentScores = document.querySelectorAll(".current-score");
const player = document.querySelectorAll(".player");
const playerTitle = document.querySelectorAll(".player-title");
const points = document.querySelectorAll(".points");
const banner = document.getElementById("banner");
banner.innerHTML = `Hit ${winningPoints} points to win! <span class="dismiss-banner">Dismiss</span>`;
const diceImg = document.getElementById("dice-img");

// Dismiss banner
document
  .querySelector(".dismiss-banner")
  .addEventListener("click", function () {
    banner.classList.add("hide");
  });

// Roll dice
document.getElementById("dice").addEventListener("click", function () {
  //   Generate a random number from 1 to 6
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  //   Show dice face image
  diceImg.src = `images/dice-${randomNumber}.png`;
  diceImg.classList.remove("hide");
  console.log("rolled dice", randomNumber);
  //   Add points to current player's score
  currentScores[currentPlayer].innerHTML = currentScore += randomNumber;
  //   If rolls "1" loses current points and skips turn
  if (randomNumber === 1) {
    currentScore = 0;
    player[currentPlayer].classList.remove("active-player");
    currentScores[currentPlayer].innerHTML = 0;
    if (currentPlayer === 0) {
      currentPlayer = 1;
      player[1].classList.add("active-player");
    } else {
      currentPlayer = 0;
      player[0].classList.add("active-player");
    }
  }
});

// Hold points
document.getElementById("hold").addEventListener("click", function () {
  points[currentPlayer].innerHTML =
    Number(points[currentPlayer].innerHTML) + currentScore;
  currentScore = 0;
  currentScores[currentPlayer].innerHTML = currentScore;

  if (Number(points[currentPlayer].innerHTML) >= winningPoints) {
    player[currentPlayer].classList.add("winner");
    playerTitle[currentPlayer].innerHTML = `Player ${
      currentPlayer + 1
    } wins! 🎉`;
    // Game is over
    document.getElementById("dice").disabled = true;
    document.getElementById("hold").disabled = true;
  } else {
    player[currentPlayer].classList.remove("active-player");
    if (currentPlayer === 0) {
      currentPlayer = 1;
      player[1].classList.add("active-player");
    } else {
      currentPlayer = 0;
      player[0].classList.add("active-player");
    }
  }
});

// New game
document.getElementById("restart").addEventListener("click", function () {
  player[currentPlayer].classList.remove("winner");
  playerTitle[currentPlayer].innerHTML = `Player ${currentPlayer + 1}`;
  currentPlayer = 0;
  currentScore = 0;
  points[0].innerHTML = currentScore;
  points[1].innerHTML = currentScore;
  currentScores[0].innerHTML = currentScore;
  currentScores[1].innerHTML = currentScore;
  player[1].classList.remove("active-player");
  player[0].classList.add("active-player");
  diceImg.classList.add("hide");
  document.getElementById("dice").disabled = false;
  document.getElementById("hold").disabled = false;
});
