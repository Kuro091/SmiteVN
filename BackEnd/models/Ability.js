const mongoose = require("mongoose");

const AbilitySchema = new mongoose.Schema({
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
});

module.exports = Ability = mongoose.model("ability", AbilitySchema);
