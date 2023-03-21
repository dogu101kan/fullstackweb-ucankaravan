const express = require("express");
const router = express.Router();
const {getAccesToRoute, getAdminAccess} = require("../middlewares/authorization/auth");
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers");
const {blockUser, deleteUser} = require("../controllers/admin");

router.use([getAccesToRoute, getAdminAccess]);
router.get("/block/:id", checkUserExist, blockUser);
router.delete("/deleteuser/:id", checkUserExist, deleteUser);



module.exports = router;