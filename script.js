"use script";

let currentScore;
let currentPlayer;
let playing;
const winningPoints = 100;
const currentScores = document.querySelectorAll(".current-score");
const player = document.querySelectorAll(".player");
const playerTitle = document.querySelectorAll(".player-title");
const points = document.querySelectorAll(".points");
const diceImg = document.getElementById("dice-img");
const banner = document.getElementById("banner");
banner.innerHTML = `
<h2>Game rules 😃</h2>
<ul>
<li>
   Roll the dice to accumulate points.
  </li>
  <li>
    Click on hold to add current points to your score.
  </li>
  <li>
    Rolling a 1 skips your turn and you lose the accumulated points. 
  </li>
  <li>
   First player to add ${winningPoints} points to their score wins.
  </li>
  <li class="developed">
    Developed with <i class="fas fa-heart"></i> 
  </li>
</ul>
<span class="dismiss-banner">Dismiss</span>
`;
const dismissBanner = document.querySelector(".dismiss-banner");
const showInfo = document.getElementById("info");
init();

// Starting game conditions
function init() {
  currentPlayer = 0;
  currentScore = 0;
  playing = true;
  playerTitle[0].innerHTML = `Player 1`;
  playerTitle[1].innerHTML = `Player 2`;
  player[0].classList.remove("winner");
  player[1].classList.remove("winner");
  points[0].innerHTML = currentScore;
  points[1].innerHTML = currentScore;
  currentScores[0].innerHTML = currentScore;
  currentScores[1].innerHTML = currentScore;
  diceImg.classList.add("hide");
  player[0].classList.add("active-player");
  player[1].classList.remove("active-player");
}

// Show info
showInfo.addEventListener("click", function () {
  console.log("show info");
  banner.classList.toggle("hide");
});

// Dismiss info banner
dismissBanner.addEventListener("click", function () {
  banner.classList.add("hide");
});

// Roll dice
document.getElementById("dice").addEventListener("click", function () {
  if (playing) {
    //   Generate a random number from 1 to 6
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    //   Show dice face image
    diceImg.src = `images/dice-${randomNumber}.png`;
    diceImg.classList.remove("hide");
    //   Add points to current player's score
    currentScores[currentPlayer].innerHTML = currentScore += randomNumber;
    //   If rolls "1" loses current points and skips turn
    if (randomNumber === 1) {
      currentScore = 0;
      currentScores[currentPlayer].innerHTML = 0;
      switchPlayers();
    }
  }
});

// Hold points
document.getElementById("hold").addEventListener("click", function () {
  if (playing) {
    points[currentPlayer].innerHTML =
      Number(points[currentPlayer].innerHTML) + currentScore;
    currentScore = 0;
    currentScores[currentPlayer].innerHTML = 0;
    // Game is over
    if (Number(points[currentPlayer].innerHTML) >= winningPoints) {
      playing = false;
      player[currentPlayer].classList.add("winner");
      playerTitle[currentPlayer].innerHTML = `Player ${
        currentPlayer + 1
      } wins! 🎉`;
    } else {
      switchPlayers();
    }
  }
});

// Switch Players
const switchPlayers = function () {
  player[currentPlayer].classList.remove("active-player");
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player[currentPlayer].classList.add("active-player");
};

// New game button
document.getElementById("restart").addEventListener("click", init);
