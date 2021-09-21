const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  messages: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
