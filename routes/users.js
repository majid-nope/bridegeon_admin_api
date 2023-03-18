const express = require("express");
const user = require("../controllers/users");
const router = express.Router();

router.route("/").get(user.getAll).post(user.add);
router.route("/attendance").put(user.attendance);
router.route("/batch").get(user.getBatch);

module.exports = router;
