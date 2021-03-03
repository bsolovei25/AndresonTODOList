class ValidateValuesClass {
  static validationOfUserInputs (args) {
    const keyArgsLen = Object.keys(args).length === 1
    const areFirstKeysEq = !typeof args[Object.keys(args)[0]] === Object.keys(args)[0]

    if (keyArgsLen) {
      if (areFirstKeysEq) {
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
    return TRUE
  }

  static validateIfEmpty (args) {
    const inputFields = document.querySelectorAll(ALLINPUTSIDS)

    inputFields.forEach(e => {
      const eIsEmpty = e.value === ''

      if (eIsEmpty) {
        return FALSEV
      }
    })
    return TRUE
  }
}
