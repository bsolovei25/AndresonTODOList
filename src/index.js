class Task {
  constructor (args) {
    const instanceNode = args instanceof NodeList
    if (instanceNode) {
      const [{ value: taskName }, { value: taskDate1 }, { value: taskDate2 }] = args
      const [string, ...date] = args

      if (this.inputUserValidation({ string, date })) {
        [this.taskName, this.taskDate1, this.taskDate2] = [taskName, taskDate1, taskDate2]
        this.isChecked = FALSESTRING
        this.access = ACCESSALL
        this.checkIfTaskIdEmpty()
        this.sortBy = NONEVALUE
        this.filteredTask = null
        this.filteredDate1 = null
        this.filteredDate2 = null
      }
    } else {
      const [string] = arguments
      if (this.inputUserValidation({ string })) {
        [this.taskName, this.taskDate1, this.taskDate2] = arguments
        this.isChecked = FALSESTRING
        this.access = ACCESSALL
        this.checkIfTaskIdEmpty()
        this.sortBy = NONEVALUE
        this.filteredTask = null
        this.filteredDate1 = null
        this.filteredDate2 = null
      }
    }
  }

  inputUserValidation (params) {
    if (ValidateValuesClass.validationOfUserInputs(params) &&
      ValidateValuesClass.validateIfEmpty()) {
      return true
    }
    return false
  }

  checkIfTaskIdEmpty () {
    const loadedArray = LoadObj()
    const isNull = loadedArray == null || loadedArray.length === 0

    if (isNull) {
      this.taskId = ZERO_INDEX
    } else {
      const dbLength = loadedArray.length - ONE_INDEX

      this.taskId = loadedArray[dbLength].taskId + ONE_INDEX
    }
  }
}

function isInputEmpty (id) {
  if (id === NAMEIDNAME) {
    const namaidIsNone = document.querySelector(NAMEID).value === ''
    if (namaidIsNone)
      document.querySelector(PLUSBUTTON).disabled = TRUE
  } else {
    const namaidIsNone = document.querySelector(IDEDITINPUTTEXT).value === ''
    if (namaidIsNone)
      document.querySelector(CLASSCONFIRMCHANGES).disabled = TRUE
  }
}

document.addEventListener(KEYUP, function (e) {
  let deleteDivRed
  let childNodesValue
  const dates = document.querySelectorAll(CHANGEDATESTARTEND)
  const ePatternMisMatch = e.target.validity.patternMismatch
  if (e.target.id === NAMEIDNAME) {
    deleteDivRed = document.querySelector(ENTERERROR) !== null && document.querySelector(NAMEID).value !== ''
    childNodesValue = CONTAINER.children[0].childNodes
    if (ePatternMisMatch) {//CLASSCONFIRMCHANGES
      document.querySelector(PLUSBUTTON).disabled = TRUE
    } else {
      document.querySelector(PLUSBUTTON).disabled = FALSEV
      if (deleteDivRed) {
        CONTAINER.children[ZERO_INDEX].removeChild(childNodesValue[childNodesValue.length - ONE_INDEX])
      }
    }
  }
  if (e.target.id === IDEDITINPUTTEXTSTRING) {
    deleteDivRed = document.querySelector(ERRORMESSAGEMODALCHANGE) !== null && document.querySelector(IDEDITINPUTTEXT).value !== ''
    childNodesValue = MODALELEMENTSCHANGE[0].children
    if (ePatternMisMatch) {//CLASSCONFIRMCHANGES
      document.querySelector(CLASSCONFIRMCHANGES).disabled = TRUE
    } else {
      if (showBiggerNum(dates)) {
        document.querySelector(CLASSCONFIRMCHANGES).disabled = FALSEV
        if (deleteDivRed) {
          MODALELEMENTSCHANGE[ZERO_INDEX].removeChild(childNodesValue[childNodesValue.length - ONE_INDEX])
        }
      }
    }
  }
  //const deleteDivRed = document.querySelector(ENTERERROR) !== null && document.querySelector(NAMEID).value !== ''

  isInputEmpty(e.target.id)
})

