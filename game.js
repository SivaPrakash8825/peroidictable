const container = document.querySelector(".element-holder");
const rcontainer = document.querySelector(".table-container");
const playbtn = document.querySelector("#play");
const container2 = document.querySelector(".second-box");
const modes = document.querySelectorAll("#modes li");
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

modes.forEach((li) => {
  li.addEventListener("click", () => {
    settablemode(li.innerHTML);
    setmodeval(li.innerHTML);
    document.querySelector("#modes").classList.toggle("active");
  });
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
}

function settablemode(mode) {
  if (mode === "easy") {
    const con1 = container.querySelectorAll("#sym");
    const con = container.querySelectorAll("#number");
    const con2 = container2.querySelectorAll("#sym");
    const conn2 = container2.querySelectorAll("#number");
    con1.forEach((li) => {
      if (li.classList.contains("active")) {
        li.classList.remove("active");
      }
    });
    con.forEach((li) => {
      if (li.classList.contains("active")) {
        li.classList.remove("active");
      }
    });
    con2.forEach((li) => {
      if (li.classList.contains("active")) {
        li.classList.remove("active");
      }
    });
    conn2.forEach((li) => {
      if (li.classList.contains("active")) {
        li.classList.remove("active");
      }
    });
  } else if (mode === "medium") {
    const con1 = container.querySelectorAll("#sym");
    const con = container.querySelectorAll("#number");
    const con2 = container2.querySelectorAll("#sym");
    const conn2 = container2.querySelectorAll("#number");
    con1.forEach((li) => {
      if (!li.classList.contains("active")) li.classList.add("active");
    });
    con.forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    });
    con2.forEach((li) => {
      if (!li.classList.contains("active")) li.classList.add("active");
    });
    conn2.forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    });
  } else if (mode === "difficult") {
    const con1 = container.querySelectorAll("#sym");
    const con = container.querySelectorAll("#number");
    const con2 = container2.querySelectorAll("#sym");
    const conn2 = container2.querySelectorAll("#number");
    con1.forEach((li) => {
      if (!li.classList.contains("active")) {
        li.classList.add("active");
      }
    });
    con.forEach((li) => {
      if (!li.classList.contains("active")) {
        li.classList.add("active");
      }
    });
    con2.forEach((li) => {
      if (!li.classList.contains("active")) {
        li.classList.add("active");
      }
    });
    conn2.forEach((li) => {
      if (!li.classList.contains("active")) {
        li.classList.add("active");
      }
    });
  }
}

function setmodeval(val) {
  modebtn.innerHTML = val;
}

const modebtn = document.querySelector("#mode");
const modesbtn = document.querySelector("#modes");
modebtn.addEventListener("click", () => {
  document.querySelector("#modes").classList.toggle("active");
});
const startpara = document.querySelector(".mode-holder p");
let gameid = 0;
playbtn.addEventListener("click", () => {
  startpara.innerHTML = "GameStart:";
  playbtn.innerHTML = "Quit";
  modesbtn.classList.add("active");
  score.classList.toggle("active");
  modebtn.classList.toggle("active");
  ques.classList.toggle("active");

  gameid++;
  if (gameid == 2) {
    location.reload(true);
  }
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
  let rand = Math.floor(Math.random() * 118) + 1;
  const data = await fetchrandomdata(rand);
  randques.innerHTML = data.name;
  gamestart();
}

function gamestart() {
  const eleval = rcontainer.querySelectorAll(".elements");

  eleval.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      val = btn.getAttribute("id");
      console.log(val);
      if (val === randques.innerHTML) {
        scorerating = scorerating + 100;

        rate.innerHTML = scorerating;

        btn.classList.add("success");
        console.log("suceen");
        setcolorval(scorerating);
        generaterandval();
      } else {
        scorerating = scorerating - 100;
        if (scorerating < 0) {
          rate.style.color = "red";
        }
        btn.classList.add("failed");
        rate.innerHTML = scorerating;
        btn.style.background = "red";
      }
    });
  });
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
  setlshighscore();
}
const high = document.querySelector("#highscore");
async function setlshighscore(curscore) {
  if (curscore > high.innerHTML) {
    localStorage.setItem("highscore", curscore);

    sethightscore();
  }
}

function sethightscore() {
  let lsdata = localStorage.getItem("highscore");

  high.innerHTML = lsdata;
}
