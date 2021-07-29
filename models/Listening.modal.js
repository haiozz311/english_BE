const mongoose = require("mongoose");
const ListenSchema = mongoose.Schema({
  wordID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Word",
  },
  answer: { type: String, required: true },
  isExact: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Listen = mongoose.model("Listen", ListenSchema, "Listen");
module.exports = {
  ListenSchema,
  Listen,
};
