/*
    MEMORIZER GAME

    Miles Eastwood --- Jan 2022

    A game to test your memory! What round can you get to?
    To play, press the Start Round button at the top of the screen.
    Watch the pattern, and repeat it by clicking on the squares in the same sequence.
*/

const startButton = document.querySelector("button");
const options = document.querySelectorAll(".option");
const sounds = document.querySelectorAll("audio");
const textBox = document.querySelector(".textbox");

let roundNum = 1;
let roundLen = 2;
let userSeq = [];
let seq = [];

options.forEach((opt) => opt.addEventListener("transitionend", removeTransOpt));
textBox.addEventListener("transitionend", removeTransText);

startButton.addEventListener("click", playRound);

function playRound() {
  startButton.removeEventListener("click", playRound);

  for (var i = 0; i < roundLen; i++) seq.push(Math.floor(Math.random() * 4));

  var i = 0;
  var int;

  // this plays the animation for the current sequence
  int = setInterval(() => {
    var s = sounds[seq[i]];
    s.pause();
    s.currentTime = 0;
    s.play();
    options[seq[i]].classList.add("playing");
    i += 1;
    if (i == seq.length) {
      sounds[seq[i - 1]].currentTime = 0;
      userSeq = [];
      options.forEach((opt) =>
        opt.addEventListener("click", makeOptionsPlayable)
      );
      clearInterval(int);
    }
  }, 500);
}

function endRound() {
  textBox.classList.add("input");
  if (!arrEqual(seq, userSeq)) {
    textBox.textContent = "You lost! Back to round one!";
    roundNum = 1;
  } else {
    textBox.textContent = "Nice one! On to the next round!";
    roundNum += 1;
  }
  options.forEach((opt) =>
    opt.removeEventListener("click", makeOptionsPlayable)
  );
  startButton.addEventListener("click", playRound);
  startButton.textContent = `Start Round ${roundNum}`;
  seq = [];
  userSeq = [];
  roundLen = roundNum + 1;
}

function removeTransOpt(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function removeTransText(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("input");
}

const makeOptionsPlayable = (e) => {
  var num = e.target.id;
  var s = sounds[idToNum(num)];
  s.pause();
  s.currentTime = 0;
  s.play();
  e.target.classList.add("playing");
  userSeq.push(idToNum(num));
  if (userSeq.length == roundLen) endRound();
};

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
