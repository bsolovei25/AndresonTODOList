class ValidateValuesClass {
  static validationOfUserInputs (args) {
    if (Object.keys(args).length === 1) {
      //проверить == вместо ===
      if (!typeof args[Object.keys(args)[0]] === Object.keys(args)[0]) {
        //проверить == вместо ===
        throw `${args[0]} must be typed as ${Object.keys(args)[0]}`
      }
    } else {
      for (let key in args) {
        if (args[key] instanceof Array) {
          for (let k = 0; k < args[key].length; k++) {
            if (args[key][k].type !== key) {
              //проверить == вместо ===
              throw `${args[key][k].value} must be typed as ${key}`
            }
          }
        }
        if (!typeof args[key].value === key) {
          throw `${args[key]} must be typed as ${key}`
        }
      }
    }
    return true
  }

  static validateIfEmpty (args) {
    const inputFields = document.querySelectorAll(ALLINPUTSIDS)
    inputFields.forEach(e => {
      if (e.value === '') {
        return false
      }
    })
    return true
  }
}
