const mongoose = require("mongoose");

const queSchema = mongoose.Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  userID: { type: String, required: true },
  name: String,
  answer: { type: Array, default: [] },
  posted: { type: Date, default: Date.now },
});

const QueModel = mongoose.model("question", queSchema);

module.exports = {
  QueModel,
};
