let lightMood = document.getElementById("lightMood");
let head = document.getElementById("head");
let toDarkMoodBtn = document.getElementById("toDarkMoodBtn");
let ulFooter = document.getElementById("ulFooter");
let backgroundImg = document.getElementById("backgroundImg");
// --------------------------------------------------------
let body = document.querySelector("body");
let mainInput = document.getElementById("mainInput");
let toDoListMainDiv = document.getElementById("toDoListMainDiv");
let toDoListDisplay = document.getElementById("toDoListDisplay");

let dragItem = document.querySelector('.dragItem');

let text = document.getElementById("text");
let attribution = document.getElementById("attribution");
let toDoList = [];
let toDoListCheck = [];
// --------------------------------------------------------
let toLightMoodBtn = document.getElementById("toLightMoodBtn");
let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");
let all2 = document.getElementById("all2");
let active2 = document.getElementById("active2");
let completed2 = document.getElementById("completed2");
let toDoStatus = "all";
let clearCompleted = document.getElementById("clearCompleted");
let drag = document.getElementById("drag");
let toDoListLi = document.getElementById("toDoListLi");
let ulfooter2 = document.getElementById("ulfooter2")
// --------------------------------------------------------

if (localStorage.getItem("toDoList") != null) {
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
  displayToDo();
} else {
  toDoList = [];
}
// --------------------------------------------------------

//---------------------------------------------------------
toLightMoodBtn.addEventListener("click", function () {
  toLightMoodBtn.classList.add("d-none");
  toDarkMoodBtn.classList.remove("d-none");
  backgroundImg.style.backgroundImage = "url(./images/bg-desktop-light.jpg)";
  backgroundImg.style.backgroundSize = "cover";
  body.style.backgroundColor = "white";
  mainInput.style.backgroundColor = "white";
  mainInput.style.borderColor = "white";
  mainInput.style.color = "black";
  ulfooter2.style.backgroundColor = "white";
  ulfooter2.style.color = "black";
  toDoListMainDiv.style.color = "hsl(235, 19%, 35%)";
  toDoListMainDiv.style.backgroundColor = "white";
  toDoListMainDiv.style.boxShadow = "0 4px 8px 0px rgba(184, 181, 181, 0.2), 0 6px 20px 5px rgba(186, 186, 186, 0.19)";
  ulfooter2.style.boxShadow = "0 4px 8px 0px rgba(184, 181, 181, 0.2), 0 6px 20px 5px rgba(186, 186, 186, 0.19)";
  attribution.style.color = "black";
  drag.style.color = "hsl(236, 9%, 61%)";
});

toDarkMoodBtn.addEventListener("click", function () {
  toLightMoodBtn.classList.remove("d-none");
  toDarkMoodBtn.classList.add("d-none");
  backgroundImg.style.backgroundImage = "url(./images/bg-desktop-dark.jpg)";
  backgroundImg.style.backgroundSize = "cover";
  body.style.backgroundColor = "hsl(235, 21%, 11%)";
  mainInput.style.backgroundColor = "hsl(237, 14%, 26%)";
  mainInput.style.borderColor = "hsl(237, 14%, 26%)";
  mainInput.style.color = "white";
  toDoListMainDiv.style.color = "hsl(234, 39%, 85%)";
  ulfooter2.style.color = "hsl(234, 39%, 85%)";
  toDoListMainDiv.style.backgroundColor = "hsl(235, 24%, 19%)";
  ulfooter2.style.backgroundColor = "hsl(235, 24%, 19%)";
  toDoListMainDiv.style.boxShadow = "0 4px 8px 0px rgba(4, 4, 4, 0.304), 0 6px 20px 5px rgba(13, 12, 12, 0.459)";
  ulfooter2.style.boxShadow = "0 4px 8px 0px rgba(4, 4, 4, 0.304), 0 6px 20px 5px rgba(13, 12, 12, 0.459)";
  attribution.style.color = "white";
  drag.style.color = "hsl(234, 11%, 52%)";
});

// -----------------------------------------------------------

mainInput.addEventListener("focusout", function addToDo() {
  console.log(mainInput.value);
  if (mainInput.value) {
    toDo = {
      todosub: mainInput.value,
      check: false,
    };

    toDoList.push(toDo);
    setInStorage();
    displayToDo();
    clearInput();
  } else {
    console.log("ahahahaha");
  }
});

function check(index) {
  var checkList = document.querySelectorAll(".checkbox");

  var checkValue = checkList[index].checked;
  toDoList[index].check = checkValue;

  console.log(toDoList);
  itemsLeft()
  setInStorage();
}

