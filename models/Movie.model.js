const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  image: {
    type: String,
  },
  genre: [
    {
      type: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  decision: {
    type: String,
    Enum: ["Watch", "Chill"],
  },
  rank: {
    type: Number,
  },
  alternative: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: String,
  },
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
