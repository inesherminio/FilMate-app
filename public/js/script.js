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

//Attempt to clear the submit input for the chat
/*
function submitForm() {
  let form = document.querySelector("#message-form");
  form.submit();
  form.reset();
  return false;
}

let chatInput = document.querySelectorAll(".chat-text-input");
let chatButton = document.querySelectorAll(".send-message-btn");

chatButton.addEventListener("click", () => {
  console.log("is this working?");
  chatInput.value = "";
});
*/
