const { TryCatchWrapper } = require("../Helper/TryCatchWrapper");

const ApiError = require("../Helper/ApiError");

const ApiResponse = require("../Helper/ApiResponse");

const { Answers, QuizArr } = require("../QuizData");
const APIResponse = require("../Helper/ApiResponse");
const GetQuestion = TryCatchWrapper((req, res) => {
  const QuestionNumber = req.query?.Qno;
  if (!QuestionNumber) { //if Qno is not found
    return res.send(new ApiError(400, "No Question Number", "No-Qno"));
  }
  if (!(QuestionNumber > 0 && QuestionNumber < 11)) {//invalid Qno
    return res.send( 
      new ApiError(400, "Invalid Question Number", "Invalid-Qno")
    );
  }
  const Question = QuizArr[QuestionNumber - 1]; //get Question from array via Qno-1 and return it as response
  return res.send(new ApiResponse(200, Question, "Question", true));
});

const GetAnswers = TryCatchWrapper((req, res) => {
  const QuestionNumber = req.query?.Qno; //Qno
  if (!QuestionNumber) { //No Qno is provided
    return res.send(new ApiError(400, "No Question Number", "No-Qno"));
  }
  if (!(QuestionNumber > 0 && QuestionNumber < 11)) { //Invalid Qno
    return res.send(
      new ApiError(400, "Invalid Question Number", "Invalid-Qno")
    );
  }
  //return Answer of corresponding question at index Qno-1 from Answers array
  return res.send(
    new ApiResponse(200, Answers[QuestionNumber - 1], "Answer", true)
  );
});

const GetArr = TryCatchWrapper((req, res) => {
  const type = req.query?.type; //get the type
  //type: 0- wrong answers of user
  //type: 1- correct answers of user
  if (type===undefined) { //if type is not present
    return res.send(new ApiError(400, "No Type", "Type is not given"));
  }
  const userArr = req.body?.userArr; //get user answers array
  if (!userArr) { //no userArr
    return res.send(
      new ApiError(400, "No User input", "User Input is not given")
    );
  }
  let result = []; //store the data of Ques and Answer into it based on type

  userArr.forEach((element, index) => {
    //conditionally if type is 1 then check the correct answers of user or type is 0 then check the wrong answers of user 
    //type is constant so it will not change 
    if ((type==="1" && element === Answers[index])||(type==="0" && element !== Answers[index])) {
      result.push({ ...QuizArr[index], Answer: Answers[index],userAnswer:element, Qno: index + 1, }); //push the data
    }
  });
  //send it
  return res.send(new APIResponse(200,result,"Array",true))
});
module.exports = { GetQuestion, GetAnswers, GetArr };
