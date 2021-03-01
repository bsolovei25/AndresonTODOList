//import { ZERO_INDEX, ONE_INDEX, TWO_INDEX, TEN_INDEX, FALSE, LSSTRING, TODAY, TOMORROW, SINGLE, NAMEID, ERRORINPUT, EDITDATESTARTEND, CROSS } from './constants'

class Task {
  constructor (args) {
    if (args instanceof NodeList) {
      if (ValidateValuesClass.validationOfUserInputs({ 'string':args[0], 'date':[args[1], args[2]] }) &&
      ValidateValuesClass.validateIfEmpty()) {
        this.taskName = args[0].value
        this.taskDate1 = args[1].value
        this.taskDate2 = args[2].value
        this.isChecked = FALSE
        if (LoadObj() === null) {
          this.taskId = ZERO_INDEX
        } else {
          this.taskId = LoadObj()[LoadObj().length - ONE_INDEX].taskId + ONE_INDEX
        }
      }
    } else {
      if (ValidateValuesClass.validationOfUserInputs({ 'string':arguments[0] }) &&
      ValidateValuesClass.validateIfEmpty(SINGLE)) {
        this.taskName = arguments[0]
        this.taskDate1 = arguments[1]
        this.taskDate2 = arguments[2]
        this.isChecked = FALSE
        if (LoadObj() == null) {
          this.taskId = ZERO_INDEX
        } else {
          this.taskId = LoadObj()[LoadObj().length - ONE_INDEX].taskId + ONE_INDEX
        }
      }
    }
  }
}

function isInputEmpty () {
  if (document.querySelector(NAMEID).value === '')
    document.querySelector('.plus-button').disabled = true
}

document.addEventListener('keyup', function (e) {
  if (e.target.validity.patternMismatch) {
    document.querySelector('.plus-button').disabled = true
  } else {
    document.querySelector('.plus-button').disabled = false
    if (document.querySelector('.errorMessage') !== null && document.querySelector(NAMEID).value !== '')
      //document.querySelector('.errorMessage').style.display = 'none'
      CONTAINER.children[0].removeChild(CONTAINER.children[0].childNodes[CONTAINER.children[0].childNodes.length - 1])
      //MODALELEMENTS[0].removeChild(MODALELEMENTS[0].children[MODALELEMENTS[0].children.length - 1])
  }
  isInputEmpty()
})

function isDateValid(e) {
  const dates = document.querySelectorAll('#editDateStart, #editDateEnd')
  let ok = true
  for (let i in dates) {
    if (dates[i].value === '') {
      document.querySelector('.classConfirm').disabled = true
      ok = false
      break
    }
  }
  if (ok) {
    document.querySelector('.classConfirm').disabled = false
    if (!areDatesValid()) {
      generateErrorModal()
    } else {
      if (document.querySelector('.errorMessageModal') !== null) {
        MODALELEMENTS[0].removeChild(MODALELEMENTS[0].children[MODALELEMENTS[0].children.length - 1])
      }
    }
  }
}

function saveObj (object) { // добавление новой таски
  // Retrieve the object from storage
  let arrofTasks = []
  const retrievedObject = localStorage.getItem(LSSTRING)
  if (localStorage.getItem(LSSTRING) !== null) {
    arrofTasks = JSON.parse(retrievedObject)
  }

  arrofTasks.push(object)
  // Put the object into storage
  localStorage.setItem(LSSTRING, JSON.stringify(arrofTasks))
}

function LoadObj () {
  // Retrieve the object from storage
  const retrievedObject = localStorage.getItem(LSSTRING)
  const parsedObj = JSON.parse(retrievedObject) //получили из Л.С ерей тасок
  return parsedObj
}

function getNameId () {
  return document.querySelector(NAMEID)
}

function generateErrorMainBlock () {
  if (getNameId().validity.patternMismatch ||
  getNameId().validity.valueMissing) {
    if (document.querySelector('.errorMessage') !== null) {
      return false
    }
    let row = document.createElement('div')
    row.className = 'row single-div border errorMessage'
    row.setAttribute('style', 'background-color: red;')

    //userInput.setCustomValidity(ERRORINPUT)
    let errorMessage = document.createElement('p')

    errorMessage.textContent = 'This text is different!'
    //errorMessage.setAttribute('style', 'background-color: red;')
    errorMessage.setAttribute('style', 'width: 15%;background-color: red;z-index:4;top:500px;')
    row.appendChild(errorMessage)
    CONTAINER.children[0].appendChild(row)
    document.querySelectorAll('.plus-button')[0].disabled = true
    return false
  }
  document.querySelectorAll('.plus-button')[0].disabled = false

  return true
}

