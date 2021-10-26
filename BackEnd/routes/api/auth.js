
// Model
const User = require("../../models/User");

// Router
const router = require("express").Router();

// Other plugins
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');


// Settings
const config = require("config");

// @route   GET api/auth
// @desc    Get a user
// @access  Public
router.get('/', auth, async (req, res) => {
  try{
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
  }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
  }

});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, email } = req.body;

    try {
      let user = await User.findOne({ $or: [{ name }, { email }] });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
