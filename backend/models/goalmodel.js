const { text } = require("express");
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, " Add Text Value"],
    },
  },
  {
    timestamps:true,
  },
);

module.exports = mongoose.model("Goal", goalSchema);
