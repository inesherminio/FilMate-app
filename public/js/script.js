document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("FilMate JS imported successfully!");
  },
  false
);

var signUpModal = new bootstrap.Modal(
  document.getElementById("signUpModal"),
  {}
);

signUpModal.show();

var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});

myModal.show();
