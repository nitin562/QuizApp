let Qno=1 //Question number tracker
let UserAnswer=null // when you check some option, UserAnswer is that choice
let submit=false //track you submitted or not
let UserAnswerArr=[] //store user answers into array
let score=0 //count right answers
const fetchQuestion=async()=>{ //FetchQuestion
    const Url=`http://localhost:8000/api/quiz/Ques?Qno=${Qno}` //url
    try {
      //fetch and convert into json then call insertIntoDOM if fetch is successful
        const response=await fetch(Url)
        const result=await response.json()
        if(result.success){
            insertIntoDom(result.data)
        }
    } catch (error) {
        //alert if error due to internet or server down issue
        alert("Server is down")
    }
}
const insertIntoDom=(data)=>{ //Inserting Question and choices into DOM
  //following is a html structure that will be dynamically inserted into DOM  
  const html=`<p id="Heading">Question ${Qno}</p>
    <p id="SubHeading">Select only one option</p>
    <p id="Question">${data.Question}</p>
    <div class="options">
      <div class="option" id="A">
        <input
          type="checkbox"
          id="First"
          onchange="HandleCheck('First')"
          name="A"
          class="checkbox"
        />
        <p>
          ${data.Options[0]}
        </p>
      </div>
      <div class="option" id="B">
        <input
          type="checkbox"
          id="Second"
          onchange="HandleCheck('Second')"
          name="B"
          class="checkbox"
        />
        <p>
        ${data.Options[1]}
        </p>
      </div>
      <div class="option" id="C">
        <input
          type="checkbox"
          id="Third"
          onchange="HandleCheck('Third')"
          name="C"
          class="checkbox"
        />
        <p>
        ${data.Options[2]}
        </p>
      </div>
      <div class="option" id="D">
        <input
          type="checkbox"
          id="Fourth"
          onchange="HandleCheck('Fourth')"
          name="D"
          class="checkbox"
        />
        <p>
        ${data.Options[3]}
        </p>
      </div>
    </div>
    <button id="Submit" onclick="handleSubmit()" class="btn">Submit</button>
    <button id="Next" onclick="handleNext()" class="btn" style="display: none;">Next</button>`
    //create new div element and set its class and innerHTML
    const newContainer=document.createElement("div")
    newContainer.className="center-cont"
    newContainer.innerHTML=html //inserting into div
    const parentCont=document.getElementsByClassName("Container")[0] //parent of divElement
    const Oldcontainer=document.getElementsByClassName("center-cont")[0] //old child of parent and remove it
    Oldcontainer.remove()
    parentCont.appendChild(newContainer)  //append new divELement into parent
    
}
window.onload=fetchQuestion //onloding window 

const HandleCheck=(e)=>{ //if you select any option then other selected option will be automatically unchecked, one option at once
    const checkedBox=document.getElementById(e)
    if(submit){ //if you submitted then no change your answer
      if(UserAnswer===checkedBox){ //retain the checked option if you are trying to uncheck it after submit
        checkedBox.checked=true
        return
      }
      return checkedBox.checked=false //make rest options unchecked if you are trying to check after submitting answer
      
    }
    UserAnswer=null //store the current checked element - checkbox
    if(checkedBox.checked){ //checked is true
        UserAnswer=checkedBox
        const allCheckBox=Array.from(document.getElementsByClassName("checkbox")) //find rest checkbox and make them uncheck so that only one checkbox (current ) remains checked
        allCheckBox.forEach((element)=>{
            if(element!==checkedBox && element.checked){
                element.checked=false
            }
        })
    }
}

const HandleAnswerCheck=async()=>{ //check the answer by fetching correct answer
    UserAnswerArr.push(UserAnswer.name)
    const Url=`http://localhost:8000/api/quiz/Answer?Qno=${Qno}`
    const response= await fetch(Url)
    const result=await response.json()
    if(result.success){ //then show it on screen by background color styling

      const checkedDiv=document.getElementById(UserAnswer.name)
      if(result.data===UserAnswer.name){ //correct
        score++
        checkedDiv.style.backgroundColor="rgba(47, 255, 99, 0.445)"
      }
      else{ //wrong
        document.getElementById(result.data).style.backgroundColor="rgba(47, 255, 99, 0.445)"
        checkedDiv.style.backgroundColor="rgba(247, 80, 97, 0.358)"
      }

    }

}

const handleSubmit=async()=>{ //Clicking submit btn
    if(UserAnswer===null){
        alert("Select option before submit")
        return
    }
    await HandleAnswerCheck() //check the answer
    submit=true 
    //hide the submit btn and show next btn.
    const SubmitElement=document.getElementById("Submit")
    const NextElement=document.getElementById("Next")
    SubmitElement.style.display="none"
    NextElement.style.display="block" //showing next button and hidding submit button
}
const handleNext=async()=>{ //Go to Next question 
  if(submit){
    if(Qno===10){ //end of question
      //end
      const InfomationAboutResult={ //storing current userArr and score
        UserScore:score,
        UserAnswerArr,
      }
      sessionStorage.setItem("ResultArr",JSON.stringify(InfomationAboutResult))
      location.href="/Result.html" //move to result section
      return
    }
    submit=false
    Qno++
    UserAnswer=null
    await fetchQuestion()
  }
}



