const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: { type: String, required: true },
  movieRelatedTo: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  atendees: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  link: String,
});

const Event = model("Event", eventSchema);

module.exports = Event;
