const express = require("express");
const router = express.router();
const {login} = require("../controllers/auth_controller");

router.post("/login", login);

module.exports = router;
