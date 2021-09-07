const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    // unique: true -> Ideally, should be unique, but its up to you
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
  interests: [
    {
      type: String,
      max: 15,
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
