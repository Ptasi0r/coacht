window.addEventListener('DOMContentLoaded', () => {
  let dataContainer = document.querySelector(".userInfo span");
  let date = new Date();
  let dateConv = month(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();

  dataContainer.innerHTML = dateConv;
});

function month(month) {
  switch (month) {
    case 0:
      return "Jan";
      break;
    case 1:
      return "Feb";
      break;
    case 2:
      return "Mar";
      break;
    case 3:
      return "Apr";
      break;
    case 4:
      return "May";
      break;
    case 5:
      return "Jun";
      break;
    case 6:
      return "Jul";
      break;
    case 7:
      return "Aug";
      break;
    case 8:
      return "Sep";
      break;
    case 9:
      return "Oct";
      break;
    case 10:
      return "Nov";
      break;
    default:
      return "Dec";
      break;
  }
}

let addFrom = document.getElementById("addForm");
let evBtnAdd = document.getElementById("addBtn");
let closeAddForm = document.getElementsByClassName("closeAddForm")[0];
let typeForm = document.getElementById("choice");
let typeAddImg = document.getElementsByClassName("typeAddImg")[0];
let addFormBtn = document.getElementById("addFormBtn");
let events = [];
let Event = function (type, name, date, place, desc) {
  this.type = type;
  this.name = name;
  this.date = date;
  this.place = place;
  this.desc = desc;
};

evBtnAdd.addEventListener('click', () => {
  // evBtn.style.display="none";
  // let container = document.getElementById("container");

  addFrom.style.display = "block";
  addFrom.style.animation = "showEl 0.3s cubic-bezier(0.21, 1.09, 1, 1)";
});

typeForm.addEventListener('change', () => {
  if (typeForm.value) {
    typeAddImg.setAttribute('src', 'img/' + typeForm.value + ".png");
  }
})

closeAddForm.addEventListener('click', () => {
  addFrom.style.animation = "hideEl 0.5s cubic-bezier(0.21, 1.09, 1, 1)";
  setTimeout(() => {
    addFrom.style.display = "none";
  }, 500);
});

addFormBtn.addEventListener('click', () => {
  document.getElementById('errorContainer').innerHTML = "";
  let inputs = document.querySelectorAll(".addFormEl:not(.input)");
  console.log(inputs);

  try {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (!input.value || input.value == "") {
        throw "All fields must be filled!";
      }
    }

    let newEvent = new Event(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
    console.log(newEvent)

    events.push(newEvent);
    addEventDOM(newEvent);
    document.getElementById("added").style.animation = "notification 4s cubic-bezier(0.21, 1.09, 1, 1)";
    setTimeout(() => {
      addFrom.style.animation = "hideEl 0.5s cubic-bezier(0.21, 1.09, 1, 1)";
      document.getElementById("added").style.animation = "";
      setTimeout(() => {
        addFrom.style.display = "none";
      }, 500);
    }, 4000)
  } catch (error) {
    document.getElementById('errorContainer').innerHTML = error;
  }
});

function addEventDOM(event) {
  let container = document.createElement("div");
  container.className = "eventContainer border";

  let divImg = document.createElement("div");
  divImg.className = "eventImg"
  img = document.createElement("img");
  img.setAttribute('src', 'img/' + event.type + ".png");
  divImg.appendChild(img);
  container.appendChild(divImg);

  let divInfo = document.createElement("div");
  divInfo.className = "eventInfo";
  let date = document.createElement("p");
  date.className = "eventTime";
  if (moment(event.date).format("YYYY") > "2019") date.innerHTML = moment(event.date).format("DD MMM, YYYY - HH:mm");
  else date.innerHTML = moment(event.date).format("DD MMM - HH:mm");
  divInfo.appendChild(date);
  let info = document.createElement("p");
  info.className = "eventName";
  info.innerHTML = event.name;
  divInfo.appendChild(info);
  container.appendChild(divInfo);

  let edit = document.createElement("div");
  edit.classList = "eventBtn";
  edit.innerHTML = "<ion-icon name='create'></ion-icon> edit";
  container.appendChild(edit);

  document.getElementById("eventsList").appendChild(container);
}




$(".flatpickr").flatpickr({
  enableTime: true,
  time_24hr: true,
  altInput: true,
  // weekNumbers: true,
  minDate: "today",
  dateFormat: "Y-m-d H:i",
  altFormat: "M j, Y H:i",
  // locale: "pl"
  locale: {
    firstDayOfWeek: 1
  }
});



$("#choice").change(function () {
  if ($(this).val() == "0") $(this).addClass("empty");
  else $(this).removeClass("empty")
});
$("#choice").change();