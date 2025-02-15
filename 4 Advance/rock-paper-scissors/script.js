let popup = document.querySelector("main section#rules");
let openRules = document.querySelector("button#rules");
let closeRules = document.querySelector("img#close");
let closeRules1 = document.querySelector("section#rules .close-rules");
let winnerPopup = document.querySelector(".winner-popup");

let patternImage = document.querySelector("img#bg-pattern");

let resetBtn = document.querySelector("button#reset");

let score = 0;
let scoreIndicator = document.querySelector(".score span");
scoreIndicator.innerText = score;

document.querySelector("button.score").addEventListener("click", () => {
  sound_click.currentTime = 0;
  sound_click.play();
  score = 0;
  scoreIndicator.innerText = score;
});

// Switch Mode
const switchMode = document.querySelector("button#switchMode");
let mode = 0; // Normal

switchMode.addEventListener("click", () => {
  sound_switch.play();

  if (mode) {
    switchMode.innerText = "Normal";
    mode = 0;
  } else {
    switchMode.innerText = "Advance";
    mode = 1;
  }
  modifyFunctions();
});

function modifyFunctions() {
  setPositions();
  if (mode) {
    patternImage.src = "./images/bg-pentagon.svg";
    document.querySelector("button.action#lizard").classList.remove("hide");
    document.querySelector("button.action#spock").classList.remove("hide");

    document.querySelector("main section#action").classList.add("advance");

    document.querySelector("img.rules-img").src =
      "./images/image-rules-bonus.svg";
    document.querySelector("img.logo").src = "./images/logo-bonus.svg";
  } else {
    patternImage.src = "./images/bg-triangle.svg";
    document.querySelector("button.action#lizard").classList.add("hide");
    document.querySelector("button.action#spock").classList.add("hide");

    document.querySelector("main section#action").classList.remove("advance");

    document.querySelector("img.rules-img").src = "./images/image-rules.svg";
    document.querySelector("img.logo").src = "./images/logo.svg";
  }
}

// Sound Effects
let sound_click = new Audio("sounds/click.mp3");
let sound_tie = new Audio("sounds/tie.mp3");
let sound_lose = new Audio("sounds/lose.mp3");
let sound_win = new Audio("sounds/win.mp3");
let sound_switch = new Audio("sounds/switch.mp3");
let sound_rules = new Audio("sounds/rules.mp3");

let background_music = new Audio("sounds/background.mp3");
background_music.loop = true;
background_music.volume = 0.3;
background_music.preload = "auto";
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchScore();
});

// Play the audio after user interaction (required for some browsers)
document.body.addEventListener("click", () => {
  if (!playing) {
    background_music.play();
  }
  playing = true;
});

function fetchScore() {
  let localScore = localStorage.getItem("score");

  console.log(localScore);
  if (localScore) {
    score = localScore;
    scoreIndicator.innerText = score;
  }
}

openRules.addEventListener("click", () => {
  sound_rules.play();
  popup.classList.remove("hide");
});
closeRules.addEventListener("click", () => {
  popup.classList.add("hide");
  sound_click.play();
});
closeRules1.addEventListener("click", () => {
  popup.classList.add("hide");
});

let actionBtns = document.querySelectorAll("button.action");
let houseBtn = document.querySelector("button.house");
let userSelected;

actionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sound_click.currentTime = 0;
    sound_click.play();

    switchMode.disabled = true;

    userSelected = btn;

    btn.style.right = "auto";
    btn.style.bottom = "auto";
    btn.style.transform = "translate(0, 0)";

    btn.style.top = "10%";
    btn.style.left = "-15%";
    btn.style.scale = 1.2;
    btn.classList.add("show");

    setTimeout(() => {
      houseBtn.style.scale = 1.2;
    }, 200);

    console.log(e.target.id);

    actionBtns.forEach((subBtns) => {
      subBtns.style.cursor = "default";
      subBtns.disabled = true;

      console.log(subBtns.id);
      if (subBtns.id.toLowerCase() == e.target.id.toLowerCase()) {
        return;
      } else {
        subBtns.style.visibility = "hidden";
      }
    });

    computerPic();

    patternImage.style.opacity = 0;
  });
});

