class Task{
  constructor(args){
    if (args instanceof NodeList){
      if (ValidateValuesClass.validationOfUserInputs({'string':args[0], 'date':[args[1], args[2]]}) && 
      ValidateValuesClass.validateIfEmpty()){
        this.taskName = args[0].value;
        this.taskDate1 = args[1].value;
        this.taskDate2 = args[2].value;
      }
    }
    else{
      if (ValidateValuesClass.validationOfUserInputs({'string':arguments[0]}) && 
      ValidateValuesClass.validateIfEmpty('single')){
        this.taskName = arguments[0];
        this.taskDate1 = arguments[1];
        this.taskDate2 = arguments[2];
      }
    }
  }
}

function saveObj(object){ // добавление новой таски

  // Retrieve the object from storage
  let arrofTasks = []
  let retrievedObject = localStorage.getItem('SetofTasks');
  
  if (localStorage.getItem("SetofTasks") != null) {
    arrofTasks=JSON.parse(retrievedObject)
  }

  arrofTasks.push(object)
  // Put the object into storage
  localStorage.setItem('SetofTasks', JSON.stringify(arrofTasks));
  

}

function LoadObj(){
    // Retrieve the object from storage

    var retrievedObject = localStorage.getItem('SetofTasks');
    parsedObj = JSON.parse(retrievedObject); //получили из Л.С ерей тасок
    return parsedObj;
}



function getNameId() {
  return document.querySelector('#nameId')
}

function isTaskNameValid(){
  if (!getNameId().checkValidity() || getNameId().value == '' ){
    alert('Name shouldnt have symbols')
    location.reload();
  }
}


function isFieldValid(){
  if (!getNameId().checkValidity() || getNameId().value == '' || !areDatesValid()){
    alert('Name shouldnt have symbols')
    location.reload();
  }
  return true
}

function areDatesValid(){
  let dates = document.querySelectorAll("#editDateStart, #editDateEnd")
  dates.forEach(e => {if (e.value == "") {return false}})
  return true
}

getNameId().addEventListener("keydown", function (e) {
  if (e.key == 'Enter') {
    isTaskNameValid();
    let singleTask = new Task(document.querySelector('#nameId').value,getDay('today'),getDay('tomorrow'));
    saveObj(singleTask)
    location.reload()
  }
});

function getDay(todayTomorrow){
  const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    if (todayTomorrow == 'tomorrow'){
      dateObj.setDate(dateObj.getDate()+1)
    }
    //const month = monthNames[dateObj.getMonth()];
    
    let month = (dateObj.getMonth()+1).toString();
    if (month < 10){
      month = "0" + month;
    }
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    //const output = month  + '-'+ year  + '-' + day;
    const output = year  + '-'+ month  + '-' + day;
    return output
    //document.querySelector('.date').textContent = output; 
}

function clearTime(){
  let time = document.querySelectorAll("#editDateStart, #editDateEnd")
  time.forEach(e =>{e.value = ''})
}

function createNewTask(singleObject){
  let nodeContainer = document.querySelector(".container")

    let rowNewBlock = document.createElement("div");
    rowNewBlock.className = "row single-div";

    let Col5Div = document.createElement("div");
    Col5Div.className = "col-5";

    let GroupDiv = document.createElement("div");
    GroupDiv.className = 'input-group'

    let inputTaskName = document.createElement("INPUT");
    inputTaskName.setAttribute("type", "text");document.querySelector('#editDateEnd').valueAsDate
    //Потом нужно будет считывать из LS и ставить уникальный индетификатор
    inputTaskName.setAttribute("value", singleObject.taskName);
    inputTaskName.setAttribute("class", 'form-control');
    inputTaskName.setAttribute("readonly", true); 
    

    let Col2DivStart = document.createElement("div");
    Col2DivStart.setAttribute("class", 'col-2');

    let inputDateStartName = document.createElement("INPUT");
    inputDateStartName.setAttribute("type","date")
    //Потом нужно будет считывать из LS и ставить уникальный индетификатор
    inputDateStartName.setAttribute("name","name1")
    inputDateStartName.setAttribute("readonly", true); 
    inputDateStartName.setAttribute("value", singleObject.taskDate1); 
    /*if (document.querySelector("#editDateStart").value == '' && document.querySelector("#editDateEnd").value == ''){
      inputDateStartName.setAttribute("value", getDay('today'));
      //textContent
    }
    else{
      inputDateStartName.setAttribute("value", document.querySelector('#editDateStart').value);
    }
    */
   

    let Col2DivDue = document.createElement("div");
    Col2DivDue.setAttribute("class", 'col-2');

    let inputDateDueName = document.createElement("INPUT");
    inputDateDueName.setAttribute("type","date")
    //Потом нужно будет считывать из LS и ставить уникальный индетификатор
    inputDateDueName.setAttribute("name","name1")
    inputDateDueName.setAttribute("readonly", true); 
    inputDateDueName.setAttribute("value", singleObject.taskDate2);
    

    /*
    if (document.querySelector("#editDateStart").value == '' && document.querySelector("#editDateEnd").value == ''){
      inputDateDueName.setAttribute("value", getDay('tomorrow'));
      //textContent
    }
    else{
      inputDateDueName.setAttribute("value", document.querySelector('#editDateEnd').value);
    }
    */
    
    rowNewBlock.appendChild(Col5Div)
    Col5Div.appendChild(GroupDiv)
    GroupDiv.appendChild(inputTaskName)

    rowNewBlock.appendChild(Col2DivStart)
    Col2DivStart.appendChild(inputDateStartName)

    rowNewBlock.appendChild(Col2DivDue)
    Col2DivDue.appendChild(inputDateDueName)

    nodeContainer.appendChild(rowNewBlock)
    clearTime()
}

document.getElementById('ConfirmChanges').addEventListener('click',function(e){
  let inputFields = document.querySelectorAll("#nameId, #editDateStart, #editDateEnd")
  if (isFieldValid()){
    let singleTask = new Task(inputFields);
    saveObj(singleTask)
    location.reload();

  }
  
})

window.onload = function() {
  let arrofTasks = LoadObj()
  for (let i in arrofTasks){
    createNewTask(arrofTasks[i])
  }
  
}