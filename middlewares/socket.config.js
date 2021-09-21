const { Server } = require("socket.io");
const Chat = require("../models/Chat.model");

module.exports = {
  withSocketIO: (httpServer) => {
    const io = new Server(httpServer, {
      /* options */
    });

    io.on("connection", (socket) => {
      socket.on("join", (movieId) => {
        socket.join(movieId);
      });
      socket.on("chat", ({ movieId, chatText, username }) => {
        io.to(movieId).emit("recievedChat", { chatText, username });
      });
    });
  },
};
