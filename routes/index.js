//this serve as the main entry po0int for routes

const router = require("express").Router();
const auRoutes = require("./au");
const homeRoutes = require("./home-routes.js");
//Prefix all routes in 'au' directory with '/au'
//au stand for Australia Routes.
router.use("/", homeRoutes);
router.use("/au", auRoutes);

module.exports = router;
