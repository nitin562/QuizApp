const handleLoad=()=>{ //fetching result from sessionstorage and display it
    const Data=JSON.parse(sessionStorage.getItem("ResultArr"))
    const RightAnswer=Number(Data.UserScore)
    const Score=(RightAnswer/10)*100
    const WrongAnswer=10-RightAnswer
    InsertIntoDOM(RightAnswer,WrongAnswer,Score)
}
const InsertIntoDOM=(right,wrong,score)=>{
  //Dynamically insert html into dom
    const html=`<p id="Heading">Quiz has Completed</p>
    <div id="Stats">
      <div class="correct card">
        <p class="circle">${right}</p>
        <p>Correct Answers</p>
        <button onclick="GoToQA(1)">View</button>
      </div>
      <div class="wrong card">
        <p class="circle">${wrong}</p>
        <p>Wrong Answers</p>
        <button onclick="GoToQA(0)">View</button>
      </div>
      
    </div>
    <p id="SubHeading">Your score is ${score}%</p>
    <button class="Exit" onclick="HandleExit()">Exit</button>

    `
    //create div
    const divElement=document.createElement("div")
    divElement.className="center-cont"
    divElement.innerHTML=html
    const oldDiv=document.getElementsByClassName("center-cont")[0]
    const parent=document.getElementsByClassName("container")[0]
    oldDiv.remove() //remove old div and append new into parent
    parent.appendChild(divElement)
}
window.onload=handleLoad

const GoToQA=(type)=>{ //Go to view page and store the type-
  //0- show wrong answers
  //1- show correct answers
  sessionStorage.setItem("type",type)
  location.href="/View.html"
}
const HandleExit=()=>{ //clear all sessions and go to index.html
  sessionStorage.clear()
  location.href="/"
}