document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("FilMate JS imported successfully!");
  },
  false
);

/*let editBtnArr = document.querySelectorAll(".edit-rank");

editBtnArr.forEach((editBtn) => {
  editBtn.addEventListener("click", (event) => {
    let rankForm = document.getElementById(`select-rank-${event.target.id}`);
    console.log(rankForm);
    rankForm.removeAttribute("disabled");
  });
});*/

$(document).ready(function () {
  $("#example-popover").popover();
});
