const express = require("express");
const router = express.Router(); // Bu bir middleware dir.
const { register, getUser, login, logout, imageUpload, forgotPassword, resetPassword, editDetails} = require("../controllers/auth");
const {getAccesToRoute} = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");


// api/auth/register
router.post("/register", register);
router.get("/profile", getAccesToRoute, getUser);
router.post("/login", login);
router.get("/logout", getAccesToRoute, logout);
router.post("/upload", [getAccesToRoute, profileImageUpload.single("profile_image")], imageUpload);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.put("/edit", getAccesToRoute, editDetails);



module.exports = router; // dışa aktardık