function generateErrorModal () {
  const modalbody = document.querySelectorAll('.modal-error')
  const errordiv = document.createElement('div')
  errordiv.className = 'row single-div border errorMessageModal'
  errordiv.setAttribute('style', 'background-color: red;')
  let errorMessage = document.createElement('p')
  errorMessage.textContent = 'The finishing date cant be earlier than the strarting'
  modalbody[0].appendChild(errordiv)
  errordiv.appendChild(errorMessage)
  document.querySelector('.classConfirm').disabled = true
}

function isTaskNameValid () {
  /*if (userInput.validity.patternMismatch ||
    userInput.validity.valueMissing) {
    generateErrorMainBlock()
    return false
  } else {
    userInput.setCustomValidity('')
  }
  return true*/
  return generateErrorMainBlock()
  //alert('Name shouldnt have symbols')
  //location.reload()
}

function isFieldValid () {
  return generateErrorModal()
}

function areDatesValid () {
  const date = document.querySelectorAll(EDITDATESTARTEND)
  if (date[ONE_INDEX].valueAsNumber > date[ZERO_INDEX].valueAsNumber) {
    return true
  }
  return false
}

getNameId().addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    //проверить == вместо ===
    if (isTaskNameValid()) {
      let singleTask = new Task(document.querySelector(NAMEID).value, getDay(TODAY), getDay(TOMORROW))
      saveObj(singleTask)
      location.reload()
    }
  }
})

function getDay (todayTomorrow) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const dateObj = new Date()
  if (todayTomorrow === TOMORROW) {
    //проверить == вместо ===
    dateObj.setDate(dateObj.getDate() + ONE_INDEX)
  }
  let month = (dateObj.getMonth() + ONE_INDEX).toString()
  if (month < TEN_INDEX) {
    month = '' + ZERO_INDEX + month
  }
  const day = String(dateObj.getDate()).padStart(TWO_INDEX, '' + ZERO_INDEX)
  const year = dateObj.getFullYear()
  const output = year + '-' + month + '-' + day
  return output
}

function clearTime () {
  const time = document.querySelectorAll(EDITDATESTARTEND)
  time.forEach(e => {
    e.value = ''
  })
}

