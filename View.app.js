let index=0 //track the current question inside the array fetched from server
let maxLimitIndex=null //end of the array- index
const HandleLoad=async()=>{ //load the question and answers with userAnswers into dom dynamically
    const type=Number(sessionStorage.getItem("type")) //get the type
    const YourData=await HandleFetch(type) //fetch them
    if(YourData.success===false){
      alert(YourData.message) //if unsuccessful fetch is performed
      return
    }
    maxLimitIndex=YourData.data.length //setting length
    insertIntoDOM(YourData.data,type) //insert html into dom
}
const insertIntoDOM=(arr,type)=>{
    const element=arr[index] //current question object
    //dynamic insertion of html
    const html=`<p id="Heading">Question ${element.Qno}</p>
    <p id="Question">${element.Question}</p>
    <p id="SubHeading">Select only one option</p>
    <div class="options">
      <div class="option" id="A"> 
        <p>
          ${element.Options[0]}
        </p>
      </div>
      <div class="option" id="B">
        <p>
        ${element.Options[1]}
        </p>
      </div>
      <div class="option" id="C">
        <p>
        ${element.Options[2]}
        </p>
      </div>
      <div class="option" id="D">
        <p>
        ${element.Options[3]}
        </p>
      </div>
    </div>
    <button id="Next" class="btn" onclick="handleNext()">Next</button>`
    //create new div and remove old from parent and then insert new div into parent
    const divElement=document.createElement("div")
    divElement.className="center-cont"
    divElement.innerHTML=html
    const oldElement=document.getElementsByClassName("center-cont")[0]
    const parent=document.getElementsByClassName("Container")[0]
    oldElement.remove()
    parent.appendChild(divElement)
    //add style to the correct answer and user answer
    const answer=document.getElementById(element.Answer)
    answer.style.backgroundColor="rgba(47, 255, 99, 0.445)"
    if(type===0){ //wrong user answer
        const userAnswer=document.getElementById(element.userAnswer)
        userAnswer.style.backgroundColor="rgba(247, 80, 97, 0.358)"
    } 
}
const HandleFetch=async(type)=>{ //Fetch the information
    const url=`http://localhost:8000/api/quiz/Extract?type=${type}`
    const UserInputArr=JSON.parse(sessionStorage.getItem("ResultArr"))
    const options={
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body: JSON.stringify({userArr:UserInputArr.UserAnswerArr})
    }
    const response=await fetch(url,options)
    return await response.json()
}
const handleNext=()=>{ //handle the next btn
    if(index===maxLimitIndex-1){ //if last question is displayed and no questions are left then go to Result.html
      location.href="/Result.html"
    }
    index++
    HandleLoad()
}
window.onload=HandleLoad //load on page load