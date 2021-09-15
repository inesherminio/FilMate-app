document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("FilMate JS imported successfully!");
    var signUpModal = new bootstrap.Modal(
      document.getElementById("signUpModal"),
      {}
    );
    signUpModal.show();
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

let followBtnArr = document.getElementsByClassName("follow-btn");

followBtnArr.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(event);
  });
});
