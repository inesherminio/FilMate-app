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
