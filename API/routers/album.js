const express = require("express");
const { getAdminAccess, getAccesToRoute } = require("../middlewares/authorization/auth");
const { getAllAlbums, createNewAlbum, editAlbum, addPhoto, deleteImg, deleteAlbum, getSingleAlbum } = require("../controllers/album");
const { checkAlbumExist } = require("../middlewares/database/databaseErrorHelpers");
const albumQueryMiddleware = require("../middlewares/query/albumQueryMiddleware");
const albumImageUpload = require("../middlewares/libraries/albumImageUpload");


const Album = require("../models/Album");

const router = express.Router();



router.get("/", albumQueryMiddleware(Album), getAllAlbums);
router.get("/:id", checkAlbumExist, getSingleAlbum);
router.post("/addalbum", [ getAccesToRoute, getAdminAccess, albumImageUpload.array("album_images")], createNewAlbum);
router.post("/:id/edit", checkAlbumExist, editAlbum);
router.post("/:id/addphoto", [getAccesToRoute, getAdminAccess, albumImageUpload.array("album_images")], addPhoto);
router.delete("/:id/:imgname/deleteimg", [checkAlbumExist, getAccesToRoute, getAdminAccess], deleteImg);
router.delete("/:id/deletealbum", [checkAlbumExist, getAccesToRoute, getAdminAccess], deleteAlbum);



module.exports = router;