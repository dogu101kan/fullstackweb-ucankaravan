const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");


const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) =>{
    
    const {question_id} = req.params;
    const user_id = req.user.id;
    const information = req.body;


    const answer = await Answer.create({
        ...information,
        question : question_id,
        user : user_id
    });
    
    return res.status(200)
    .json({
        success : true,
        data : answer
    });
});

const getAllAnswersByQuestion = asyncErrorWrapper(async (req, res, next) =>{
    
    const {question_id} = req.params;
    
    const question = await Question.findById(question_id).populate("answers"); // populate kullandığımızda sadece id değil  
                                                                               // o id ye bağlı answer içeriği de geliyor.
    const answers = question.answers;
    
    return res.status(200)
    .json({
        success : true,
        count : answers.length,
        data : answers
    });
});

const getSingleAnswer = asyncErrorWrapper(async (req, res, next) =>{
    
    return res.status(200)
    .json({
        success : true,
        data : req.data
    });
});

const editAnswer = asyncErrorWrapper(async(req, res, next) =>{
   
    const {answer_id} = req.params;
    const content = req.body.content;


    let answer = await Answer.findById(answer_id);
    answer.content = content;
    
    answer = await answer.save();

    return res.status(200)
    .json({
        success : true,
        data : answer
    })
});

const deleteAnswer = asyncErrorWrapper(async(req, res, next) =>{
   
    const {answer_id} = req.params;
    const {question_id} = req.params;


    let answer = await Answer.findByIdAndRemove(answer_id);
    
    const question = await Question.findById(question_id);

    question.answers.splice(question.answers.indexOf(answer_id), 1);
    question.answerCount = question.answer.length;

    await question.save();

    return res.status(200)
    .json({
        success : true,
        message : "Answer deleted successfully.",
        answer : answer
    })
});

const likeAnswer = asyncErrorWrapper(async(req, res, next) =>{
    
    const answer = req.data;
    
    if(answer.likes.includes(req.user.id)){
        
        answer.likes.splice(answer.likes.indexOf(req.user.id), 1);

    }else{
        answer.likes.push(req.user.id);
    }

    await answer.save();    
    
    return res.status(200)
    .json({
        success : true,
        data : answer
    });
});

module.exports = {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer
}