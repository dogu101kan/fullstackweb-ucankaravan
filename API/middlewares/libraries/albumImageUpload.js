const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

// Storage(nereye hangi isimle kaydedeceğimiz), FileFilter(izin verilen dosyalar)

const storage = multer.diskStorage({

    destination : function(req, file, cb){

        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads/album"));
    },
    // ../../../client/assets/img/portfolio/
    filename : function(req, file, cb){


        // File-Mimetype-image/png

        const extension = file.mimetype.split("/")[1];
        req.savedAlbumImage = "image_" + Date.now() + "." + extension;
        
        cb(null, req.savedAlbumImage);
    }
});

const fileFilter = (req,file,cb) => {
    let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("Please provide a valid image file", 400), false);
    };
    return cb(null, true);
};

const albumImageUpload = multer({storage, fileFilter});

module.exports = albumImageUpload;