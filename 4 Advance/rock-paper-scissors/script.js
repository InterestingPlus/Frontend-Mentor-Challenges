let popup = document.querySelector("main section#rules");
let openRules = document.querySelector("button#rules");
let closeRules = document.querySelector("img#close");
let closeRules1 = document.querySelector("section#rules .close-rules");

console.log(openRules);

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

actionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.style.right = "auto";
    btn.style.bottom = "auto";
    btn.style.transform = "translate(0, 0)";

    btn.style.top = "10%";
    btn.style.left = "-30%";
    btn.style.scale = 1.2;

    houseBtn.style.scale = 1.2;

    document.querySelector("img#bg-pattern").style.opacity = 0;
  });
});
