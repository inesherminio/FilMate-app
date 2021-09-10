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

let edit = document.getElementById("edit-rank");
let rankForm = document.getElementById("select-rank");

edit.addEventListener("click", () => {
  rankForm.removeAttribute("disabled");
});
