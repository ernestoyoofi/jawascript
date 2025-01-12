const sourceReplace = [
  // Variable
  [/konstan\s+(\w+)\s*=\s*(.+)/g, "const $1 = $2"],
  [/variable\s+(\w+)\s*=\s*(.+)/g, "var $1 = $2"],
  [/benkedata\s+(\w+)\s*=\s*(.+)/g, "let $1 = $2"],
  [/konstan\s+(\w+)\s*iku\s*(.+)/g, "const $1 = $2"],
  [/variable\s+(\w+)\s*iku\s*(.+)/g, "var $1 = $2"],
  [/benkedata\s+(\w+)\s*iku\s*(.+)/g, "let $1 = $2"],
  [/variable\s+(\w+)/g, "var $1;"],
  [/benkedata\s+(\w+)/g, "let $1;"],

  // Fungsi
  [/fungsi\s+(\w+)\s*(.*?)\s*{/g, "function $1$2 {"],
  [/bali\s+(.+?);/g, "return $1;"],
  [/iku\s+(.+?)/g, "= $1"],

  // Operator
  [/luwihSeko/g, ">"],
  [/luwihSitik/g, "<"],
  [/oraSepadan/g, "!=="],
  [/mbutuhaken\s+"(.+)"(?:\s+dadi\s+(\w+))?/g, (match, moduleName, alias) =>
    alias ? `const ${alias} = require("${moduleName}")` : `const ${moduleName} = require("${moduleName}")`
  ],
  [/naliko\s*(.+?)\s*{/g, "if $1 {"],
  [/naliko(.+?)\s*{/g, "if$1 {"],
  [/ukoro\s*(.+?)\s*{/g, "else if $1 {"],
  [/ukoro(.+?)\s*{/g, "else if$1 {"],
  [/liyane\s*{/g, "else {"],

  // Log
  [/catetan(.+?)/g, "console.log$1"],
  [/catetan\s*(.+?)/g, "console.log$1"],
  [/infoPerkoro(.+?)/g, "console.error$1"],
  [/infoPerkoro\s*(.+?)/g, "console.error$1"],

  // Looping
  //[/mbalenidata(/g, "forEach("], / Hard To Implement
  [/ubengi\s*(.+?)\s*{/g, "for $1 {"],
  [/dadine/g, "of"],

  // Jenis data
  [/(jenise|bentukNipun)/g, "typeof"],
  [/kata/g, '"string"'],
  [/wilangan/g, '"number"'],
  [/oraono/g, "undefined"],
  [/obyek/g, '"object"'],
  [/Tatanan/g, "Array"],
  [/opoTatanan(.+?)/g, "Array.isArray$1"],
  [/opoWilangan(.+?)/g, "!isNaN$1"],

  // True False
  [/\b(iyo|nggih)\b/g, "true"],
  [/\b(ora|mboten)\b/g, "false"],

  // Class
  [/taterapan\s+(\w+)\s*{/g, "class $1 {"],
  [/kontrusi\s*(.*?)\s*{/g, "constructor$1 {"],
  [/Wektu/g, "Date"],

  // Masalah / Error
  [/nyobake\s*{/g, "try {"],
  [/njupuk\s*(.?)\s*{/g, "catch$1 {"],
  [/njupuk(.+?)\s*{/g, "catch$1 {"],
  [/akire\s*{/g, "finally {"],
  [/mbalangi\s+(.+?);/g, "throw $1;"],
  [/perkoroAnyar\s*(.+?)/g, "new Error$1"],

  // Lainnya
  [/paketanData\s+(.+?)/g, "module.exports = $1"],
  [/iki\.(\w+)/g, "this.$1"],
  // [/ditimpani(.+?),\s*(.+?)/g, "$1.replace($2)"], // Hard To Implement
  // [/timpaniKabeh(.+?),\s*(.+?)/g, "$1.replaceAll($2)"], // Hard To Implement
  [/anyar\s+(\w+)/g, "new $1"],
  [/nunggoni\s+(.+?);/g, "await $1;"],
  [/ditunggoni\s+(\w+)/g, "async $1"],
  [/janjine(.+?)/g, "setTimeout$1"],
  [/rampungJanjine(.+?)/g, "clearTimeout$1"],
  [/gaweMumet(.+?)/g, "setInterval$1"],
  [/rampungMumet(.+?)/g, "clearInterval$1"],
]

module.exports = sourceReplace
