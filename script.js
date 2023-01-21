const container = document.querySelector(".element-holder");
const container2 = document.querySelector(".second-box");
const selectbox = document.querySelector(".sactive");
const search = document.querySelector(".searchbtn button");
const contents = document.querySelector(".backholder");
const popcontainer = document.querySelector(".popcontainer");
const preloader = document.getElementById("preloader");
const statebtn = document.querySelector(".statelist");
const lable = document.querySelector(".in-val label");
const danger = document.getElementById("danger");
window.addEventListener("load", () => {
  preloader.style.display = "none";
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

      html += `<div class="elements ${ele.groupBlock} x${ele.atomicNumber}" id=${ele.name}>
      <p>${ele.atomicNumber}</p>
      <p id=sym>${ele.symbol}</p>\
      <p>${ele.name}</p>
      </div>`;
    } else {
      if (ele.atomicNumber == 57 || ele.atomicNumber == 89) {
        html2 += "<div id=seven>*</div>";
      }
      html2 += `<div class="elements ${ele.groupBlock}" id=${ele.name}>
      <p>${ele.atomicNumber}</p>
      <p id=sym>${ele.symbol}</p>
      <p>${ele.name}</p></div>`;
    }
  });

  container.innerHTML = html;
  container2.innerHTML = html2;
  setpopup();
}

const btns = document.querySelectorAll(".contents .content #forhead");

async function getdatabyatname(val) {
  try {
    const posts = await fetch(
      `https://neelpatel05.pythonanywhere.com/element/atomicname?atomicname=${val}`
    );
    const data = await posts.json();
    if (data.atomicNumber === undefined) {
      throw "error";
    }
    go = true;
    return data;
  } catch (e) {
    danger.innerHTML = `invalid input ${val}`;
    go = false;
  }
}
async function getdatabynumber(val) {
  try {
    const posts = await fetch(
      `https://neelpatel05.pythonanywhere.com/element/atomicnumber?atomicnumber=${val}`
    );
    const data = await posts.json();
    if (data.atomicNumber === undefined) {
      throw "error";
    }
    go = true;
    return data;
  } catch (e) {
    danger.innerHTML = `invalid input ${val}`;
    go = false;
  }
}

async function getdatabysymbol(val) {
  try {
    const posts = await fetch(
      `https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${val}`
    );
    const data = await posts.json();
    if (data.atomicNumber === undefined) {
      throw "error";
    }
    go = true;
    return data;
  } catch (e) {
    danger.innerHTML = `invalid input ${val}`;
    go = false;
  }
}

let val = "";
const selector = document.querySelector("#selector");
selector.addEventListener("change", () => {
  findselectlist();
});
function findselectlist() {
  const lab = document.querySelector(".list");
  const inval = document.querySelector(".in-val label");

  let ls = document.querySelector(".in-val input");

  ls.value = "";
  val = lab.value;
  if (ls.classList.contains("active")) {
    ls.classList.remove("active");
    inval.classList.remove("active");
    statebtn.classList.add("active");
  }
  if (val === "state") {
    showstatelist();
  }
  inval.innerHTML = `Enter ${lab.value}`;

  return val;
}

let go = true;
search.addEventListener("click", async () => {
  const inval = document.querySelector(".in-val input").value;
  const sel = findselectlist();

  //console.log(sel);
  if (sel === "atomic number") {
    const data = await getdatabynumber(inval);
    if (go) {
      setatomicname(data);
    }
  } else if (sel === "atomic name") {
    const data = await getdatabyatname(inval);
    if (go) setatomicname(data);
  } else if (sel === "symbol") {
    const data = await getdatabysymbol(inval);
    if (go) setatomicname(data);
  } else if (sel === "state") {
    const data = showstatelist();
    // console.log(data);
    if (go) showstatecontent(data);
  } else {
    const data = await getdatabynumber(inval);
    if (go) {
      setatomicname(data);
    }
  }
});

const inputs = document.querySelector(".in-val input");
inputs.addEventListener("keydown", () => {
  document.querySelector(".in-val label").innerHTML = "";
});

