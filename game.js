const rcontainer = document.querySelector(".table-container");
const playbtn = document.querySelector("#play");

const modes = document.querySelector("#modes");
const score = document.querySelector(".score");
const ques = document.querySelector(".ques");
const randques = document.querySelector("#rand-ques");
const rate = document.querySelector("#rate");
const preloader = document.getElementById("preloader");

const elements = rcontainer.querySelectorAll(".elements");
let arr = [];
function createarray() {
  arr = [];
  for (let i = 1; i <= 118; i++) {
    arr.push(i);
  }
}
createarray();

window.addEventListener("load", () => {
  preloader.style.display = "none";
});

let scorerating = 0;
modes.addEventListener("change", () => {
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
        <p class="active" id="par">${ele.name}</p>
        </div>`;
    } else {
      if (ele.atomicNumber == 57 || ele.atomicNumber == 89) {
        html2 += "<div id=seven>*</div>";
      }
      html2 += `<div class="elements gameelement" id=${ele.name}>
        <p id="number">${ele.atomicNumber}</p>
        <p id=sym>${ele.symbol}</p>
        <p class="active" id="par">${ele.name}</p>
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
let start = true;
const quit = document.querySelector("#quit");
const playagain = document.querySelector("#playagain");
playbtn.addEventListener("click", () => {
  generaterandval();

  startpara.innerHTML = "GameStart:";

  quit.classList.remove("active");
  playbtn.classList.add("active");
  modes.classList.toggle("active");
  score.classList.remove("active");
  ques.classList.toggle("active");
  rate.innerHTML = scorerating;
  // if (gameid === 1) {
  //   generaterandval();
  //   gamestart();
  // }
  // if (gameid % 2 == 0) {
  //   deletecolor();
  //   createarray();

  //   playbtn.innerHTML = "play again";
  //   startpara.innerHTML = "select mode:";
  //   ques.classList.toggle("active");
  //   modes.classList.toggle("active");
  //   scorerating = 0;
  //   start = false;
  //   stop = 1;
  //   gameid = 1;
  // } else {
  //   start = true;
  //
  //   gameid++;
  // }
});

quit.addEventListener("click", () => {
  check = false;
  scorerating = 0;
  deletecolor();
  createarray();
  modes.classList.remove("active");
  ques.classList.add("active");
  quit.classList.add("active");
  playagain.classList.remove("active");
});
playagain.addEventListener("click", () => {
  check = true;
  rate.innerHTML = scorerating;
  quit.classList.remove("active");
  ques.classList.remove("active");
  modes.classList.add("active");
  playagain.classList.toggle("active");
  generaterandval();
});

async function fetchrandomdata(val) {
  const post = await fetch(
    `https://neelpatel05.pythonanywhere.com/element/atomicnumber?atomicnumber=${val}`
  );
  const data = await post.json();
  return data;
}

async function generaterandval() {
  let rand = Math.floor(Math.random() * arr.length);

  console.log(arr[rand]);
  console.log(arr.length);
  console.log(arr);
  const data = await fetchrandomdata(arr[rand]);
  arr.splice(rand, 1);
  check = true;
  randques.innerHTML = data.name;
  gamestart();
}
let stop = 0;
let check = true;
function gamestart() {
  const eleval = rcontainer.querySelectorAll(".elements");

  console.log("prakash");
  check = true;
  for (let i = 0; i < eleval.length; i++) {
    eleval[i].addEventListener("click", (event) => {
      val = eleval[i].getAttribute("id");
      if (check && !eleval[i].classList.contains("failed")) {
        console.log("siv");
        if (val === randques.innerHTML) {
          scorerating = scorerating + 100;

          rate.innerHTML = scorerating;
          if (scorerating > 0) {
            rate.style.color = "green";
          }
          eleval[i].classList.add("success");
          setlshighscore(scorerating);
          setcolorval(scorerating);
          check = false;
          generaterandval();
        } else {
          scorerating = scorerating - 100;
          if (scorerating <= 0) {
            rate.style.color = "red";
          }

          eleval[i].classList.add("failed");
          rate.innerHTML = scorerating;
          eleval[i].style.background = "red";
        }
      }
    });
  }
  return 0;
}

function setcolorval() {
  const ele = rcontainer.querySelectorAll(".gameelement");
  ele.forEach((btn) => {
    const clas = btn.getAttribute("class");

    if (clas === "elements gameelement success") {
      btn.querySelector("#par").classList.remove("active");

      btn.style.background = "green";
    } else {
      btn.classList.remove("failed");
      btn.style.background = "white";
    }
  });
}

function deletecolor() {
  const ele = rcontainer.querySelectorAll(".gameelement");
  ele.forEach((btn) => {
    btn.classList.remove("success");
    btn.querySelector("#par").classList.add("active");
    btn.classList.remove("failed");
    btn.style.background = "white";
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
