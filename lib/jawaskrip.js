#!/usr/bin/env node

const fs = require("fs")
const transiter = require("./translate")
const path = require("path")
const vm = require("vm")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim().toLowerCase())
    })
  })
}

if(process.argv.length < 3) {
  console.log(`Usage: jawasckrip <filename>.jawa [|...other]

  More Build
  --dir   -r | Directory for compaling
  --trans -t | Translate language .jawa into .js`)
}

const dirCompaliOne = process.argv.indexOf("--dir")
const dirCompaliTwo = process.argv.indexOf("-r")
const translateScOne = process.argv.indexOf("--trans")
const translateScTwo = process.argv.indexOf("-t")

const isCompaling = (dirCompaliOne !== -1 || dirCompaliTwo !== -1)
const opsiCompail = dirCompaliOne !== -1? dirCompaliOne : dirCompaliTwo
const isTranslate = (translateScOne !== -1 || translateScTwo !== -1)
const opsiTranslate = translateScOne !== -1? translateScOne : translateScTwo

/// Translated
if(isTranslate) {
  const fileLocation = String(process.argv[2]||"")
  if(!fileLocation || fileLocation.startsWith("-")) {
    throw new Error("Before adding flag or argv please fill in the file path")
  }
  if(!fs.existsSync(fileLocation)) {
    throw new Error(`File "${fileLocation}" is not found`)
  }
  if(!["jawa","jw"].includes(fileLocation.split(".").pop())) {
    throw new Error(`Only translate to JavaScript with extension .jawa or .jw`)
  }
  const readableScript = fs.readFileSync(fileLocation,"utf-8")
  const translated = transiter(readableScript)
  const outputFileSplit = fileLocation.split(".")
  const outputFile = outputFileSplit.slice(0, outputFileSplit.length - 1).join(".")+".js"
  fs.writeFileSync(outputFile, translated)
  console.log(`[Success]: Save file to ${outputFile}!`)
  return;
}
/// Compaling
if(isCompaling) {
  (async() => {
  const folderReader = (process.argv[opsiCompail + 1]||"")
  if(!fs.existsSync(folderReader) || !fs.statSync(folderReader).isDirectory()) {
    throw new Error("Hmm... sems like not folder...")
  }
  const pathRoot = path.resolve(process.cwd(), folderReader)
  console.log("[Log] Root Folder:",pathRoot)
  const asking = await askQuestion("[Ask]: Before compiling, please backup the output folder before, because it will delete the folder to update it.\nNext process (y/N) :")
  rl.close()
  if(asking === "no" || asking === "n" || !asking) {
    console.log("[Log]: Okey, cancel this process!")
    process.exit()
  }
  console.log("[Log] Start process!")
  fs.rmSync(pathRoot+"/output", { force: true, recursive: true })
  fs.mkdirSync(path.resolve(pathRoot,"output"))
  ApplyFunctionTranslate()
  function ApplyFunctionTranslate(paths = []) {
    console.log("[Log] Open folder:","/"+paths.join("/"))
    const readPathFolder = path.resolve(pathRoot,...paths)
    const readList = fs.readdirSync(readPathFolder)
    const ignoreFolderRoot = "node_modules,output,dir".split(",")
    readList.forEach(a => {
      const parserPath = path.parse(readPathFolder+"/"+a)
      // Ignore Folder Root
      // Is Folder?
      if(fs.statSync(readPathFolder+"/"+a).isDirectory()) {
        if(
          (readPathFolder === pathRoot),
          ignoreFolderRoot.includes(a)
        ) {
          return; // Ignore This
        }
        fs.mkdirSync(path.resolve(pathRoot,"output",...paths,a))
        ApplyFunctionTranslate([...paths,a])
      }
      // If File
      if([".jawa",".jw"].includes(parserPath.ext)) {
        const readView = fs.readFileSync(
          path.resolve(pathRoot, ...paths, a),"utf-8"
        )
        const outputSave = path.resolve(
          pathRoot, "output",
          ...paths, `${parserPath.name}.js`
        )
        const translated = transiter(readView)
        fs.writeFileSync(outputSave, translated, "utf-8")
        console.log("[Log] Success! output:", outputSave)
      }
    })
  }
  })();
  return;
}

/// Executed
const fileLocation = String(process.argv[2]||"")
if(!fs.existsSync(fileLocation)) {
  throw new Error(`File "${fileLocation}" is not found`)
}
if(!["jawa","jw"].includes(fileLocation.split(".").pop())) {
  throw new Error(`Only translate to JavaScript with extension .jawa or .jw`)
}
const readableScript = fs.readFileSync(fileLocation,"utf-8")
const translated = transiter(readableScript)
const contextVm = vm.createContext({
  console, require, process, os: require("os")
})
eval(translated)
// vm.runInContext(translated, contextVm)