function isChangeDateValid(e) {
  const dates = document.querySelectorAll(CHANGEDATESTARTEND)
  let ok = TRUE
  const errorMessageModalNotNull = document.querySelector(ERRORMESSAGEMODALCHANGE) !== null//Доправить ERRORDIVCLASSNAMECHANGE
  const modalElementChildren = MODALELEMENTSCHANGE[0].children
  const AllInputsValid = areDatesValid(CHANGE) || ValidateInputChange()
  const CreateErrorMessageBox = !(!AllInputsValid || errorMessageModalNotNull)
  const ErrorMessageBoxDelete = !(AllInputsValid || !errorMessageModalNotNull)
  //Завтра проверить на валидность все в ченже

  if (CreateErrorMessageBox) {
    document.querySelector(CLASSCONFIRMCHANGES).disabled = TRUE
    generateErrorModal(CHANGE)
  } else {
    if (ErrorMessageBoxDelete) {
      MODALELEMENTSCHANGE[ZERO_INDEX].removeChild(modalElementChildren[modalElementChildren.length - ONE_INDEX])
      document.querySelector(CLASSCONFIRMCHANGES).disabled = FALSEV
    }
  }
}

function isDateValid (e) {
  const dates = document.querySelectorAll(EDITDATESTARTEND)
  let ok = TRUE
  const errorMessageModalNotNull = document.querySelector(ERRORMESSAGEMODAL) !== null
  const modalElementChildren = MODALELEMENTS[0].children
  const datesValidAndModalExistAdd = !areDatesValid(INSERT) || errorMessageModalNotNull
  const datesValidAndModalExistRemove = !areDatesValid(INSERT) && errorMessageModalNotNull

  for (let i in dates) {
    if (dates[i].value === '') {
      document.querySelector(CLASSCONFIRM).disabled = TRUE
      ok = FALSEV
      break
    }
  }
  if (ok) {
    document.querySelector(CLASSCONFIRM).disabled = FALSEV
    if (!datesValidAndModalExistAdd) {
      generateErrorModal(INSERT)
    } else {
      if (datesValidAndModalExistRemove) {
        MODALELEMENTS[ZERO_INDEX].removeChild(modalElementChildren[modalElementChildren.length - ONE_INDEX])
        //document.querySelector(CLASSCONFIRM).disabled = FALSEV
      }
    }
  }
}

