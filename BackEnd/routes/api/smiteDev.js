// Router
const router = require("express").Router();
const auth = require("../../middleware/auth");
const axios = require("axios");

const { check, validationResult } = require("express-validator");

// Model
const God = require("../../models/God");
const Ability = require("../../models/Ability");

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
router.get("/getGods", auth, async (req, res) => {
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

// @route   POST api/smiteDev/add
// @desc    Add or update a god
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
      });

      // Add god
      god = new God(god);
      await god.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Errors adding stuff");
    }
  }
);

module.exports = router;
