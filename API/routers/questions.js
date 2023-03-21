const express = require("express");
const { getSingleQuestion, getAllQuestions, askNewQuestion, editQuestion, deleteQuestion, likeQuestion } = require("../controllers/questions");
const {getAccesToRoute, getQuestionOwnerAcces} = require("../middlewares/authorization/auth");
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");
const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware");
const Question = require("../models/Question");


const answer = require("./answer");

const router = express.Router(); // Bu bir middleware dir.

router.get("/", questionQueryMiddleware(Question, {population : {
    path : "user",
    select : "name profile_image"
}}),getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccesToRoute, askNewQuestion);
router.put("/:id/edit", [getAccesToRoute, checkQuestionExist, getQuestionOwnerAcces], editQuestion);
router.delete("/:id/delete", [getAccesToRoute, checkQuestionExist, getQuestionOwnerAcces], deleteQuestion);
router.get("/:id/like", [getAccesToRoute, checkQuestionExist], likeQuestion);

router.use("/:question_id/answers",checkQuestionExist, answer);


module.exports = router; // dışa aktardık