const Album = require("../models/Album");
const asyncErrorWrapper = require("express-async-handler");
const fileInfoToArray = require("../helpers/files/fileHelper");
const fs = require('fs');
const CustomError = require("../helpers/error/CustomError");

const getAllAlbums = asyncErrorWrapper(async(req, res, next) => {
    return res.status(200)
    .json(res.queryResults);
});

const getSingleAlbum = asyncErrorWrapper(async(req, res, next) => {
    return res.status(200)
    .json(req.data);
});
const createNewAlbum = asyncErrorWrapper(async(req, res, next) => {

    let files = req.files;
    const [fileName, filePath] = fileInfoToArray(files);

    const album = await Album.create({
        title : req.body.title,
        content : req.body.content,
        album_images : fileName,
        imagePath : filePath

    });


    res.status(200).json({
        succes : true,
        data : album
    });
});

const editAlbum = asyncErrorWrapper(async(req, res, next) =>{
    const {id} = req.params;
    const {title, content, videoUrl} = req.body;
    
    let album = await Album.findByIdAndUpdate(id, {
        title, content, videoUrl
    }, {
        new : true,
        runValidators : true
    });

    return res.status(200)
    .json({
        success : true,
        data : album
    })
});

const addPhoto = asyncErrorWrapper(async(req, res, next) => {
    const {id} = req.params;
    let files = req.files;

    
    let album = await Album.findById(id);
    
    const [fileName, filePath] = fileInfoToArray(files, album.album_images);

    album.album_images = fileName;
    album.save();

    return res.status(200)
    .json({
        success : true,
        data : album
    });
    
});

const deleteImg = asyncErrorWrapper(async(req, res, next) => {
    const {id} = req.params;
    const {imgname} = req.params;
    
    let album = await Album.findById(id);
    
    if(album.album_images.indexOf(imgname) === -1){
        return next(new CustomError("Image doesn't exist.", 400));
    }

    album.album_images.splice(album.album_images.indexOf(imgname), 1);
    album.save();
    
    const imgPath = album.imagePath+"/"+ imgname;

    fs.unlink(imgPath, (err) => {
        if (err) {
            throw err;
        }
    });

    return res.status(200)
    .json({
        success : true,
        data : album
    });
    
});

const deleteAlbum = asyncErrorWrapper(async(req, res, next) => {
    const {id} = req.params;
    
    let album = await Album.findById(id);
    

    album.album_images.forEach(imageName => {
        
        const imgPath = album.imagePath+"/"+ imageName;

        fs.unlink(imgPath, (err) => {
            if (err) {
                throw err;
            }
        });

    });
    album.remove();
    
    

    return res.status(200)
    .json({
        success : true,
        data : album
    });
    
});

module.exports = {
    getAllAlbums,
    getSingleAlbum,
    createNewAlbum,
    editAlbum,
    addPhoto,
    deleteImg,
    deleteAlbum
};