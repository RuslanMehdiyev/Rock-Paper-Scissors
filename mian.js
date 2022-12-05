const openModal = document.getElementById("openModal");
const rulesModal = document.querySelector(".rules");
const closeModal = document.querySelector(".closeModal");
const scissors = document.querySelector(".scissors");
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const startPage = document.getElementById("startPage");
const resultPage = document.getElementById("resultPage");
const icons = document.querySelectorAll(".icon");
const userSelect = document.getElementById("userIcon");
const houseSelect = document.getElementById("houseIcon");
const scoreContainer = document.querySelector(".score");
const score = document.getElementById("score");
const whoWin = document.getElementById("whoWin");
const playAgain = document.getElementById("playAgain");
const mainBG = document.getElementById("main");

openModal.addEventListener("click", () => {
  rulesModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  rulesModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target == rulesModal) {
    rulesModal.style.display = "none";
  }
});

const allChoices = ["scissors", "rock", "paper"];
score.innerHTML = window.localStorage.getItem("score");
icons.forEach((e) => {
  e.addEventListener("click", () => {
    let housePlayerIndex = Math.floor(Math.random() * 3);
    let housePlayerChoice = allChoices[housePlayerIndex];
    let userPlayerChoice = e.classList[1];
    startPage.style.display = "none";
    mainBG.style.backgroundImage = "none";
    resultPage.style.display = "flex";
    userSelect.classList.add(userPlayerChoice);
    let scoreTotal = +score.innerHTML;
    const showScoreTotal = () => {
      setTimeout(() => {
        score.innerHTML = scoreTotal;
        houseSelect.classList.add(housePlayerChoice);
        let scoreBG =
          scoreTotal < 0
            ? "rgb(255, 60, 60)"
            : scoreTotal == 0
            ? "white"
            : "rgb(89, 216, 255)";
        scoreContainer.style.backgroundColor = scoreBG;
      }, 1000);
    };
    if (userPlayerChoice == housePlayerChoice) {
      whoWin.innerHTML = "DRAW";
      showScoreTotal();
    } else if (
      (userPlayerChoice == "scissors" && housePlayerChoice == "rock") ||
      (userPlayerChoice == "rock" && housePlayerChoice == "paper") ||
      (userPlayerChoice == "paper" && housePlayerChoice == "scissors")
    ) {
      whoWin.innerHTML = "YOU LOSE";
      scoreTotal -= 1;
      fromLocalStorage(scoreTotal);
      showScoreTotal();
    } else {
      whoWin.innerHTML = "YOU WON";
      scoreTotal += 1;
      fromLocalStorage(scoreTotal);
      showScoreTotal();
    }
    playAgain.addEventListener("click", () => {
      startPage.style.display = "block";
      resultPage.style.display = "none";
      userSelect.classList.remove(userPlayerChoice);
      houseSelect.classList.remove(housePlayerChoice);
      mainBG.style.backgroundImage = "";
    });
  });
});
function fromLocalStorage(scoreCount) {
  window.localStorage.setItem("score", scoreCount);
}
