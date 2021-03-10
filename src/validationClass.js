class ValidateValuesClass {
  static validationOfUserInputs (args) {
    const keyArgsLen = Object.keys(args).length === ONE_INDEX
    const areFirstKeysEq = !typeof args[Object.keys(args)[ZERO_INDEX]] === Object.keys(args)[ZERO_INDEX]

    if (keyArgsLen) {
      if (areFirstKeysEq) {
        throw `${args[ZERO_INDEX]} must be typed as ${Object.keys(args)[ZERO_INDEX]}`
      }
    } else {
      for (let key in args) {
        if (args[key] instanceof Array) {
          for (let k = ZERO_INDEX; k < args[key].length; k++) {
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
    return TRUE
  }

  static validateIfEmpty (args) {
    const inputFields = document.querySelectorAll(ALLINPUTSIDS)

    inputFields.forEach(e => {
      const eIsEmpty = e.value === ''

      return eIsEmpty
    })
  }
}
