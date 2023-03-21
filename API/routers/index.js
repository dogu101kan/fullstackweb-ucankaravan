const express = require("express");
const questions = require("./questions"); // middleware eklendi
const auth = require("./auth"); // middleware eklendi
const user = require("./user");
const admin = require("./admin");
const album = require("./album");

const router = express.Router();

// /api

router.use("/questions", questions);
router.use("/auth", auth);
router.use("/users", user);
router.use("/admin", admin);
router.use("/album", album);


module.exports = router;


