const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getAllQuestions = asyncErrorWrapper(async(req, res, next) => {
    const questions = await Question.find();

    return res.status(200)
    .json(res.queryResults);
});

const getSingleQuestion = asyncErrorWrapper(async(req, res, next) =>{
    
    // const id = req.params.id;
    // const user = await User.findById(id);

    // Yukarıdaki 2 satırı yazmak ve database den cevap beklemek yerine checkUserExist in gönderdiği req ten aldım userı
    
    const question = req.data;

    return res.status(200)
    .json({
        success : true,
        data : question
    })
});

const askNewQuestion = asyncErrorWrapper(async(req, res, next) => {

    const question = await Question.create({
        ...req.body,
        user : req.user.id
    });
    res.status(200).json({
        succes : true,
        data : question
    });
});

const editQuestion = asyncErrorWrapper(async(req, res, next) =>{
    
    // const id = req.params.id;
    // const user = await User.findById(id);

    // Yukarıdaki 2 satırı yazmak ve database den cevap beklemek yerine checkUserExist in gönderdiği req ten aldım userı
    const {id} = req.params;
    const editInformation = req.body;

    let question = await Question.findByIdAndUpdate(id, editInformation, {
        new : true,
        runValidators : true
    });

    question = await question.save(); // Slug i prehook a girmeyince güncellemediğinden save yaptım bir daha. 

    return res.status(200)
    .json({
        success : true,
        data : question
    })
});


const deleteQuestion = asyncErrorWrapper(async(req, res, next) =>{
    
    const {id} = req.params;

    await Question.findByIdAndDelete(id);

    return res.status(200)
    .json({
        success : true,
        message : "Question deleted."
    });
});

const likeQuestion = asyncErrorWrapper(async(req, res, next) =>{
    
    const question = req.data;
    
    if(question.likes.includes(req.user.id)){

        question.likes.forEach((value, index) => {
            if(value.toString() === req.user.id){
                question.likes.splice(index, 1);
            }
        });
        

    }else{
        question.likes.push(req.user.id);
    }

    question.likeCount = question.likes.length;

    await question.save();    
    
    return res.status(200)
    .json({
        success : true,
        data : question
    });
});


module.exports = {
    getSingleQuestion,
    getAllQuestions,
    askNewQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion
};