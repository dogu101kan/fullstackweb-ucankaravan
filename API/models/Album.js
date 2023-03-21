const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title : {
        type : String,
        required : [true, "Please provide a title"],
        minlength : [10, "Please provide a title at least 10 characters"],
        unique : true
    },
    content : {
        type : String,
        required : [true, "Please provide a content"],
        minlength : [20, "Please provide a title at least 20 characters"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    album_images : [
        {
            type : String
        }
    ],
    imagePath : {
        type : String
    },
    videoUrl : [
        {
            type : String,
        }
    ]
});


module.exports = mongoose.model("Album", AlbumSchema);