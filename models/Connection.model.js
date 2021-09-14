const { Schema, model } = require("mongoose");

const connectionSchema = new Schema({
  friend: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Connection = model("Connection", connectionSchema);

module.exports = Connection;
