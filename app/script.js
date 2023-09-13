MyNotes = [];

function makeDiaryDiv(note) {
  const div = document.createElement("div");
  div.setAttribute("class", "note-card");
  div.setAttribute("id", `note-${note.id}`);
  const h2 = document.createElement("h2");
  h2.innerText = note["date"];
  const h3 = document.createElement("h3");
  h3.innerText = note["note"];

  const btn = document.createElement("button");
  const btnid = `button-${note["id"]}`;
  btn.setAttribute("id", btnid);
  btn.setAttribute("class", "btn");
  btn.innerText = "Delete";
  btn.addEventListener("click", function () {
    removenotes(note["id"]);
  });

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(btn);
  return div;
}

function appendToApp(diaryDiv) {
  const app = document.querySelector("#diary-entry");
  app.appendChild(diaryDiv);
}
function diaryForm() {
  const form = document.querySelector("#diary-form-id");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formDate = document.querySelector("#date").value;
    const notes = document.querySelector("#notes-text").value;
    const diary = {
      id: new Date().getTime(),
      date: formDate,
      note: notes,
    };
    addNotes(diary);
    form.reset();
  });
}
function addNotes(diary) {
  MyNotes.push(diary);
  dateSort();
  dateformat();
  saveToLocalStorage();
  updateUI();
}

function removenotes(noteId) {
  console.log("Deleting ", noteId);
  const filteredArray = MyNotes.filter((note) => note.id != noteId);
  MyNotes = filteredArray;
  saveToLocalStorage();
  updateUI();
}

function clearApp() {
  const app = document.querySelector("#diary-entry");
  app.innerHTML = "";
}

function updateUI() {
  clearApp();
  for (let i = 0; i < MyNotes.length; i++) {
    const diaryDiv = makeDiaryDiv(MyNotes[i]);
    appendToApp(diaryDiv);
  }
}
function saveToLocalStorage() {
  const str = JSON.stringify(MyNotes);
  localStorage.setItem("my-notes-list", str);
}
function getFromLocalStorage() {
  const str = localStorage.getItem("my-notes-list");
  if (!str) {
    MyNotes = [];
  } else {
    MyNotes = JSON.parse(str);
  }
}
function dateSort() {
  MyNotes.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}
let objectDate = new Date();

function dateformat() {
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let correctmonth = month + 1;
  let year = objectDate.getFullYear();
  let format4 = `${day}-${correctmonth}-${year}`;
  console.log(format4);
}

getFromLocalStorage();
diaryForm();
updateUI();
