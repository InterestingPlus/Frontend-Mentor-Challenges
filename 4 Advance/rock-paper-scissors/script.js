let popup = document.querySelector("main section#rules");
let openRules = document.querySelector("button#rules");
let closeRules = document.querySelector("img#close");
let closeRules1 = document.querySelector("section#rules .close-rules");

openRules.addEventListener("click", () => {
  popup.classList.remove("hide");
});
closeRules.addEventListener("click", () => {
  popup.classList.add("hide");
});
closeRules1.addEventListener("click", () => {
  popup.classList.add("hide");
});

let actionBtns = document.querySelectorAll("button.action");
let houseBtn = document.querySelector("button.house");
let userSelected;

actionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
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

    actionBtns.forEach((subBtns) => {
      subBtns.style.cursor = "default";
      subBtns.disabled = true;

      if (subBtns.id == e.target.id) {
        return;
      } else {
        subBtns.style.visibility = "hidden";
      }
    });

    computerPic();

    document.querySelector("img#bg-pattern").style.opacity = 0;
  });
});

function computerPic() {
  let computerChoise = Math.floor(Math.random() * 3);

  let srcArr = [
    "./images/icon-paper.svg",
    "./images/icon-scissors.svg",
    "./images/icon-rock.svg",
  ];
  let colorArr = [
    "hsl(230, 89%, 65%)",
    "hsl(40, 84%, 53%)",
    "hsl(349, 70%, 56%)",
  ];

  let randomImg = document.createElement("img");
  randomImg.src = srcArr[computerChoise];

  setTimeout(() => {
    houseBtn.appendChild(randomImg);
    houseBtn.classList.add("show");

    userSelected.style.left = "-30%";
    houseBtn.style.right = "-30%";

    houseBtn.style.background = "#fff";
    houseBtn.style.transform = "translateY(0)";
    houseBtn.style.boxSizing = "content-box";
    houseBtn.style.cursor = "default";

    houseBtn.style.border = `3vmin solid ${colorArr[computerChoise]}`;

    let gameArr = ["paper", "scissor", "rock"];
    let computerSelected = gameArr[computerChoise];
    checkWinner(userSelected.id, computerSelected);
  }, 1500);
}

function checkWinner(user, computer) {
  console.log(user, computer);

  let result;

  if (user == computer) {
    result = "Tie";
  } else if (user == "paper" && computer == "scissor") {
    result = "You Lose";
  } else if (user == "paper" && computer == "rock") {
    result = "You Win";
  } else if (user == "scissor" && computer == "paper") {
    result = "You Win";
  } else if (user == "scissor" && computer == "rock") {
    result = "You Lose";
  } else if (user == "rock" && computer == "paper") {
    result = "You Lose";
  } else if (user == "rock" && computer == "scissor") {
    result = "You Win";
  } else {
    result = "4O4";
  }

  let winnerPopup = document.querySelector(".winner-popup");
  winnerPopup.querySelector("h2").innerText = result;
  winnerPopup.classList.remove("hide");
}
