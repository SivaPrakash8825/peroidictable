const rcontainer = document.querySelector(".table-container");
const playbtn = document.querySelector("#play");

const modes = document.querySelector("#modes");
const score = document.querySelector(".score");
const ques = document.querySelector(".ques");
const randques = document.querySelector("#rand-ques");
const rate = document.querySelector("#rate");
const preloader = document.getElementById("preloader");

const elements = rcontainer.querySelectorAll(".elements");

window.addEventListener("load", () => {
  preloader.style.display = "none";
});

let scorerating = 0;
modes.addEventListener("click", () => {
  settablemode(modes.value);
});

window.addEventListener("DOMContentLoaded", () => {
  createtable();
  sethightscore();
});
async function fetchalldata() {
  const posts = await fetch("https://neelpatel05.pythonanywhere.com");
  const data = await posts.json();
  return data;
}

async function createtable() {
  const box1 = document.createElement("div");
  box1.classList.add("element-holder");
  const box2 = document.createElement("div");
  box2.classList.add("second-box");

  const data = await fetchalldata();
  let html = "";
  let html2 = "";
  data.forEach((ele) => {
    if (
      (ele.atomicNumber >= 1 && ele.atomicNumber <= 56) ||
      (ele.atomicNumber >= 72 && ele.atomicNumber <= 88) ||
      (ele.atomicNumber >= 104 && ele.atomicNumber <= 118)
    ) {
      if (ele.atomicNumber == 2) {
        html += "<div id=first></div>";
      } else if (ele.atomicNumber == 5 || ele.atomicNumber == 13) {
        html += "<div id=second></div>";
      } else if (ele.atomicNumber == 72 || ele.atomicNumber == 104) {
        html += "<div id=forth>*</div>";
      }

      html += `<div class="elements gameelement" id=${ele.name}>
        <p id="number">${ele.atomicNumber}</p>
        <p id=sym>${ele.symbol}</p>
        <p></p>
        </div>`;
    } else {
      if (ele.atomicNumber == 57 || ele.atomicNumber == 89) {
        html2 += "<div id=seven>*</div>";
      }
      html2 += `<div class="elements gameelement" id=${ele.name}>
        <p id="number">${ele.atomicNumber}</p>
        <p id=sym>${ele.symbol}</p>
        <p></p>
        </div>`;
    }
  });

  box1.innerHTML = html;
  box2.innerHTML = html2;

  rcontainer.appendChild(box1);
  rcontainer.appendChild(box2);
  settablemode(modes.value);
}

function settablemode(mode) {
  const con1 = rcontainer.querySelectorAll("#sym");
  const num = rcontainer.querySelectorAll("#number");
  if (mode === "easy") {
    num.forEach((li) => {
      li.classList.remove("active");
    });
    con1.forEach((li) => {
      if (li.classList.contains("active")) {
        li.classList.remove("active");
      }
    });
  } else if (mode === "medium") {
    con1.forEach((li) => {
      if (!li.classList.contains("active")) li.classList.add("active");
    });
    num.forEach((li) => {
      li.classList.remove("active");
    });
  } else if (mode === "difficult") {
    con1.forEach((li) => {
      if (!li.classList.contains("active")) {
        li.classList.add("active");
      }
    });
    num.forEach((li) => {
      if (!li.classList.contains("active")) {
        li.classList.add("active");
      }
    });
  }
}

const startpara = document.querySelector(".mode-holder p");
let gameid = 1;
playbtn.addEventListener("click", () => {
  if (gameid === 1) {
    generaterandval();
  }
  if (gameid % 2 == 0) {
    deletecolor();
    playbtn.innerHTML = "play again";
    ques.classList.toggle("active");
    modes.classList.toggle("active");
    scorerating = 0;
    gameid++;
  } else {
    startpara.innerHTML = "GameStart:";
    playbtn.innerHTML = "Quit";
    modes.classList.toggle("active");
    score.classList.remove("active");
    ques.classList.toggle("active");
    rate.innerHTML = scorerating;
    gameid++;
  }
});

async function fetchrandomdata(val) {
  const post = await fetch(
    `https://neelpatel05.pythonanywhere.com/element/atomicnumber?atomicnumber=${val}`
  );
  const data = await post.json();
  return data;
}

async function generaterandval() {
  let rand = Math.floor(Math.random() * 118) + 1;
  const data = await fetchrandomdata(rand);
  console.log(rand);
  randques.innerHTML = data.name;
  gamestart();
}

function gamestart() {
  const eleval = rcontainer.querySelectorAll(".elements");
  let check = true;
  for (let i = 0; i < eleval.length; i++) {
    eleval[i].addEventListener("click", (event) => {
      val = eleval[i].getAttribute("id");
      if (check) {
        if (val === randques.innerHTML) {
          scorerating = scorerating + 100;

          rate.innerHTML = scorerating;

          eleval[i].classList.add("success");
          setlshighscore(scorerating);
          setcolorval(scorerating);

          generaterandval();
          check = false;
        } else {
          scorerating = scorerating - 100;
          if (scorerating < 0) {
            rate.style.color = "red";
          }
          eleval[i].classList.add("failed");
          rate.innerHTML = scorerating;
          eleval[i].style.background = "red";
        }
      }
    });
  }
}

function setcolorval() {
  const ele = rcontainer.querySelectorAll(".gameelement");
  ele.forEach((btn) => {
    const clas = btn.getAttribute("class");

    if (clas === "elements gameelement success") {
      btn.style.background = "green";
    } else {
      btn.classList.remove("failed");
      btn.style.background = "darkolivegreen";
    }
  });
}

function deletecolor() {
  const ele = rcontainer.querySelectorAll(".gameelement");
  ele.forEach((btn) => {
    btn.classList.remove("success");

    btn.classList.remove("failed");
    btn.style.background = "darkolivegreen";
  });
}
const high = document.querySelector("#highscore");
function setlshighscore(curscore) {
  if (curscore > high.innerHTML) {
    localStorage.setItem("highscore", curscore);

    sethightscore();
  }
}

function sethightscore() {
  let lsdata = localStorage.getItem("highscore");
  if (lsdata > 0) {
    high.innerHTML = lsdata;
  }
}
