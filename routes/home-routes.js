const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("homepage"); // This assumes you have a home.handlebars in the views folder. If not, replace 'home' with the correct handlebars file without the .handlebars extension.
});

module.exports = router;
