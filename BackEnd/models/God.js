const mongoose = require("mongoose");

const GodSchema = new mongoose.Schema({
  _id: {
    type: Object,
    required: true,
  },
  name:{
    type: String
  },
  ability1: {
    type: Number,
    ref: "Ability",
  },
  ability2: {
    type: Number,
    ref: "Ability",
  },
  ability3: {
    type: Number,
    ref: "Ability",
  },
  ability4: {
    type: Number,
    ref: "Ability",
  },
  ability5: {
    type: Number,
    ref: "Ability",
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
  pantheon: {
    type: String
  }
});
const God = mongoose.model("god", GodSchema);
module.exports = God;