function createNewTask (singleObject) {
  let rowNewBlock = document.createElement('div')
  rowNewBlock.className = 'row single-div'

  let Col1DivCheck = document.createElement('div')
  Col1DivCheck.className = 'col-1'
  let FormCheck = document.createElement('div')
  FormCheck.className = 'form-check'
  let inputCheckBox = document.createElement('INPUT')

  inputCheckBox.setAttribute('type', 'checkbox')
  //Потом нужно будет считывать из LS и ставить уникальный индетификатор
  inputCheckBox.setAttribute('value', '')
  inputCheckBox.setAttribute('id', `form-check-input-id${singleObject.taskId}`)
  inputCheckBox.setAttribute('class', 'form-check-input')
  inputCheckBox.checked = (singleObject.isChecked === 'true')
  //проверить == вместо ===

  let Col4Div = document.createElement('div')
  Col4Div.className = 'col-4'

  let GroupDiv = document.createElement('div')
  GroupDiv.className = 'input-group'

  let inputTaskName = document.createElement('INPUT')
  inputTaskName.setAttribute('type', 'text')
  //Потом нужно будет считывать из LS и ставить уникальный индетификатор
  inputTaskName.setAttribute('value', singleObject.taskName)
  inputTaskName.setAttribute('class', 'form-control')
  inputTaskName.setAttribute('readonly', true)
  if (singleObject.isChecked === 'true') {
    //проверить == вместо ===
    inputTaskName.style.textDecoration = 'line-through'
  } else {
    inputTaskName.style.textDecoration = ''
  }

  let Col2DivStart = document.createElement('div')
  Col2DivStart.setAttribute('class', 'col-2')

  let inputDateStartName = document.createElement('INPUT')
  inputDateStartName.setAttribute('type', 'date')
  inputDateStartName.setAttribute('name', 'name1')
  inputDateStartName.setAttribute('readonly', true)
  inputDateStartName.setAttribute('value', singleObject.taskDate1)

  let Col2DivDue = document.createElement('div')
  Col2DivDue.setAttribute('class', 'col-2')

  let inputDateDueName = document.createElement('INPUT')
  inputDateDueName.setAttribute('type', 'date')
  inputDateDueName.setAttribute('name', 'name1')
  inputDateDueName.setAttribute('readonly', true)
  inputDateDueName.setAttribute('value', singleObject.taskDate2)

  let But1Div = document.createElement('div')
  But1Div.setAttribute('class', 'col-1')
  let Span1Font = document.createElement('span')
  let I1Font = document.createElement('i')
  I1Font.setAttribute('class', CROSS)
  I1Font.setAttribute('aria-hidden', 'true')
  I1Font.setAttribute('id', `delete${singleObject.taskId}`)

  let Edit1Div = document.createElement('div')
  Edit1Div.setAttribute('class', 'col-1')
  let Span1Edit = document.createElement('span')
  let I1Edit = document.createElement('i')
  I1Edit.setAttribute('class', 'fa fa-pencil')
  I1Edit.setAttribute('aria-hidden', 'true')
  I1Edit.setAttribute('id', `edit${singleObject.taskId}`)
  I1Edit.setAttribute('data-target', '#ModalEdit')
  I1Edit.setAttribute('data-toggle', 'modal')

  rowNewBlock.appendChild(Col1DivCheck)
  Col1DivCheck.appendChild(FormCheck)
  FormCheck.appendChild(inputCheckBox)

  rowNewBlock.appendChild(Col4Div)
  Col4Div.appendChild(GroupDiv)
  GroupDiv.appendChild(inputTaskName)

  rowNewBlock.appendChild(Col2DivStart)
  Col2DivStart.appendChild(inputDateStartName)

  rowNewBlock.appendChild(Col2DivDue)
  Col2DivDue.appendChild(inputDateDueName)

  rowNewBlock.appendChild(But1Div)
  But1Div.appendChild(Span1Font)
  Span1Font.appendChild(I1Font)

  rowNewBlock.appendChild(Edit1Div)
  Edit1Div.appendChild(Span1Edit)
  Span1Edit.appendChild(I1Edit)

  CONTAINER.appendChild(rowNewBlock)

  clearTime()
}

document.addEventListener('click', function (e) {
  let currectTasks = LoadObj()
  for (let i in currectTasks) {
    if (e.target.className === CROSS) {
      //проверить == вместо ===
      if (getLastLetterId(e.target.id) === '' + currectTasks[i].taskId) {
        //проверить == вместо ===
        currectTasks.splice(i, 1)
        localStorage.setItem(LSSTRING, JSON.stringify(currectTasks))
        location.reload()
      }
    }
  }
  if (e.target.className === 'btn btn-primary classConfirm') {
    const inputFields = document.querySelectorAll('#nameId, #editDateStart, #editDateEnd')
    const singleTask = new Task(inputFields)
    saveObj(singleTask)
    location.reload()
  }
  /*  if (e.target.className === 'btn btn-primary plus-button') {
    if (!generateErrorMainBlock()) {
      break
    }
  } */
})

/*  document.getElementById('ConfirmChanges').addEventListener('click', function () {
  let inputFields = document.querySelectorAll('#nameId, #editDateStart, #editDateEnd')
  if (isFieldValid()) {
    let singleTask = new Task(inputFields)
    saveObj(singleTask)
    location.reload()
  }
})  */

function getLastLetterId (stringId) {
  return stringId.substr(stringId.length - 1)
}

document.addEventListener('change', function (e) {
  //e.target.parentNode.parentNode.parentNode.children[1]
  (e.target.id).substr(e.target.id.length - 1)
  let currectTasks = LoadObj()
  for (let i in currectTasks) {
    if (getLastLetterId(e.target.id) === currectTasks[i].taskId) {
      //проверить == вместо ===
      if (currectTasks[i].isChecked === 'false') {
        //проверить == вместо ===
        currectTasks[i].isChecked = 'true'
      } else {
        currectTasks[i].isChecked = 'false'
      }
      localStorage.setItem(LSSTRING, JSON.stringify(currectTasks))
      location.reload()
    }
  }
})

window.onload = function () {
  let arrofTasks = LoadObj()
  for (let i in arrofTasks) {
    createNewTask(arrofTasks[i])
  }
}