function saveObj (object) { // добавление новой таски
  // Retrieve the object from storage
  let arrofTasks = []
  let finalArray = []

  const retrievedObject = localStorage.getItem(LSSTRING)

  if (retrievedObject !== null) {
    arrofTasks = JSON.parse(retrievedObject)
  }
  finalArray = [...arrofTasks, object]
  // Put the object into storage
  localStorage.setItem(LSSTRING, JSON.stringify(finalArray))
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

function getIdInputText () {
  return document.querySelector(IDEDITINPUTTEXT)
}

function ValidateInputChange () {
  const ifValidityTrue = getIdInputText().validity.patternMismatch ||
  getIdInputText().validity.valueMissing

  return ifValidityTrue
}

function generateErrorMainBlock () {
  const ifValidityTrue = getNameId().validity.patternMismatch ||
  getNameId().validity.valueMissing
  const errorMessageNull = document.querySelector(ENTERERROR) !== null

  if (ifValidityTrue) {
    if (errorMessageNull) {
      return FALSEV
    }
    let row = document.createElement(DIVSTRING)
    row.className = ROWCLASSNAME
    row.setAttribute(STYLE, ROWSTYLE)
    let errorMessage = document.createElement(PSTRING)

    errorMessage.textContent = ERRORMESSAGE
    errorMessage.setAttribute(STYLE, errorMessageStyle)
    row.appendChild(errorMessage)
    CONTAINER.children[ZERO_INDEX].appendChild(row)
    document.querySelectorAll(PLUSBUTTON)[ZERO_INDEX].disabled = TRUE

    return FALSEV
  }
  document.querySelectorAll(PLUSBUTTON)[ZERO_INDEX].disabled = FALSEV

  return TRUE
}

function generateErrorModal (modalchoose) {
  let modalbody
  const errordiv = document.createElement(DIVSTRING)
  const errorMessage = document.createElement(PSTRING)

  if (modalchoose == INSERT) {
    modalbody = MODALELEMENTS
    document.querySelector(CLASSCONFIRM).disabled = TRUE
    errordiv.className = ERRORDIVCLASSNAME
  } else {
    modalbody = MODALELEMENTSCHANGE
    document.querySelector(CLASSCONFIRMCHANGES).disabled = TRUE
    errordiv.className = ERRORDIVCLASSNAMECHANGE
  }

  errordiv.setAttribute(STYLE, BGCOLOR)
  errorMessage.textContent = ERRORMESSAGECONTENT
  modalbody[0].appendChild(errordiv)
  errordiv.appendChild(errorMessage)
}

function isTaskNameValid () {
  return generateErrorMainBlock()
}

function isFieldValid () {
  return generateErrorModal()
}

function showBiggerNum (date) {
  return date[ONE_INDEX].valueAsNumber > date[ZERO_INDEX].valueAsNumber
}

function areDatesValid (modalExists) {
  let ifFinishBiggerThanStart

  if (modalExists === INSERT) {
    const date = document.querySelectorAll(EDITDATESTARTEND)
    ifFinishBiggerThanStart = showBiggerNum(date)
  } else {
    const date = document.querySelectorAll(CHANGEDATESTARTEND)
    ifFinishBiggerThanStart = showBiggerNum(date)
  }
  if (!ifFinishBiggerThanStart) {
    return TRUE
  }
  return FALSEV
}

getNameId().addEventListener(KEYDOWN, function (e) {
  if (e.key === ENTER) {
    if (isTaskNameValid()) {
      let singleTask = new Task(document.querySelector(NAMEID).value, getDay(TODAY), getDay(TOMORROW))
      saveObj(singleTask)
      location.reload()
    }
  }
})

function getDay (todayTomorrow) {
  const dateObj = new Date()

  if (todayTomorrow === TOMORROW) {
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

function RowNewBLockCreate (style) {
  let rowNewBlock = document.createElement(DIVSTRING)
  rowNewBlock.className = ROWSINGLEDIV
  rowNewBlock.setAttribute(STYLE, style)
  //errorMessage.setAttribute(STYLE, errorMessageStyle)
  return rowNewBlock
}

function checkBoxCreate (singleObject) {
  let Col1DivCheck = document.createElement(DIVSTRING)
  Col1DivCheck.className = COL1DIVCHECK
  let FormCheck = document.createElement(DIVSTRING)
  FormCheck.className = FORMCHECK
  let inputCheckBox = document.createElement(INPUT)

  inputCheckBox.setAttribute(TYPE, CHECKBOX)
  //Потом нужно будет считывать из LS и ставить уникальный индетификатор
  inputCheckBox.setAttribute(VALUE, '')
  inputCheckBox.setAttribute(ID, `form-check-input-id${singleObject.taskId}`)
  inputCheckBox.setAttribute(CLASS, FORMCHECKINPUT)
  inputCheckBox.checked = (singleObject.isChecked === TRUESTRING)
  Col1DivCheck.appendChild(FormCheck)
  FormCheck.appendChild(inputCheckBox)
  return Col1DivCheck
}

function checkInputCreate (singleObject) {
  let Col4Div = document.createElement(DIVSTRING)
  Col4Div.className = COL4DIVCHECK

  let GroupDiv = document.createElement(DIVSTRING)
  GroupDiv.className = IPUTGROUP

  let inputTaskName = document.createElement(INPUT)
  inputTaskName.setAttribute(TYPE, TEXT)
  //Потом нужно будет считывать из LS и ставить уникальный индетификатор
  inputTaskName.setAttribute(VALUE, singleObject.taskName)
  inputTaskName.setAttribute(ID, `createInput${singleObject.taskId}`)
  inputTaskName.setAttribute(CLASS, FORMCONTROL)
  inputTaskName.setAttribute(READONLY, TRUE)
  if (singleObject.isChecked === TRUESTRING) {
    inputTaskName.style.textDecoration = LINETHROUGH
  } else {
    inputTaskName.style.textDecoration = ''
  }
  Col4Div.appendChild(GroupDiv)
  GroupDiv.appendChild(inputTaskName)
  return Col4Div
}

function Date1Create (singleObject) {
  let Col2DivStart = document.createElement(DIVSTRING)
  Col2DivStart.setAttribute(CLASS, COL2DIVCHECK)

  let inputDateStartName = document.createElement(INPUT)
  inputDateStartName.setAttribute(TYPE, DATE)
  inputDateStartName.setAttribute(NAME, NAME1)
  inputDateStartName.setAttribute(ID, `createInputDateStart${singleObject.taskId}`)
  inputDateStartName.setAttribute(READONLY, TRUE)
  inputDateStartName.setAttribute(VALUE, singleObject.taskDate1)
  Col2DivStart.appendChild(inputDateStartName)
  return Col2DivStart
}

function Date2Create (singleObject) {
  let Col2DivDue = document.createElement(DIVSTRING)
  Col2DivDue.setAttribute(CLASS, COL2DIVCHECK)

  let inputDateDueName = document.createElement(INPUT)
  inputDateDueName.setAttribute(TYPE, DATE)
  inputDateDueName.setAttribute(NAME, NAME1)
  inputDateDueName.setAttribute(ID, `createInputDateDue${singleObject.taskId}`)
  inputDateDueName.setAttribute(READONLY, TRUE)
  inputDateDueName.setAttribute(VALUE, singleObject.taskDate2)
  Col2DivDue.appendChild(inputDateDueName)
  return Col2DivDue
}

function CrossCreate (singleObject) {
  let But1Div = document.createElement(DIVSTRING)
  But1Div.setAttribute(CLASS, COL1DIVCHECK)
  let Span1Font = document.createElement(SPAN)
  let I1Font = document.createElement(I)
  I1Font.setAttribute(CLASS, CROSS)
  I1Font.setAttribute(ARIAHIDDEN, TRUESTRING)
  I1Font.setAttribute(ID, `delete${singleObject.taskId}`)
  But1Div.appendChild(Span1Font)
  Span1Font.appendChild(I1Font)
  return But1Div
}

function PenCreate (singleObject) {
  let Edit1Div = document.createElement(DIVSTRING)
  Edit1Div.setAttribute(CLASS, COL1DIVCHECK)
  let Span1Edit = document.createElement(SPAN)
  let I1Edit = document.createElement(I)
  I1Edit.setAttribute(CLASS, FAFAPENCIL)
  I1Edit.setAttribute(ARIAHIDDEN, TRUESTRING)
  I1Edit.setAttribute(ID, `edit${singleObject.taskId}`)
  I1Edit.setAttribute(DATATARGET, MODALEDIT)
  I1Edit.setAttribute(DATATOGGLE, MODAL)
  Edit1Div.appendChild(Span1Edit)
  Span1Edit.appendChild(I1Edit)
  return Edit1Div
}

function FilterCreate (singleObject) {
  let Edit1Div = document.createElement(DIVSTRING)
  Edit1Div.setAttribute(CLASS, COL1DIVCHECK)
  let Span1Edit = document.createElement(SPAN)
  let I1Edit = document.createElement(I)
  I1Edit.setAttribute(CLASS, SORT)
  I1Edit.setAttribute(ARIAHIDDEN, TRUESTRING)
  I1Edit.setAttribute(ID, `filter${singleObject.taskId}`)
  I1Edit.setAttribute(DATATARGET, MODALFILTER)//change
  I1Edit.setAttribute(DATATOGGLE, MODAL)//
  Edit1Div.appendChild(Span1Edit)
  Span1Edit.appendChild(I1Edit)
  return Edit1Div
}

function BuildNewRow (rowNewBlock, Col1DivCheck, Col4Div, Col2DivStart, Col2DivDue, But1Div, Edit1Div, Filter1Div) {
  rowNewBlock.appendChild(Col1DivCheck)
  rowNewBlock.appendChild(Col4Div)
  rowNewBlock.appendChild(Col2DivStart)
  rowNewBlock.appendChild(Col2DivDue)
  rowNewBlock.appendChild(But1Div)
  rowNewBlock.appendChild(Edit1Div)
  rowNewBlock.appendChild(Filter1Div)
  CONTAINER.appendChild(rowNewBlock)
}

function accessRights (singleObject) {
  const currectTasks = LoadObj()
  let ok = TRUE
  if (singleObject.access === ACCESSALL && ok) {
    ok = false
    createNewTask(singleObject, FLEX)
  }
  if (singleObject.access === ACCESSACTIVE && singleObject.isChecked === FALSESTRING && ok) {
    createNewTask(singleObject, FLEX)
    ok = false
  }
  if (singleObject.access === ACCESSCOMPLETED && singleObject.isChecked === TRUESTRING && ok) {
    createNewTask(singleObject, FLEX)
    ok = false
  }
  if (singleObject.access === ACCESSDELETE) {
    if (singleObject.isChecked === TRUESTRING && ok) {
      ok = false
      //const indexId = currectTasks.indexOf(singleObject)
      const indexId = currectTasks.findIndex(function(post, index) {
        if (post.isChecked === TRUESTRING) {
          return true
        }
      })
      deleteByIndex(currectTasks, indexId)
    } else {
      createNewTask(singleObject, FLEX)
      ok = false
    }
  }
  if (ok) {
    createNewTask(singleObject, NONE)
  }
}

function createNewTask (singleObject, style) {
  const rowNewBlock = RowNewBLockCreate(style)
  const Col1DivCheck = checkBoxCreate(singleObject)
  const Col4Div = checkInputCreate(singleObject)
  const Col2DivStart = Date1Create(singleObject)
  const Col2DivDue = Date2Create(singleObject)
  const But1Div = CrossCreate(singleObject)
  const Edit1Div = PenCreate(singleObject)
  const Filter1Div = FilterCreate(singleObject)
  BuildNewRow(rowNewBlock, Col1DivCheck, Col4Div, Col2DivStart, Col2DivDue, But1Div, Edit1Div, Filter1Div)
  clearTime()
}

function deleteByIndex (currectTasks, index) {
  currectTasks.splice(index, 1)
  localStorage.setItem(LSSTRING, JSON.stringify(currectTasks))
}

function addElementById (currectTasks, index, element) {
  currectTasks.splice(index, 0, element)
  localStorage.setItem(LSSTRING, JSON.stringify(currectTasks))
  location.reload()
}

document.addEventListener(CLICK, function (e) {
  let currectTasks = LoadObj()
  const className = e.target.className
  const idName = e.target.id

  for (let i in currectTasks) {
    if (className === CROSS) {
      if (getLastLetterId(idName) === '' + currectTasks[i].taskId) {
        deleteByIndex(currectTasks, i)
        location.reload()
      }
    }
  }
  if (className === BUTTONCLASSCONFIRM) {
    const inputFields = document.querySelectorAll(ALLIDS)
    const singleTask = new Task(inputFields)
    saveObj(singleTask)
    location.reload()
  }
  if (className === BUTTONCLASSCONFIRMCHANGES) {
    const currectTasks = LoadObj()
    const index = currectTasks.find(element => { return '' + element.taskId === getLastLetterId(e.target.offsetParent.className) })
    const indexId = currectTasks.indexOf(index)
    const inputFields = document.querySelectorAll(ALLIDSCHANGE)
    const [{ value: taskName }, { value: taskDate1 }, { value: taskDate2 }] = inputFields

    index.taskName = taskName
    index.taskDate1 = taskDate1
    index.taskDate2 = taskDate2
    deleteByIndex(currectTasks, indexId)
    addElementById(currectTasks, indexId, index)
  }
  if (className === FAFAPENCIL) {
    const elementId = getLastLetterId(e.target.id)
    const inputFieldsTaskName = document.querySelector(IDEDITINPUTTEXT)
    const inputFieldsTaskDate1 = document.querySelector('#' + CHANGEEDITABLEDATESTART)
    const inputFieldsTaskDate2 = document.querySelector('#' + CHANGEEDITABLEDATEEND)
    const cretatedInputName = document.querySelector('#' + CREATEDINPUTNAME + elementId).value
    const cretatedInputDate1 = document.querySelector('#' + CREATEINPUTDATESTART + elementId).value
    const cretatedInputDate2 = document.querySelector('#' + CREATEINPUTDATEDUE + elementId).value
    const modalChangeId = document.querySelector('.' + MODALCHANGE)

    inputFieldsTaskName.value = cretatedInputName
    inputFieldsTaskDate1.value = cretatedInputDate1
    inputFieldsTaskDate2.value = cretatedInputDate2
    modalChangeId.className = MODALFULLCLASSNAME + elementId
  }
  if (className === SHOWALLBUTTONS) {
    const containerTasks = LoadObj()
    containerTasks.forEach(elem => { elem.access = ACCESSALL })
    localStorage.setItem(LSSTRING, JSON.stringify(containerTasks))
    location.reload()
  }
  if (className === SHOWALLACTIVEBUTTONS) {
    const containerTasks = LoadObj()
    containerTasks.forEach(elem => { elem.access = ACCESSACTIVE })
    localStorage.setItem(LSSTRING, JSON.stringify(containerTasks))
    location.reload()
  }
  if (className === SHOWALLCOMPLETEDBUTTONS) {
    const containerTasks = LoadObj()
    containerTasks.forEach(elem => { elem.access = ACCESSCOMPLETED })
    localStorage.setItem(LSSTRING, JSON.stringify(containerTasks))
    location.reload()
  }
  if (className === DELETEALLCOMPLETEDBUTTONS) {
    const containerTasks = LoadObj()
    containerTasks.forEach(elem => { elem.access = ACCESSDELETE })
    localStorage.setItem(LSSTRING, JSON.stringify(containerTasks))
    location.reload()
  }
  if (className === CLASSCONFIRMFILTER) {
    const getSelectEl = document.querySelector(SELECTSORTID)
    const selectedValue = getSelectEl.options[getSelectEl.selectedIndex].value
    const containerTasks = LoadObj()
    const taskConst = document.querySelector(CLASSFILTERINPUTTEXT).value
    const date1Const = document.querySelector(FILTEREDITABLEDATESTART).value
    const date2Const = document.querySelector(FILTEREDITABLEDATEEND).value
    const filterTask = taskConst === '' ? null : taskConst
    const filterDate1 = date1Const === '' ? null : date1Const
    const filterDate2 = date2Const === '' ? null : date2Const

    containerTasks.forEach(elem => { [elem.sortBy, elem.filteredTask, elem.filteredDate1, elem.filteredDate2] = [selectedValue, filterTask, filterDate1, filterDate2] })
    localStorage.setItem(LSSTRING, JSON.stringify(containerTasks))
    location.reload()
  }
})

function getLastLetterId (stringId) {
  return stringId.substr(stringId.length - 1)
}

document.addEventListener(CHANGE, function (e) {
  (e.target.id).substr(e.target.id.length - 1)
  let currectTasks = LoadObj()
  for (let i in currectTasks) {
    if (getLastLetterId(e.target.id) === '' + currectTasks[i].taskId) {
      //проверить == вместо ===
      if (currectTasks[i].isChecked === FALSESTRING) {
        //проверить == вместо ===
        currectTasks[i].isChecked = TRUESTRING
      } else {
        currectTasks[i].isChecked = FALSESTRING
      }
      localStorage.setItem(LSSTRING, JSON.stringify(currectTasks))
      location.reload()
    }
  }
})

function sortTasksFirst (firstElem) {
  return firstElem.taskName.toUpperCase()
}

function sortTasksSecond (secondElem) {
  return secondElem.taskName.toUpperCase()
}

function sortDatesFirst (firstElem) {
  return Date.parse(firstElem.taskDate1)
}

function sortDatesSecond (secondElem) {
  return Date.parse(secondElem.taskDate1)
}

function compare (firstElem, secondElem) {
  const arrofTasks = LoadObj()
  const arrayLength = arrofTasks.length - 1
  const sortingOption = arrofTasks[arrayLength].sortBy

  //const elemA = firstElem.taskName.toUpperCase()
  //const elemB = secondElem.taskName.toUpperCase()
  if (sortingOption !== NONEVALUE) {
    let elemA
    let elemB
    switch (sortingOption) {
      case SORTTASKS:
        elemA = sortTasksFirst(firstElem)
        elemB = sortTasksSecond(secondElem)
        break
      case SORTDATES:
        elemA = sortDatesFirst(firstElem)
        elemB = sortDatesSecond(secondElem)
        break
    }
    let comparison = 0
    if (elemA > elemB) {
      comparison = 1
    } else if (elemA < elemB) {
      comparison = -1
    }
    return comparison
  }
}

window.onload = function () {
  const arrofTasks = LoadObj()
  const filteredArray = arrofTasks.filter(element => element.taskName.indexOf(element.filteredTask) + ONE_INDEX || element.taskDate1 === element.filteredDate1 || element.taskDate2 === element.filteredDate2)

  arrofTasks.sort(compare)
  if (filteredArray.length === ZERO_INDEX) {
    for (let i in arrofTasks) {
      accessRights(arrofTasks[i])
    }
  } else {
    for (let i in filteredArray) {
      accessRights(filteredArray[i])
    }
  }
}
