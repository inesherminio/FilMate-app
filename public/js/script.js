document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("FilMate JS imported successfully!");
  },
  false
);

const myModal = document.getElementById("exampleModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.mdb.modal", () => {
  myInput.focus();
});
