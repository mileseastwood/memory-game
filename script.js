/*
    MEMORIZER GAME

    Miles Eastwood --- Jan 2022
*/

const startButton = document.querySelector("button");
const optionOne = document.querySelector("#one");
const optionTwo = document.querySelector("#two");
const optionThree = document.querySelector("#three");
const optionFour = document.querySelector("#four");

const options = document.querySelectorAll(".option");
options.forEach((opt) => opt.addEventListener("transitionend", removeTrans));

let roundNum = 1;
let roundLen = 2;
let userSeq = [];
let seq = [];

const fun = (e) => playRound(roundLen);

const makeOptionsPlayable = (e) => {
  e.target.classList.add("playing");
  userSeq.push(idToNum(e.target.id));
  console.log(userSeq);
  if (userSeq.length == roundLen) endRound();
};

startButton.addEventListener("click", fun);

function playRound(n) {
  startButton.removeEventListener("click", fun);

  for (var i = 0; i < n; i++) {
    seq.push(Math.floor(Math.random() * 4));
  }

  var i = 0;
  var int;
  int = setInterval(() => {
    options[seq[i]].classList.add("playing");
    i += 1;
    if (i == seq.length) {
      userSeq = [];
      options.forEach((opt) =>
        opt.addEventListener("click", makeOptionsPlayable)
      );
      clearInterval(int);
    }
  }, 500);
}

function endRound() {
  if (!arrEqual(seq, userSeq)) {
    alert("You lost! Please try again");
    roundNum = 1;
  } else {
    alert("You win! On to the next round!");
    roundNum += 1;
  }
  options.forEach((opt) =>
    opt.removeEventListener("click", makeOptionsPlayable)
  );
  startButton.addEventListener("click", fun);
  startButton.textContent = `Start Round ${roundNum}`;
  seq = [];
  userSeq = [];
  roundLen = roundNum * 2;
}

function arrEqual(a1, a2) {
  for (var i = 0; i < roundLen; i++) {
    if (a1[i] != a2[i]) return false;
  }
  return true;
}

function idToNum(str) {
  switch (str) {
    case "one":
      return 0;
    case "two":
      return 1;
    case "three":
      return 2;
    case "four":
      return 3;
  }
}

function removeTrans(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}
