const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const getSingleUser = asyncErrorWrapper(async(req, res, next) =>{
    
    // const id = req.params.id;
    // const user = await User.findById(id);

    // Yukarıdaki 2 satırı yazmak ve database den cevap beklemek yerine checkUserExist in gönderdiği req ten aldım userı
    
    const user = req.data;

    return res.status(200)
    .json({
        success : true,
        data : user
    })
});


const getAllUsers = asyncErrorWrapper(async(req, res, next) =>{
    
    return res.status(200).json(res.queryResults);
});
module.exports = {getSingleUser, getAllUsers};