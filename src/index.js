class Task{
  constructor(args){
    //if (ValidateValuesClass.validationOfUserInputs({'string':taskName, 'Date':[taskDate1, taskDate2]}) && 
    if (ValidateValuesClass.validationOfUserInputs({'string':args[0], 'date':[args[1], args[2]]}) && 
    ValidateValuesClass.validateIfEmpty()){
      this.taskName = args[0];
      this.taskDate1 = args[1];
      this.taskDate2 = args[2];
    }
  }
}



// class ValidateValuesClass{
//   static validationOfUserInputs(args){
//     for (let key in args){
//       if (args[key] instanceof Array){
//         for (let k = 0; k < args[key].length; k++){
//           if (!args[key][k] instanceof Date){
//             throw `${args[key]} must be typed as ${key}`
//           }
//         }
//       }
//       if (!typeof args[key] == key){
//         throw `${args[key]} must be typed as ${key}`
//       }
//     }
//   }

//   static validateIfEmpty(args){
//     let taskName = document.getElementById('nameId').value
//     let taskDate1 = document.getElementById('editDateStart').valueAsDate
//     let taskDate2 = document.getElementById('editDateEnd').valueAsDate
//     if (taskName.length == 0 && taskDate1.length == 0 && taskDate2.length == 0){
//       throw `fields must not be empty`
//     }
    
//   }

  
// }

function getNameId() {
  return document.querySelector('#nameId')
}


function isFieldValid(){
  //let taskName = document.getElementById('nameId')
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
  //let taskName = document.getElementById('nameId').value
  //let taskDate1 = document.getElementById('editDateStart').valueAsDate
  //let taskDate2 = document.getElementById('editDateEnd').valueAsDate 
  let inputFields = document.querySelectorAll("#nameId, #editDateStart, #editDateEnd")
  if (isFieldValid){
    //let singleTask = new Task(taskName, taskDate1, taskDate2)
    let singleTask = new Task(inputFields)
  }
  
})

