const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/recipes", require("./recipes"));
router.use("/comments", require("./comments"));

module.exports = router;
