const mongoose = require("mongoose");

const GodSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  ability1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ability",
  },
  ability2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ability",
  },
  ability3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ability",
  },
  ability4: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ability",
  },
  ability5: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ability",
  },
  pros: {
    type: String,
  },
  cons: {
    type: String,
  },
  roles: {
    type: String,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  godCardUrl: {
    type: String,
  },
  godIconUrl: {
    type: String,
  },
  lore: {
    type: String,
  },
});

module.exports = God = mongoose.model("god", GodSchema);
