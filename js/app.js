let addFrom = document.getElementById("addForm");
let evBtnAdd = document.getElementById("addBtn");
let closeAddForm = document.getElementsByClassName("closeAddForm")[0];
let typeForm = document.getElementById("choice");
let typeAddImg = document.getElementsByClassName("typeAddImg")[0];
let addFormBtn = document.getElementById("addFormBtn");
let events = [];


window.addEventListener('DOMContentLoaded', () => {
  let dataContainer = document.querySelector(".userInfo span");
  let date = new Date();
  let dateConv = month(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
  dataContainer.innerHTML = dateConv;
  loadEventFromLS();
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
  // console.log(inputs);

  try {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (!input.value || input.value == "") {
        throw "All fields must be filled!";
      }
    }

    if (events != null) {
      if (events.length > 4) {
        document.getElementById("eventsList").style.overflowY = "scroll";
      }
    }

    let newEvent = new Event(inputs[0].value, inputs[2].value, inputs[1].value, inputs[3].value, inputs[4].value);
    events.push(newEvent);
    events.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    localStorage.setItem("eventsList", JSON.stringify(events));
    refreshEventsList();

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

function addEventDOM(event, index) {
  let container = document.createElement("div");
  let infoContainer = document.createElement("div");
  container.className = "eventContainer border";
  infoContainer.className = "eventInfoContainer";

  let divImg = document.createElement("div");
  divImg.className = "eventImg"
  img = document.createElement("img");
  img.setAttribute('src', 'img/' + event.type + ".png");
  divImg.appendChild(img);
  infoContainer.appendChild(divImg);

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
  infoContainer.appendChild(divInfo);

  let edit = document.createElement("div");
  edit.classList = "eventBtn";
  edit.innerHTML = "<ion-icon name='create'></ion-icon> edit";
  edit.setAttribute("onClick", "editEvent(" + index + ")");
  infoContainer.appendChild(edit);
  container.appendChild(infoContainer);

  // let evDesc = document.createElement("div");
  // evDesc.className = "eventDescription";
  // evDesc.innerHTML = event.desc;
  // container.appendChild(evDesc);



  document.getElementById("eventsList").appendChild(container);
}

function refreshUpcomingEvent(event) {
  let cont = document.getElementById("upcomingEvent")
  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }
  let container = document.createElement("div");
  let infoContainer = document.createElement("div");
  container.className = "eventContainer border";
  infoContainer.className = "eventInfoContainer";

  let divImg = document.createElement("div");
  divImg.className = "eventImg"
  img = document.createElement("img");
  img.setAttribute('src', 'img/' + event.type + ".png");
  divImg.appendChild(img);
  infoContainer.appendChild(divImg);

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
  infoContainer.appendChild(divInfo);

  let edit = document.createElement("div");
  edit.classList = "eventBtn";
  edit.innerHTML = "<ion-icon name='create'></ion-icon> edit";
  edit.setAttribute("onClick", "editEvent(0)");
  infoContainer.appendChild(edit);
  container.appendChild(infoContainer);

  // let evDesc = document.createElement("div");
  // evDesc.className = "eventDescription";
  // evDesc.innerHTML = event.desc;
  // container.appendChild(evDesc);


  document.getElementById("upcomingEvent").appendChild(container);
}

// document.getElementsByClassName("deleteElement")[0].addEventListener('click', function removeEl() {
//   let deleteEv = confirm("Confirm delete event");
//   console.log(deleteEv)
//   if (deleteEv == true) {
//     if (index == 0) events.shift();
//     if (index > 1) events.splice(index, 1);
//   }
//   events.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
//   localStorage.setItem("eventsList", JSON.stringify(events));
//   document.getElementsByClassName("deleteElement")[0].removeEventListener('click', removeEl());
//   if (events.length > 0) refreshEventsList();
// })

function editEvent(index) {
  let editForm = document.getElementById("editForm");
  editForm.style.display = "block";
  editForm.style.animation = "showEl 0.3s cubic-bezier(0.21, 1.09, 1, 1)";

  getDataFromEvent(events[index]);

  document.getElementsByClassName("deleteElement")[0].addEventListener('click', function _removeEl() {
    if (index == 0) events.shift();
    if (events.length == 2) {
      events.pop();
    }
    if (index > 1) events.splice(index, 1);
    events.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    if (events.length == 0) {
      localStorage.setItem("eventsList", null);
      location.reload();
    } else localStorage.setItem("eventsList", JSON.stringify(events));
    refreshEventsList();
    document.getElementsByClassName("deleteElement")[0].removeEventListener('click', _removeEl)
  })


  document.getElementById("editFormBtn").addEventListener('click', () => {
    document.getElementById('errorEditContainer').innerHTML = "";
    let inputs = document.querySelectorAll(".editFormEl:not(.input)");
    // console.log(inputs);

    try {
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (!input.value || input.value == "") {
          throw "All fields must be filled!";
        }
      }

      events[index].type = inputs[0].value
      events[index].date = inputs[1].value
      events[index].name = inputs[2].value
      events[index].place = inputs[3].value
      events[index].desc = inputs[4].value

      events.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
      localStorage.setItem("eventsList", JSON.stringify(events));
      refreshEventsList();

      document.getElementById("saved").style.animation = "notification 4s cubic-bezier(0.21, 1.09, 1, 1)";
      setTimeout(() => {
        document.getElementById("editForm").style.animation = "hideEl 0.5s cubic-bezier(0.21, 1.09, 1, 1)";
        document.getElementById("saved").style.animation = "";
        setTimeout(() => {
          document.getElementById("editForm").style.display = "none";
        }, 500);
      }, 4000)
    } catch (error) {
      document.getElementById('errorEditContainer').innerHTML = error;
    }
  });

  document.getElementsByClassName("closeAddForm")[1].addEventListener('click', () => {
    editForm.style.animation = "hideEl 0.5s cubic-bezier(0.21, 1.09, 1, 1)";
    setTimeout(() => {
      editForm.style.display = "none";
    }, 500);
  });
}

function getDataFromEvent(event) {
  let inputs = document.querySelectorAll(".editFormEl");
  // console.log(inputs);
  inputs[0].value = event.type;
  document.getElementsByClassName("typeAddImg")[1].setAttribute('src', 'img/' + event.type + ".png");
  inputs[1].value = event.date;
  inputs[2].value = event.date;
  inputs[3].value = event.name;
  inputs[4].value = event.place;
  inputs[5].value = event.desc;

}


function loadEventFromLS() {
  events = JSON.parse(localStorage.getItem("eventsList"));

  if (events == null || events.lenght == 0) {
    noEvents(0);
    noUpcomingEvent();
    events = [];
    return 0;
  } else {
    events.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    if (events.length == 1) {
      noEvents(1)
    }
    refreshUpcomingEvent(events[0]);
    for (i = 1; i < events.length; i++) {
      //posortowane wyżej 1 do upcomming a reszta niżej jeżeli nie ma to wiadomość tu i tu
      addEventDOM(events[i], i);
    }
  }
}

function refreshEventsList() {
  let container = document.getElementById("eventsList");
  console.log(container)
  console.log(events)
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  if (events.length == 0 || events == null) {
    noEvents();
    noUpcomingEvent();
    return;
  } else if (events.length == 1) {
    noEvents(1);
  }
  refreshUpcomingEvent(events[0]);
  if (events.length > 1) {
    for (i = 1; i < events.length; i++) {
      addEventDOM(events[i], i);
    }
  }
}

function noUpcomingEvent() {
  let p = document.createElement('p');
  p.innerHTML = "You don't have any upcoming event.";
  p.style.textAlign = "center";
  p.style.marginTop = "10px";
  document.getElementById("upcomingEvent").appendChild(p);
}

function noEvents(lenght) {
  let info = document.createElement('p');
  info.style.textAlign = "center";
  info.style.marginTop = "10px";
  info.style.fontSize = "14.4px";
  switch (lenght) {
    case 1:
      info.innerHTML = "You have ony one upcoming event.";
      break;

    default:
      info.innerHTML = "You don't have any events.";
      break;
  }
  document.getElementById("eventsList").appendChild(info);
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