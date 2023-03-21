const express = require("express");

const router = express.Router({mergeParams:true}); // bu parametreyi kullanma sebebim bir üst router olan 
                                                  // question routerındaki parametreyi buradan çekebilmek.

const { getAccesToRoute, getAnswerOwnerAcces } = require("../middlewares/authorization/auth");
const { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer, deleteAnswer, likeAnswer } = require("../controllers/answer");
const { checkQuestionAndAnswerExist } = require("../middlewares/database/databaseErrorHelpers");

router.post("/", getAccesToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);
router.put("/:answer_id/edit", [checkQuestionAndAnswerExist, getAccesToRoute, getAnswerOwnerAcces], editAnswer);
router.delete("/:answer_id/delete", [checkQuestionAndAnswerExist, getAccesToRoute, getAnswerOwnerAcces], deleteAnswer);
router.get("/:answer_id/like", [checkQuestionAndAnswerExist, getAccesToRoute], likeAnswer);



module.exports = router;