// -----------------------------------------------------------
function clearInput(data) {
  mainInput.value = data ? data : "";
}
//------------------------------------------------------------
all.addEventListener("click", function allToDo() {
  toDoStatus = "all";
  all.style.color = "hsl(220, 98%, 61%)";
  active.style.color = "hsl(236, 9%, 61%)";
  completed.style.color = "hsl(236, 9%, 61%)";
  displayToDo();
});
all2.addEventListener("click", function allToDo() {
  toDoStatus = "all";
  all2.style.color = "hsl(220, 98%, 61%)";
  active2.style.color = "hsl(236, 9%, 61%)";
  completed2.style.color = "hsl(236, 9%, 61%)";
  displayToDo();
});

active.addEventListener("click", function activeToDo() {
  toDoStatus = "active";
  active.style.color = "hsl(220, 98%, 61%)";
  all.style.color = "hsl(236, 9%, 61%)";
  completed.style.color = "hsl(236, 9%, 61%)";
  displayToDo();
});
active2.addEventListener("click", function activeToDo() {
  toDoStatus = "active";
  active2.style.color = "hsl(220, 98%, 61%)";
  all2.style.color = "hsl(236, 9%, 61%)";
  completed2.style.color = "hsl(236, 9%, 61%)";
  displayToDo();
});

completed.addEventListener("click", function completedToDo() {
  toDoStatus = "completed";
  completed.style.color = "hsl(220, 98%, 61%)";
  active.style.color = "hsl(236, 9%, 61%)";
  all.style.color = "hsl(236, 9%, 61%)";
  displayToDo();
});
completed2.addEventListener("click", function completedToDo() {
  toDoStatus = "completed";
  completed2.style.color = "hsl(220, 98%, 61%)";
  active2.style.color = "hsl(236, 9%, 61%)";
  all2.style.color = "hsl(236, 9%, 61%)";
  displayToDo();
});
//------------------------------------------------------------
clearCompleted.addEventListener("click", function deleteCompleted() {
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].check == true) {
      toDoList.splice(i, 1);
      i--;
      setInStorage();
      displayToDo();
    }
  }
});
// -----------------------------------------------------------
function itemsLeft() {
  let newToDoList = toDoList.filter((item) => item.check != true);
  let itemsLeftlength = newToDoList.length
  document.getElementById("itemsLeft").innerText = itemsLeftlength + " items left"
}
//------------------------------------------------------------  
// function dragStart(e) {
//   e.dataTransfer.setData("text" , e.target.id);
//   console.log(e.target.id);
// };
// function dragOver(e) {
//   e.preventDefault();
//   let reorderList = reorder(e.clientY);
//   const draggable = document.querySelector('.dragItem');
//   if (reorderList == null) {
//     toDoListDisplay.appendChild(draggable)
//   } else {
//     toDoListDisplay.insertBefore(draggable , reorderList)
//   }
//   console.log("drag over");
// };
// function reorder(y) {
//   const draggableItems = [...toDoListDisplay.querySelectorAll(".dragItem")];
//   return draggableItems.reduce((closest,liItems) => {
//     const box = liItems.getBoundingClientRect()
//     const offset = y - box.top - box.height / 2
//     if (offset < 0 && offset > closest.offset) {
//       return {offset: offset , element: liItems}
//     } else {
//       return closest
//     }
//   }, {offset: Number.NEGATIVE_INFINITY}).element
// }
// function drop(e) {
//   e.preventDefault();
//   let data = e.dataTransfer.getData("text");
//   let draggable = document.getElementById(data);
//   e.target.appendChild(draggable);
// }

// function reorder() {
//   new Sortable(toDoListDisplay);
//   setInStorage()
//   displayToDo()
// }
//------------------------------------------------------------
function displayToDo() {
  var cartona = ``;
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].check == true && (toDoStatus == "completed" || toDoStatus == "all")) {
      cartona += `<li class = "dragItem" id = "toDoListLi${i}"  draggable="true" >
            <input onclick="check(${i})" class = "checkbox" type="checkbox" checked >
            <span class="checkmark"></span>
            <span id = "text" class = "text">${toDoList[i].todosub}</span>
            <button class=" border-0 bg-transparent fw-lighter" onclick = "deleteToDo(${i})"><i class="Xicon">X</i></button>
            </li>`;
    }

    if (toDoList[i].check == false && (toDoStatus == "active" || toDoStatus == "all")) {
      cartona += `<li class = "dragItem" id = "toDoListLi${i}"  draggable="true" >
            <input onclick="check(${i})" class = "checkbox" type="checkbox" >
            <span class="checkmark"></span>
            <span id = "text" class = "text">${toDoList[i].todosub}</span>
            <button class=" border-0 text-info bg-transparent fw-lighter" onclick = "deleteToDo(${i})"><i class="Xicon">X</i></button>
            </li>`;
    }
  }
  itemsLeft()
  document.getElementById("toDoListDisplay").innerHTML = cartona;
}

// ------------------------------------------------------------
function deleteToDo(index) {
  toDoList.splice(index, 1);
  setInStorage();
  displayToDo();
}

// ------------------------------------------------------------

function setInStorage() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
