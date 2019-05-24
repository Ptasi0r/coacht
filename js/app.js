
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

let evBtn = document.getElementById("addBtn");


evBtn.addEventListener('click', () => {
    // evBtn.style.display="none";
    // let container = document.getElementById("container");
    let addFrom = document.getElementById("addForm");
    addFrom.style.display = "block";
    addFrom.style.animation = "showEl 0.3s cubic-bezier(0.21, 1.09, 1, 1)";
})