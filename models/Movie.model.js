const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  title: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  image: {
    type: String,
  },
  genre: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
  },
  decision: {
    type: String,
    Enum: ["watch", "chill"],
  },
  rank: {
    type: Number,
  },
  alternative: {
    type: Schema.Types.ObjectId,
    ref: "Usermodel",
  },
});

const MovieModel = model("MovieModel", userSchema);

module.exports = MovieModel;
