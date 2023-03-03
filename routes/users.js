const express = require("express");
const user = require("../controllers/users");
const router = express.Router();

router.route("/").get(user.getAll);
router.route("/attendance").put(user.updateAttendance);

module.exports = router;
