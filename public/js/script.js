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

/* let edit = document.querySelectorAll(".edit-rank");
let rankForm = document.querySelectorAll(".select-rank");

edit.addEventListener("click", (event) => {
  console.log(event);
  rankForm.removeAttribute("disabled");
}); */
