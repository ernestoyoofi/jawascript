async function ExecutedCode(code, __callback) {
  return new Promise(r => {
    console.log = (...args) => {
      document.querySelector("#log").innerText += "\n[Logs]:"+args?.join(" ")
      __callback({type:"log",v:args?.join(" ")})
    }
    console.error = (...args) => {
      document.querySelector("#log").innerText += "\n[Error]:"+args?.join(" ")
      __callback({type:"error",v:args?.join(" ")})
    }
    console.warn = (...args) => {
      document.querySelector("#log").innerText += "\n[Warn]:"+args?.join(" ")
      __callback({type:"warn",v:args?.join(" ")})
    }
    console.clear = (...args) => {
      document.querySelector("#log").innerText += ""
      __callback({type:"clear",v:""})
    }
    try {
      const __timev = setTimeout(() => {
        throw new Error("Execute has to long time!")
      }, 1000*60*2)
      const ab = eval(code)
      clearTimeout(__timev)
      return r({log:String(ab)})
    } catch(e) {
      return r({log:String(e.stack)})
    }
  })
}

document.querySelector("#running").addEventListener("click", async () => {
  const b = document.querySelector("#running")
  const c = document.querySelector("#log")
  const d = document.querySelector("#result")
  console.log(b)
  
  if(b.innerText !== "Running Script") return;
  c.innerText = ""
  b.innerText = "Run..."
  const e = await ExecutedCode(String(d.innerText), (f) => {
    if(f.type === "clear") {
      c.innerText = ""
      return;
    }
    c.innertText = `${c.innerText}\n[${f.type}]: ${f.v}`.trim()
  })
  c.innerText = `${c.innerText}\n[Finis]:${e.log}`.trim()
  b.innerText = "Running Script"
})
