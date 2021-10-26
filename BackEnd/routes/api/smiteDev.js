// Model
const God = require("../../models/God");
const Ability = require("../../models/Ability");

// Router
const router = require("express").Router();
const auth = require("../../middleware/auth");
const axios = require("axios");

const { check, validationResult } = require("express-validator");


const {
  getUrl,
  getSignature,
  getUrlForSession,
} = require("../../ultilities/util");

// @@--------------------HIREZ---------------------@@
// @route   GET api/smiteDev/createSession
// @desc    createSession
// @access  Private
router.get("/createSession", auth, async (req, res) => {
  try {
    const signature = getSignature("createsession");
    const url = getUrlForSession("createsessionjson", signature);

    axios
      .get(url)
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Could not get session");
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @@--------------------HIREZ---------------------@@
// @route   GET api/smiteDev/getGods
// @desc    getGods
// @access  Private
router.post("/getGods", auth, async (req, res) => {
  const signature = getSignature("getgods");
  const url = getUrl("getgodsjson", signature, req.body.sessionId);

  axios
    .get(url)
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Could not get gods");
    });
});


// @route   GET api/smiteDev/getGodsFromLocal
// @desc    getGods from local db
// @access  Public
router.get("/getGodsFromLocal",async (req, res) => {
  try {
    const data = await God.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send("Could not get gods");
  }
});


// @route   POST api/smiteDev/add
// @desc    Add or update a god
// @access  Private
router.post("/add", auth, async (req, res) => {
  try {
    let { abilities, god } = req.body;

    // Add abilities
    for (const abi of abilities) {
      let ability = await Ability.findOne({ _id: abi._id });
      if (ability) {
        // Update
        ability = await Ability.findOneAndUpdate(
          { _id: abi._id },
          { $set: abi },
          { new: true }
        );
        await ability.save();
      } else {
        ability = new Ability(abi);
        await ability.save();
      }
    }

    // Add god
    let oneGod = await God.findOne({ _id: god._id });
    if (oneGod) {
      oneGod = await God.findByIdAndUpdate(
        { _id: god._id },
        { $set: god },
        { new: true }
      );
      await oneGod.save();
    } else {
      oneGod = new God(god);
      await oneGod.save();
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errors adding stuff");
  }
});

router.post("/addAll", auth, async (req, res) => {
  try {
    let { gods } = req.body;
    for (const godTemp of gods) {
      let { abilities, god } = godTemp;

      // Add abilities
      for (const abi of abilities) {
        let ability = await Ability.findOne({ _id: abi._id });
        if (ability) {
          // Update
          ability = await Ability.findOneAndUpdate(
            { _id: abi._id },
            { $set: abi },
            { new: true }
          );
          await ability.save();
        } else {
          ability = new Ability(abi);
          await ability.save();
        }
      }

      // Add god
      let oneGod = await God.findOne({ _id: god._id });
      if (oneGod) {
        oneGod = await God.findOneAndUpdate(
          { _id: god._id },
          { $set: god },
          { new: true }
        );
        await oneGod.save();
      } else {
        oneGod = new God(god);
        await oneGod.save();
      }

    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errors adding stuff");
  }
});

module.exports = router;
