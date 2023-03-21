const User = require("../../models/User");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Album = require("../../models/Album");


const checkUserExist = asyncErrorWrapper(async(req, res, next) =>{
    // "/:id" nin içerisindeki id yi alabilmek için req içerisindeki params a bak
    const id = req.params.id;

    const user = await User.findById(id);

    if(!user){
        return next(new CustomError("There is no such a user with that id."), 400);
    };

    // aşağıdakini getSingleUser içerisinde bir daha user ı database den çekmeye çalışmamak için yazdım.
    req.data = user;
    next();
});

const checkQuestionExist = asyncErrorWrapper(async(req, res, next) =>{
    // "/:id" nin içerisindeki id yi alabilmek için req içerisindeki params a bak
    const question_id = req.params.id || req.params.question_id;

    const question = await Question.findById(question_id);

    if(!question){
        return next(new CustomError("There is no such a question with that id."), 400);
    };

    // aşağıdakini getSingleUser içerisinde bir daha user ı database den çekmeye çalışmamak için yazdım.
    req.data = question;
    next();
});

const checkAlbumExist = asyncErrorWrapper(async(req, res, next) =>{
    
    const id = req.params.id

    const album = await Album.findById(id);

    if(!album){
        return next(new CustomError("There is no such a album with that id."), 400);
    };

    
    req.data = album;
    next();
});

const checkQuestionAndAnswerExist = asyncErrorWrapper(async(req, res, next) =>{
    // "/:id" nin içerisindeki id yi alabilmek için req içerisindeki params a bak
    const question_id = req.params.question_id;
    const answer_id = req.params.answer_id;


    const answer = await Answer.findOne({
        _id : answer_id,
        question : question_id
    }).populate({
        path : "question",
        select : "title"
    })
    .populate({
        path : "user",
        select : "name profile_image"
    });

    
    if(!answer){
        return next(new CustomError("There is no such a answer with that id."), 400);
    };

    // aşağıdakini getSingleUser içerisinde bir daha user ı database den çekmeye çalışmamak için yazdım.
    req.data = answer;

    next();
});

module.exports = {checkUserExist, checkQuestionExist, checkQuestionAndAnswerExist, checkAlbumExist};
