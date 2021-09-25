document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("FilMate JS imported successfully!");
  },
  false
);

//Attempt to clear the submit input for the chat

/*function submitForm() {
  let form = document.querySelector("#message-form");
  form.submit();
  form.reset();
  return false;
}*/

let chatInput = document.querySelector(".chat-text-input");
let chatButton = document.querySelector(".send-message-btn");

chatButton.addEventListener("click", () => {
  console.log(chatInput.value);
  setTimeout(() => {
    chatInput.value = "";
  }, 100);
});
