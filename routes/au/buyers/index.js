const router = require("express").Router();
const bcrypt = require("bcrypt");
const Buyer = require("../../../models/Buyer");

router.get("/create-account", (req, res) => {
  res.render("buyers-signup");
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newBuyer = await Buyer.create({ username, email, password });

    // Save the username to session
    req.session.username = newBuyer.username;

    res.status(201).json({
      id: newBuyer.id,
      username: newBuyer.username,
      email: newBuyer.email,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while signing up.", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyer = await Buyer.findOne({ where: { email } });
    if (!buyer) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isValidPassword = await bcrypt.compare(password, buyer.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Save the username to session
    req.session.username = buyer.username;

    // Send success response with the username
    res.json({ success: true, username: buyer.username });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error while logging in.",
        error: error.message,
      });
  }
});

// Existing Fetch all buyers
router.get("/", async (req, res) => {
  try {
    const buyers = await Buyer.findAll();
    if (!buyers.length) {
      res.status(404).json({ message: "No buyers found." });
      return;
    }
    res.json(buyers);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch buyers. Please try again later.",
      error: err.message,
    });
  }
});

module.exports = router;
