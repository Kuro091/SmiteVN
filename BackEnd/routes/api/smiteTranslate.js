// Model
const Ability = require("../../models/Ability");
const God = require("../../models/God");
const GodTranslated = require("../../models/GodTranslated");
const AbilityTranslated = require("../../models/AbilityTranslated");

// Router
const router = require("express").Router();
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator");

// @route   GET api/smiteTranslate
// @desc    Get all translate data
// @access  Public
router.get("/", async (req, res) => {
  try {
    const data = GodTranslated.find();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errors adding stuff");
  }
});

// @route   GET api/smiteTranslate/:id
// @desc    Get translate data for a specific god
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const data = GodTranslated.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ msg: "Translate data not found" });
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errors");
  }
});

// @route   GET api/smiteTranslate/both/:id
// @desc    Get BOTH data for a specific god
// @access  Public
router.get("/both/:id", async (req, res) => {
  try {
    const god = await God.find({ _id: Number(req.params.id) });

    const ability1Id = god[0].ability1;
    const ability2Id = god[0].ability2;
    const ability3Id = god[0].ability3;
    const ability4Id = god[0].ability4;
    const ability5Id = god[0].ability5;

    const ability1 = await Ability.find({ _id: ability1Id });
    const ability2 = await Ability.find({ _id: ability2Id });
    const ability3 = await Ability.find({ _id: ability3Id });
    const ability4 = await Ability.find({ _id: ability4Id });
    const ability5 = await Ability.find({ _id: ability5Id });

    let godData = {
      _id: god[0]._id,
      name: god[0].name,
      title: god[0].title,
      pros: god[0].pros,
      cons: god[0].cons,
      type: god[0].type,
      lore: god[0].lore,
      pantheon: god[0].pantheon,
      ability1: ability1[0],
      ability2: ability2[0],
      ability3: ability3[0],
      ability4: ability4[0],
      ability5: ability5[0],
    };

    const translateData = await GodTranslated.find({
      _id: req.params.id,
    })
      .populate("ability1")
      .populate("ability2")
      .populate("ability3")
      .populate("ability4")
      .populate("ability5");

    const data = { god: godData, translateData: translateData };

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errors");
  }
});

// @route   POST api/smiteTranslate/add
// @desc    Add or update translate data of a god
// @access  Private
router.post("/add", auth, async (req, res) => {
  try {
    let { abilities, god, translatedBy } = req.body;
    const identity = {
      user: translatedBy.userId,
      name: translatedBy.userName,
    };
    // Add abilities
    for (let key of Object.keys(abilities)) {
      const abi = abilities[key];
      let ability = await AbilityTranslated.findOne({ _id: abi._id });
      if (ability) {
        // Update
        ability = await AbilityTranslated.findOneAndUpdate(
          { _id: abi._id },
          { $set: abi, $push: { translatedBy: identity } },
          { new: true }
        );
        console.log("Saved 1 ", abi._id);
        await ability.save();
      } else {
        ability = new AbilityTranslated(abi);
        console.log("Saved 2", abi._id);
        await ability.save();
      }
    }

    // Add god
    let oneGod = await GodTranslated.findOne({ _id: god._id });
    if (oneGod) {
      oneGod = await GodTranslated.findByIdAndUpdate(
        { _id: god._id },
        { $set: god, $push: { translatedBy: identity } },
        { new: true }
      );
      console.log("Saved 1", god.name);
      await oneGod.save();
    } else {
      oneGod = new GodTranslated(god);

      console.log("Saved 2", god.name);
      await oneGod.save();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errors adding stuff");
  }
});

module.exports = router;
