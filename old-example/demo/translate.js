function TranslateScript(source) {
  if(typeof source != "string") {
    return ""
  }
  let dataScript = source
  for(let [regexCode, contentRes] of sourceReplace) {
    dataScript = dataScript.replace(regexCode, contentRes)
  }
  return dataScript
}

const editor = document.querySelector("#editor")
const result = document.querySelector("#result")
const logs = document.querySelector("#log")

function TranslateCode() {
  const translated = TranslateScript(editor.innerText)
  result.innerText = String(translated)
}
TranslateCode()
editor.addEventListener("input", TranslateCode)