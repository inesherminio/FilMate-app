const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  movieId: {
    type: String,
  },
  username: {
    type: String,
  },
  chatText: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
