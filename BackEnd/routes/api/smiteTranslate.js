// Router
const router = require("express").Router();
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator");

// Model
const GodTranslate = require("../../models/God");
const AbilityTranslate = require("../../models/Ability");

// @route   GET api/smiteTranslate
// @desc    Get all translate data
// @access  Public

// @route   GET api/smiteTranslate/:id
// @desc    Get all translate data for a specific god
// @access  Private

// @route   POST api/smiteTranslate/add
// @desc    Add or update translate data of a god
// @access  Private
router.post(
  "/add",
  auth,
  [check("_id", "Gotta have id man")],
  async (req, res) => {
    try {
      const { abilities, god } = req.body;

      // Add abilities
      abilities.forEach(async (abi) => {
        let ability = await AbilityTranslate.findOne({ _id: abi._id });
        if (ability) {
          // Update
          ability = await AbilityTranslate.findOneAndUpdate(
            { _id: abi._id },
            { $set: abi },
            { new: true }
          );
          await ability.save();
        } else {
          ability = new AbilityTranslate(abi);
          await ability.save();
        }
      });

      // Add god
      god = new GodTranslate(god);
      await god.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Errors adding stuff");
    }
  }
);

module.exports = router;
