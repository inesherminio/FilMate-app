const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profilePic: {
    type: String,
    default: "images/avatar.png",
  },
  interests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Interest",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "Connection",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
