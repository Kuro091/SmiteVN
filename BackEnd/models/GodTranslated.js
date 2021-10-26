const mongoose = require("mongoose");

const GodTranslatedSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ability1: {
    type: Number,
    ref: "abilityTranslated",
  },
  ability2: {
    type: Number,
    ref: "abilityTranslated",
  },
  ability3: {
    type: Number,
    ref: "abilityTranslated",
  },
  ability4: {
    type: Number,
    ref: "abilityTranslated",
  },
  ability5: {
    type: Number,
    ref: "abilityTranslated",
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
  },
  translatedBy: [
    {
      user: {
        type: String,
        ref: "user",
      },
      name: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = GodTranslated = mongoose.model(
  "godTranslated",
  GodTranslatedSchema
);
