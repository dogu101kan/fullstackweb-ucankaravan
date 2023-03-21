const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const deleteUser = asyncErrorWrapper(async(req, res, next)=>{
    const {id} = req.data;
    const user = await User.findById(id);

    user.remove();

    return res.status(200)
    .json({
        success : true,
        message : "Delete process done."})

});


const blockUser = asyncErrorWrapper(async(req, res, next)=>{
    const {id} = req.data;
    const user = await User.findById(id);

    user.blocked = !user.blocked;
    
    await user.save();

    return res.status(200)
    .json({
        success : true,
        message : "Block - unblock successfull" 
    })

});

module.exports = {
    blockUser,
    deleteUser
}