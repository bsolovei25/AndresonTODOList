class ValidateValuesClass{
  static validationOfUserInputs(args){
    for (let key in args){
      if (args[key] instanceof Array){
        for (let k = 0; k < args[key].length; k++){
          if (args[key][k].type != key){
            throw `${args[key][k].value} must be typed as ${key}`
          }
        }
      }
      if (!typeof args[key].value == key){
        throw `${args[key]} must be typed as ${key}`
      }
    }
  }

  static validateIfEmpty(){
    let inputFields = document.querySelectorAll("#nameId, #editDateStart, #editDateEnd")
    inputFields.forEach(e => {if (e.value==''){'fields must not be empty'}})
  }

  
}