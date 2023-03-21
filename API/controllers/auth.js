const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelper");
const {validateUserInput,comparePassword} = require("../helpers/input/inputHelper");
const sendEmail = require("../helpers/libraries/sendEmail");
const register = asyncErrorWrapper(async (req, res, next) => {
    
    //POST DATA
    //console.log(req.body);
    
    const {name, email, role, password, title, about, place, website} = req.body;

    // async, await yapısı ile 
    
    const user = await User.create({
        name,
        email,
        role,
        password,
        title,
        about,                // yukarıdakilerde değişkenlerin isimleri user 
        place,                    // ile eşleştiği için ES6 ile gelen güncellemede tekrar 
        website                    // name : name yapmaya gerek yok.
    });

    
    res.status(200).json({
        succes : true,
        data : user
    });
});

const login = asyncErrorWrapper(async (req, res, next) => {

    const {email, password} = req.body;

    if(!validateUserInput(email,password)){
        return next(new CustomError("Please check your input", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!comparePassword(password, user.password)){
        return next(new CustomError("Please check your credential", 400));
    }
    console.log(user);

    sendJwtToClient(user, res);

});

const logout = asyncErrorWrapper(async (req, res, next) => {

    const {NODE_ENV} = process.env;
    return res.status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false:true
    }).json({
        success: true,
        message: "Logout succesfull"
    });

});

const getUser = (req, res, next) => {
    res.json({
        success : true,
        data : {
            id : req.user.id,
            name : req.user.name
        }
    })
};

const imageUpload = asyncErrorWrapper(async (req, res, next) =>{

    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_image" : req.savedProfileImage
    },{
        new : true,
        runValidators: true
    })
    res.status(200)
    .json({
        succes : true,
        message: "image upload Successfull",
        data : user
    })
});

// Forgot Password
const forgotPassword = asyncErrorWrapper(async(req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({email : resetEmail});
    
    if(!user){
        return next(new CustomError("Email doesn't exist."), 400);
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save(); //degistirdigimiz degerleri kaydediyoruz modele

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    
    const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p>This <a href = "${resetPasswordUrl}" target = "_blank">Link</a>
    `;

    try{
        await sendEmail({
            from : process.env.SMTP_USER,
            to : resetEmail,
            subject : "Reset Your Password",
            html : emailTemplate
        });

        return res.json({
            success : true,
            message : "Token sent to your email."
        });
        
    }
    catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save();
        console.log(err);
        return next(new CustomError("Email could not be sent.", 500));
    }
});

const resetPassword = asyncErrorWrapper(async(req, res, next) => {

    const {resetPasswordToken} = req.query;
    const {password} = req.body;

    if(!resetPasswordToken){
        return next(new CustomError("Please provide a valid token.", 400));
    }

    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordTokenExpire : {$gt : Date.now()}
    });

    if(!user){
        return next(new CustomError("Invalid token or session expired", 400));
    }
    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save();

    return res.status(200)
    .json({
        success : true,
        message : "Reset password process successfull."
    })
});

const editDetails = asyncErrorWrapper(async(req, res, next) => {
    const editInformation = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
        new : true,
        runValidators : true
    });
    return res.status(200)
    .json({
        success : true,
        data : user
    });
});

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    editDetails,
};