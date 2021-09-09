// Router
const router = require("express").Router();

// Model
const User = require("../../models/User");

// Other plugins
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Settings
const Roles = require("../../config/Roles");
const config = require("config");
const auth = require("../../middleware/auth");

// @route   POST api/users/
// @desc    Get all guests
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.collection.find({}).toArray();

    return res.status(200).json({ users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users/guest
// @desc    Register guest
// @access  Public
router.post(
  "/guest",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ $or: [{ name }, { email }] });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const role = Roles.GUEST;

      user = new User({
        name,
        email,
        avatar,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/users/withRole
// @desc    Register moderator
// @access  Public
router.post(
  "/withRole",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("role", "Role is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ $or: [{ name }, { email }] });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      if (!Object.values(Roles).includes(role.toString().toUpperCase())) {
        return res.status(400).json({ errors: [{ msg: "Role not found" }] });
      }

      const processedRole = role.toUpperCase();
      user = new User({
        name,
        email,
        avatar,
        password,
        processedRole,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// @route   POST api/users/admin
// @desc    Register admin
// @access  Private
router.post(
  "/admin",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const rolefromReq = req.user.role;

    try {
      let user = await User.findOne({ $or: [{ name }, { email }] });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      if (rolefromReq.toString().toUpperCase() != Roles.MODERATOR) {
        return res.status(503).json({ errors: [{ msg: "Unauthorized" }] });
      }

      const role = Roles.ADMIN;
      user = new User({
        name,
        email,
        avatar,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   Delete api/users/:id
// @desc    Delete an user
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  const { userId } = req.params.id;

  try {
    let user = await User.findById(userId);
    let role = req.user.role;

    if (!user || role.toString().toUpperCase() != Roles.ADMIN) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User not found or not authorized" }] });
    }

    await user.remove();

    res.json({ msg: "User removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