function computerPic() {
  let computerChoise;

  if (!mode) {
    computerChoise = Math.floor(Math.random() * 3);
  } else {
    computerChoise = Math.floor(Math.random() * 5);
  }

  let srcArr = [
    "./images/icon-paper.svg",
    "./images/icon-scissors.svg",
    "./images/icon-rock.svg",
    "./images/icon-lizard.svg",
    "./images/icon-spock.svg",
  ];
  let colorArr = [
    "hsl(230, 89%, 65%)",
    "hsl(40, 84%, 53%)",
    "hsl(349, 70%, 56%)",
    "hsl(261, 72%, 63%)",
    "hsl(189, 58%, 57%)",
  ];

  let randomImg = document.createElement("img");
  randomImg.src = srcArr[computerChoise];

  houseBtn.classList.add("animate");

  setTimeout(() => {
    houseBtn.appendChild(randomImg);
    houseBtn.classList.add("show");

    userSelected.style.left = "-40%";
    houseBtn.style.right = "-40%";

    houseBtn.style.background = "#fff";
    houseBtn.style.transform = "translateY(0)";
    houseBtn.style.boxSizing = "content-box";
    houseBtn.style.cursor = "default";

    houseBtn.style.border = `3vmin solid ${colorArr[computerChoise]}`;

    let gameArr = ["paper", "scissor", "rock", "lizard", "spock"];
    let computerSelected = gameArr[computerChoise];
    checkWinner(userSelected.id, computerSelected);

    houseBtn.classList.remove("animate");
  }, 1500);
}

function checkWinner(user, computer) {
  let result;

  // Tie
  if (user == computer) {
    result = "Tie";
    sound_tie.currentTime = 0;
    sound_tie.play();

    resetBtn.style.color = "rgba(7, 9, 66, 0.89)";
  }
  // Paper
  else if (user == "paper" && computer == "scissor") {
    result = "You Lose";
  } else if (user == "paper" && computer == "rock") {
    result = "You Win";
  } else if (user == "paper" && computer == "lizard") {
    result = "You Lose";
  } else if (user == "paper" && computer == "spock") {
    result = "You Win";
  }
  // Scissor
  else if (user == "scissor" && computer == "paper") {
    result = "You Win";
  } else if (user == "scissor" && computer == "rock") {
    result = "You Lose";
  } else if (user == "scissor" && computer == "lizard") {
    result = "You Win";
  } else if (user == "scissor" && computer == "spock") {
    result = "You Lose";
  }
  // Rock
  else if (user == "rock" && computer == "paper") {
    result = "You Lose";
  } else if (user == "rock" && computer == "scissor") {
    result = "You Win";
  } else if (user == "rock" && computer == "lizard") {
    result = "You Win";
  } else if (user == "rock" && computer == "spock") {
    result = "You Lose";
  }
  // Lizard
  else if (user == "lizard" && computer == "paper") {
    result = "You Win";
  } else if (user == "lizard" && computer == "scissor") {
    result = "You Lose";
  } else if (user == "lizard" && computer == "rock") {
    result = "You Lose";
  } else if (user == "lizard" && computer == "spock") {
    result = "You Win";
  }
  // Spock
  else if (user == "spock" && computer == "paper") {
    result = "You Lose";
  } else if (user == "spock" && computer == "scissor") {
    result = "You Win";
  } else if (user == "spock" && computer == "rock") {
    result = "You Win";
  } else if (user == "spock" && computer == "lizard") {
    result = "You Lose";
  } else {
    result = "4O4";
  }

  if (result.toLowerCase() == "you win") {
    sound_win.currentTime = 0;
    sound_win.play();

    addScore();
    userSelected.classList.add("winner");

    resetBtn.style.color = "rgba(0, 114, 4, 0.86)";
  } else if (result.toLowerCase() == "you lose") {
    houseBtn.classList.add("winner");

    sound_lose.currentTime = 0;
    sound_lose.play();

    resetBtn.style.color = "rgba(200, 2, 2, 0.816)";
  }

  winnerPopup.querySelector("h2").innerText = result;
  winnerPopup.classList.remove("hide");
}

resetBtn.addEventListener("click", () => {
  sound_click.currentTime = 0;
  sound_click.play();
  reset();
});

