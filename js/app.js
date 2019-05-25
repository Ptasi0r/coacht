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