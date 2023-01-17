const container = document.querySelector(".element-holder");
const playbtn = document.querySelector("#play");
const container2 = document.querySelector(".second-box");
const modes = document.querySelectorAll("#modes li");
const score = document.querySelector(".score");
const ques = document.querySelector(".ques");
const randques = document.querySelector("#rand-ques");
const rate = document.querySelector("#rate");
const preloader = document.getElementById("preloader");

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
});
async function fetchalldata() {
  const posts = await fetch("https://neelpatel05.pythonanywhere.com");
  const data = await posts.json();
  return data;
}

async function createtable() {
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

  container.innerHTML = html;
  container2.innerHTML = html2;
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
  startpara.innerHTML = "Game Start : ";
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
  let rand = Math.floor(Math.random() * 118);
  const data = await fetchrandomdata(rand);

  randques.innerHTML = data.name;
  gamestart();
}

function gamestart() {
  const box1 = container.querySelectorAll(".elements");
  const box2 = container2.querySelectorAll(".elements");
  let val = "";
  box1.forEach((btn) => {
    btn.addEventListener("click", () => {
      val = btn.getAttribute("id");
      showresult(val, btn);
    });
  });

  box2.forEach((btn) => {
    btn.addEventListener("click", () => {
      val = btn.getAttribute("id");
      showresult(val, btn);
    });
  });
}

function showresult(val, btn) {
  if (val === randques.innerHTML) {
    scorerating = scorerating + 100;
    rate.innerHTML = scorerating;
    btn.classList.add("success");
    setcolorval();

    generaterandval();
  } else {
    scorerating = scorerating - 100;
    if (scorerating < 0) {
      rate.style.color = "red";
    }
    rate.innerHTML = scorerating;
    btn.style.background = "red";
  }
}
function setcolorval() {
  const box1 = container.querySelectorAll(".elements");
  const box2 = container2.querySelectorAll(".elements");
  box1.forEach((btn) => {
    if (btn.classList.contains("success")) {
      btn.style.background = "green";
    } else {
      btn.style.background = "darkolivegreen";
    }
  });

  box2.forEach((btn) => {
    if (btn.classList.contains("success")) {
      btn.style.background = "green";
    } else {
      btn.style.background = "darkolivegreen";
    }
  });
}
