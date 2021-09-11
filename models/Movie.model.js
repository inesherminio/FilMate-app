const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
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
      enum: ["Watch", "Chill"],
    },
    rank: {
      type: String,
      enum: [
        "Haven't watched it yet",
        "1 Star",
        "2 Stars",
        "3 Stars",
        "4 Stars",
        "5 Stars",
      ],
      default: "Haven't watched it yet",
    },
    alternativeOptions: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    alternative: {
      type: String,
    },
    movieId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
