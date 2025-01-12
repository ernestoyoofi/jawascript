const sourceReplace = require("./source-defined")

function TranslateScript(source) {
  if(typeof source != "string") {
    throw new Error("Ga bakal biso translate source iki!")
  }
  let dataScript = source
  for(let [regexCode, contentRes] of sourceReplace) {
    dataScript = dataScript.replace(regexCode, contentRes)
  }
  return {
    res: dataScript
  }
}

module.exports = TranslateScript
