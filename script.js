const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorMsg = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')

checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
        const allGoalsAdded = [...inputFields].every((input)=>{
            return input.value
        })
        if(allGoalsAdded) {
            checkbox.parentElement.classList.toggle('completed')
            progressValue.style.width = "33.33%"
        }
        else{
            errorMsg.style.visibility = "visible";
        }
    })
})

inputFields.forEach( (input) =>{
    input.addEventListener('focus', () =>{
        errorMsg.style.visibility = "hidden";
    })
})