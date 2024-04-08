const express=require("express")
const cors=require("cors")
const app=express()
const port=8000||process.env.PORT // if env file is present
app.use(cors()) //cors issue solved
app.use(express.json()) //json body parser middleware
//using api modules
app.use("/api/quiz",require("./API/Quiz.api"))

//listen at port
app.listen(port,()=>{
    console.log(`Server started at http://localhost:8000`)
})