function setPositions() {
  actionBtns.forEach((btn) => {
    if (!mode) {
      if (btn.id == "paper") {
        btn.style.right = "auto";
        btn.style.bottom = "auto";
        btn.style.transform = "translate(0, 0)";

        btn.style.top = "-10vmin";
        btn.style.left = "-10vmin";
      } else if (btn.id == "scissor") {
        btn.style.left = "auto";
        btn.style.bottom = "auto";
        btn.style.transform = "translate(0, 0)";

        btn.style.top = "-10vmin";
        btn.style.right = "-10vmin";
      } else if (btn.id == "rock") {
        btn.style.top = "auto";
        btn.style.right = "auto";

        btn.style.bottom = "0.8vmin";
        btn.style.left = "50%";
        btn.style.transform = "translateX(-50%)";
      }
    } else {
      if (btn.id == "paper") {
        btn.style.left = "auto";
        btn.style.bottom = "auto";
        btn.style.transform = "translate(0, 0)";

        btn.style.right = "-12vmin";
        btn.style.top = "3vmin";
      } else if (btn.id == "scissor") {
        btn.style.bottom = "auto";
        btn.style.right = "auto";

        btn.style.top = "-16vmin";
        btn.style.left = "50%";
        btn.style.transform = "translate(-50%, 0)";
      } else if (btn.id == "rock") {
        btn.style.left = "auto";
        btn.style.top = "auto";
        btn.style.transform = "translate(0, 0)";

        btn.style.right = "-5vmin";
        btn.style.bottom = "-12vmin";
      } else if (btn.id == "lizard") {
        btn.style.right = "auto";
        btn.style.top = "auto";
        btn.style.transform = "translate(0, 0)";

        btn.style.left = "-5vmin";
        btn.style.bottom = "-12vmin";
      } else if (btn.id == "spock") {
        btn.style.right = "auto";
        btn.style.bottom = "auto";
        btn.style.transform = "translate(0, 0)";

        btn.style.left = "-12vmin";
        btn.style.top = "3vmin";
      }
    }
  });
}

function reset() {
  // Result
  winnerPopup.classList.add("hide");

  // Bg Pattern
  patternImage.style.opacity = 1;

  // Action Buttons
  actionBtns.forEach((btn) => {
    btn.style.cursor = "pointer";
    btn.disabled = false;
    btn.style.visibility = "visible";

    btn.style.scale = 1;
    btn.classList.remove("show");

    setPositions();

    // House Button
    houseBtn.style.cursor = "wait";
    houseBtn.style.top = "10%";
    houseBtn.style.right = "-5%";
    houseBtn.style.transform = "translateY(3vmin)";
    houseBtn.style.boxSizing = "border-box";
    houseBtn.style.border = "3vmin solid rgba(49, 49, 11, 0)";
    houseBtn.style.background = "#00000039";
    houseBtn.innerHTML = "<span></span>";
    houseBtn.style.scale = 0;
    houseBtn.classList.remove("show");
  });

  popup.classList.add("hide");

  userSelected.classList.remove("winner");
  houseBtn.classList.remove("winner");

  switchMode.disabled = false;
}

const musicToggle = document.querySelector("#toggleMusic");

musicToggle.addEventListener("click", () => {
  sound_click.play();

  if (background_music.paused) {
    background_music.play();
    musicToggle.textContent = "🔊";
  } else {
    background_music.pause();
    musicToggle.textContent = "🔇";
  }
});

function addScore() {
  scoreIndicator.innerText = ++score;
  scoreIndicator.classList.add("add");

  localStorage.setItem("score", score);

  setTimeout(() => {
    scoreIndicator.classList.remove("add");
  }, 1800);
}

actionBtns.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "translateY(-4%)";

    if (mode == 1 && btn.id == "scissor") {
      btn.style.transform = "translate(-50%, -4%)";
    }
    if (mode == 0 && btn.id == "rock") {
      btn.style.transform = "translate(-50%, -4%)";
    }
  });
  btn.addEventListener("mouseout", () => {
    btn.style.transform = "translateY(0)";

    if (mode == 1 && btn.id == "scissor") {
      btn.style.transform = "translate(-50%, 0%)";
    }
    if (mode == 0 && btn.id == "rock") {
      btn.style.transform = "translate(-50%, 0%)";
    }
  });
});
