document.addEventListener(
  "DOMContentLoaded",
  () => {
    const movieChatDiv = document.getElementById("movie-chat");
    if (movieChatDiv) {
      const movieId = movieChatDiv.getAttribute("data-movie-id");
      const socket = io();
      socket.emit("join", movieId);
      socket.on("recievedChat", ({ chatText, username }) => {
        // create a new div element
        const newMessageElement = document.createElement("p");
        const userNameElement = document.createElement("strong");

        // and give it some content
        const newContent = document.createTextNode(chatText);
        const userNameTextNode = document.createTextNode(`${username}:`);

        // add the text node to the newly created div
        userNameElement.appendChild(userNameTextNode);
        newMessageElement.appendChild(userNameElement);
        newMessageElement.appendChild(newContent);

        // add the newly created element and its content into the DOM
        const movieChatMessages = document.getElementById(
          "movie-chat-messages"
        );
        movieChatMessages.appendChild(newMessageElement);
      });
      movieChatDiv
        .getElementsByTagName("form")[0]
        .addEventListener("submit", (event) => {
          event.preventDefault();
          socket.emit("chat", {
            chatText: event.target.elements.chatText.value,
            username: event.target.elements.username.value,
            movieId,
          });
        });
    }
  },
  false
);
