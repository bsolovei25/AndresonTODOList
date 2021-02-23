class Task{
  constructor(args){
    if (ValidateValuesClass.validationOfUserInputs({'string':args[0], 'date':[args[1], args[2]]}) && 
    ValidateValuesClass.validateIfEmpty()){
      this.taskName = args[0];
      this.taskDate1 = args[1];
      this.taskDate2 = args[2];
    }
  }
}


function getNameId() {
  return document.querySelector('#nameId')
}


function isFieldValid(){
  if (!getNameId().checkValidity() || getNameId().value == ''){
    alert('Name shouldnt have symbols')
    return
  }
}


getNameId().addEventListener("keydown", function (e) {
  if (e.key == 'Enter') {
    isFieldValid()
  }
});

document.getElementById('ConfirmChanges').addEventListener('click',function(e){
  let inputFields = document.querySelectorAll("#nameId, #editDateStart, #editDateEnd")
  if (isFieldValid){
    let singleTask = new Task(inputFields)
  }
  
})

