const express=require("express")
const router=express.Router() //creating router
const {GetQuestion,GetAnswers,GetArr}=require("../Controller/Quiz.controller") //getting controllers
//Get a question with query parameter Qno denotes Qno
router.get("/Ques",GetQuestion) //endpoint-1

// Send the Answer specific to Question
router.get("/Answer",GetAnswers)

//Send extracted Correct or Wrong Answers Arr after getting UserArr
router.post("/Extract", GetArr)
module.exports=router