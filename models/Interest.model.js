const { Schema, model } = require("mongoose");

const interestSchema = new Schema({
  activity: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Interest = model("Interest", interestSchema);

module.exports = Interest;
