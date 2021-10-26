const mongoose = require("mongoose");

const AbilityTranslatedSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  URL: {
    type: String,
  },
  Summary: {
    type: String,
  },
  Description: {
    itemDescription: {
      cooldown: {
        type: String,
      },
      cost: {
        type: String,
      },
      description: {
        type: String,
      },
      menuItems: [
        {
          description: {
            type: String,
          },
          value: {
            type: String,
          },
        },
      ],
      rankItems: [
        {
          description: {
            type: String,
          },
          value: {
            type: String,
          },
        },
      ],
    },
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

module.exports = AbilityTranslated = mongoose.model(
  "abilityTranslated",
  AbilityTranslatedSchema
);
