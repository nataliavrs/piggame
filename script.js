"use script";

let currentScores = document.querySelectorAll(".current-score");
let points = document.querySelectorAll(".points");
let currentScore = 0;

// Roll dice
document.getElementById("dice").addEventListener("click", function () {
  //   Random number
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  console.log("roll dice", randomNumber);
  //   Add points to current
  currentScores[0].innerHTML = currentScore += randomNumber;
});

// Hold points
document.getElementById("hold").addEventListener("click", function () {
  console.log("hold points");
  points[0].innerHTML = Number(points[0].innerHTML) + currentScore;
  currentScore = 0;
  currentScores[0].innerHTML = currentScore;
});
