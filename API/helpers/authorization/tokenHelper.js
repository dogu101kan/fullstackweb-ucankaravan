const { response } = require("express");

const sendJwtToClient = (user, res) => {
    // Generate token
    const token = user.generateJwtFromUser();

    const {JWT_COOKIE, NODE_ENV }= process.env;
    return res.cookie("acces_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60), // ms cinsinden verilmeli
        secure : NODE_ENV === "development" ? false:true
    }).status(200)
    .json({
        succes : true,
        acces_token : token,
        data : {
            name : user.name,
            email : user.email
        }
    });

    // Response
};

const isTokenIncluded = req => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
};
const getAccesTokenFromHeader = req => {
    const authorization = req.headers.authorization;
    const acces_token = authorization.split(" ")[1];
    return acces_token
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccesTokenFromHeader,
};