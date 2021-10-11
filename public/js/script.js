document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("FilMate JS imported successfully!");
    let signUpModal = new bootstrap.Modal(
      document.getElementById("signUpModal"),
      {}
    );
    signUpModal.show();
  },
  false
);

let chatInput = document.querySelector(".chat-text-input");
let chatButton = document.querySelector(".send-message-btn");

chatButton.addEventListener("click", () => {
  console.log(chatInput.value);
  setTimeout(() => {
    chatInput.value = "";
  }, 100);
});