function setatomicname(ele) {
  let html = "";

  html += `<div class="content">
  <div id="forhead"><div>
    <p>${ele.symbol}</p><p>${ele.name}</p>
  </div>
  <div><p>${ele.atomicNumber}</p>
    <p>${ele.groupBlock}</p></div>
  </div>
  
</div>`;
  const forcon = document.createElement("div");
  forcon.classList.add("forcon");
  forcon.classList.add("active");
  contents.innerHTML = html;
  const content = contents.querySelector(".content");
  //const keyval = contents.querySelector(".forcon");
  const keysel = Object.keys(ele);
  let eleval = "";
  for (let i = 0; i < keysel.length; i++) {
    eleval += `<ul>
    <li>${keysel[i]}</li>
    <li>${ele[keysel[i]]}</li>
    </ul>`;
  }
  forcon.innerHTML = eleval;
  content.appendChild(forcon);
  //keyval.innerHTML = eleval;
  document.querySelector("#forhead").addEventListener("click", () => {
    forcon.classList.toggle("active");
  });
}

function showstatelist() {
  statebtn.classList.remove("active");
  inputs.classList.add("active");
  lable.classList.add("active");
  let dat = statebtn.value;
  //console.log(dat);
  return dat;
}

async function fetchdatabystate(state) {
  const posts = await fetch(
    `https://neelpatel05.pythonanywhere.com/element/state?state=${state}`
  );
  const data = await posts.json();
  return data;
}

const states = document.querySelector("#state");
states.addEventListener("change", () => {
  showstatelist();
});

async function showstatecontent(state) {
  const data = await fetchdatabystate(state);
  setcontentdata(data);
}

function setcontentdata(data) {
  let val = "";
  for (let i = 0; i < data.length; i++) {
    val += `<div class="content">
    <div id="forhead"><div>
      <p>${data[i].symbol}</p><p>${data[i].name}</p>
    </div>
    <div><p>${data[i].atomicNumber}</p>
      <p>${data[i].groupBlock}</p></div>
    </div>
    <div class="forcon active">
    </div>
  </div>`;
  }
  contents.innerHTML = val;
  showdetails(data);
}

function showdetails(data) {
  const content = contents.querySelectorAll(".forcon");
  let i = 0;

  console.log();
  content.forEach((con) => {
    let len = Object.keys(data[i]);
    let eleval = "";
    for (let j = 0; j < len.length; j++) {
      eleval += `<ul>
    <li>${len[j]}</li>
    <li>${data[i][len[j]]}</li>
    </ul>`;
    }
    con.innerHTML = eleval;
    i++;
  });

  const forhead = contents.querySelectorAll("#forhead");
  forhead.forEach((event) => {
    event.addEventListener("click", () => {
      let getcon = event.parentNode;
      getcon.querySelector(".forcon").classList.toggle("active");
    });
  });
}

function setpopup() {
  const box1 = container.querySelectorAll(".elements");
  const box2 = container2.querySelectorAll(".elements");
  box1.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const data = await getdatabyatname(btn.getAttribute("id"));

      showpopup(data, btn);
    });
  });
  box2.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const data = await getdatabyatname(btn.getAttribute("id"));

      showpopup(data, btn);
    });
  });
}

function showpopup(data, btn) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  let color = btn.getAttribute("class");
  let val = "";
  val += `<div class="subpop">
  <i class="ri-close-circle-line" id="close"></i>
  <div class="maininfo ${color}">
    <p>${data.atomicNumber}</p>
    <p>${data.symbol}</p>
    <p>${data.name}</p>
    <p>${data.groupBlock}</p>
  </div>
  <div class="eledetails">
    
  </div>`;
  popup.innerHTML = val;

  const eledetails = popup.querySelector(".eledetails");
  const keysel = Object.keys(data);
  let eleval = "";
  for (let i = 0; i < keysel.length; i++) {
    eleval += `<ul>
    <li>${keysel[i]}</li>
    <li>${data[keysel[i]]}</li>
    </ul>`;
  }
  eledetails.innerHTML = eleval;
  popcontainer.appendChild(popup);
  const close = popup.querySelector("#close");
  close.addEventListener("click", () => {
    popcontainer.removeChild(popup);
  });
}
