"use script";

// TODO
/*
Refactor
*/

let currentScores = document.querySelectorAll(".current-score");
let player = document.querySelectorAll(".player");
let playerTitle = document.querySelectorAll(".player-title");
let points = document.querySelectorAll(".points");
let currentScore = 0;
let currentPlayer = 0;
let winningPoints = 20;
let banner = document.getElementById("banner");
banner.innerHTML = `Hit ${winningPoints} points to win! <span class="dismiss-banner">Dismiss</span>`;
const diceImg = document.getElementById("dice-img");

// Dismiss banner
// Roll dice
document
  .querySelector(".dismiss-banner")
  .addEventListener("click", function () {
    banner.classList.add("hide");
  });

// Roll dice
document.getElementById("dice").addEventListener("click", function () {
  if (Number(points[currentPlayer].innerHTML) >= winningPoints) {
    console.log(`Player ${currentPlayer + 1} wins!`);
    playerTitle[currentPlayer].innerHTML = `Player ${
      currentPlayer + 1
    } wins! 🎉`;
    console.log(`
    ROLL:
    CURRENT SCORE = ${currentScore}
    CURRENT PLAYER ${currentPlayer + 1} POINTS = ${
      points[currentPlayer].innerHTML
    }
      `);
  } else {
    //   Random number
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    //   Show dice face image
    diceImg.src = `images/dice-${randomNumber}.png`;
    diceImg.classList.remove("hide");
    console.log("roll dice", randomNumber);
    //   Add points to current player's score
    currentScores[currentPlayer].innerHTML = currentScore += randomNumber;
    //   If rolls "1" loses current points and skips turn
    if (randomNumber === 1 && currentPlayer === 0) {
      currentPlayer = 1;
      currentScore = 0;
      currentScores[0].innerHTML = 0;
      player[0].classList.remove("active-player");
      player[1].classList.add("active-player");
    } else if (randomNumber === 1 && currentPlayer === 1) {
      currentPlayer = 0;
      currentScore = 0;
      currentScores[1].innerHTML = 0;
      player[0].classList.add("active-player");
      player[1].classList.remove("active-player");
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
    // console.log(`Player ${currentPlayer + 1} wins!`);
    player[currentPlayer].classList.add("winner");
    playerTitle[currentPlayer].innerHTML = `Player ${
      currentPlayer + 1
    } wins! 🎉`;

    // // console.log(`
    // // HOLD:
    // // CURRENT SCORE = ${currentScore}
    // // CURRENT PLAYER ${currentPlayer + 1} POINTS = ${
    // //   points[currentPlayer].innerHTML
    // // }
    //   `);
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

  // console.log(`
  //   NEW GAME:
  //   CURRENT SCORE = ${currentScore}
  //   1 PLAYER POINTS = ${points[0].innerHTML}
  //   2 PLAYER POINTS = ${points[1].innerHTML}
  //     `);
});
