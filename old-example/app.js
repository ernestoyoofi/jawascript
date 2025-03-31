(() => {
  const navigation = document.getElementById("navigate")
  const navigationBg = document.getElementById("navigate-bg")
  const navigationContent = document.getElementById("navigate-content")
  const nextContent = document.getElementById("next-content")
  console.log("Running!")
  document.querySelector('[data-button="opennav"]').addEventListener("click", () => {
    navigation.classList.remove("max-md:ml-[-250px]")
    navigation.classList.add("max-md:ml-[0px]")
    navigationBg.classList.remove("max-md:pointer-events-none")
    navigationBg.classList.remove("max-md:opacity-0")
    navigationBg.classList.add("max-md:opacity-1")
  })
  document.querySelectorAll('[data-button="closenav"]').forEach(a => {
    a.addEventListener("click", () => {
      navigation.classList.remove("max-md:ml-[0px]")
      navigation.classList.add("max-md:ml-[-250px]")
      navigationBg.classList.add("max-md:pointer-events-none")
      navigationBg.classList.remove("max-md:opacity-1")
      navigationBg.classList.add("max-md:opacity-0")
    })
  })
  for(let mf of ModuleMarkdownReader) {
    const elmNav = document.createElement("div")
    elmNav.setAttribute("data-btn-nav", "trigger")
    elmNav.className = "p-1 px-4"
    if(mf.group) {
      const bElm = document.createElement("b")
      bElm.innerText = mf.group
      elmNav.className = "p-1 px-4 py-2"
      bElm.className = "text-[1rem]"
      elmNav.append(bElm)
    } else {
      const pElm = document.createElement("p")
      pElm.innerText = mf.label
      pElm.className = "text-[0.9rem] ml-2"
      elmNav.setAttribute(mf?.reader? "reader":"iframe", mf.reader||mf.iframe||"-")
      elmNav.classList.add("cursor-pointer")
      elmNav.append(pElm)
    }
    navigationContent.append(elmNav)
  }
  function LoadingApply() {
    const boxLoad = document.createElement("div")
    boxLoad.innerHTML = `<h2 class="text-2xl font-bold mt-[2rem] mb-4 animate-pulse bg-gray-400 h-6 rounded"></h2><p><span class="animate-pulse bg-gray-300 inline-block w-2 h-4 rounded mr-1 w-[74px]"></span><span class="animate-pulse bg-gray-200 inline-block w-2 h-4 rounded mr-1 w-[92px]"></span><span class="animate-pulse bg-gray-300 inline-block w-2 h-4 rounded w-[40px]"></span></p><p><span class="animate-pulse bg-gray-200 inline-block w-2 h-4 rounded mr-1 w-[40px]"></span><span class="animate-pulse bg-gray-300 inline-block w-2 h-4 rounded mr-1 w-[60px]"></span><span class="animate-pulse bg-gray-200 inline-block w-2 h-4 rounded w-[80px]"></span></p>`
    nextContent.replaceChildren(boxLoad)
  }
  function ErrorApply(message) {
    const boxLoad = document.createElement("div")
    boxLoad.className = "w-full h-screen flex items-center justify-center"
    boxLoad.innerHTML = `<pre style="color: white;">${message}</pre>`
    nextContent.replaceChildren(boxLoad)
  }
  async function ReadingFile(locfile) {
    LoadingApply()
    await new Promise(a => setTimeout(a, 50))
    try {
      const savedDocs = document.querySelector(`script[data-content="${locfile}"]`)
      let contentMd = JSON.parse(savedDocs?.innerText || "{}").md
      if(!contentMd) {
        const fetched = await fetch(locfile)
        if(!fetched.ok) {
          ErrorApply("Failed load pages reader!")
          return;
        }
        const elmData = document.createElement("script")
        const textContent = await fetched.text()
        contentMd = textContent
        elmData.setAttribute("type", "application/txt")
        elmData.setAttribute("data-content", locfile)
        elmData.innerText = JSON.stringify({md: textContent})
        document.body.append(elmData)
      }
      const mdLoad = document.createElement("div")
      const mdit = markdownit({
        html: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre><code class="hljs">' +
                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                     '</code></pre>';
            } catch (__) {}
          }
          return '<pre><code class="hljs">' + mdit.utils.escapeHtml(str) + '</code></pre>';
        }
      })
      mdLoad.innerHTML = mdit.render(contentMd)
      nextContent.replaceChildren(mdLoad)
    } catch(e) {
      ErrorApply(e.stack)
    }
  }
  const bySearch = ModuleMarkdownReader.filter(a => (new URLSearchParams(location.search).get("page") === a.reader))[0]
  const RunFirst = ModuleMarkdownReader.filter(a => (!!a.reader))[0]
  if(bySearch || RunFirst) {
    ReadingFile(bySearch?.reader || RunFirst?.reader)
  }
  document.querySelectorAll('[data-btn-nav]').forEach(a => {
    a.addEventListener("click", () => {
      if(a.getAttribute("reader")) {
        history.pushState(null,null,`./?page=${a.getAttribute("reader")}`)
        ReadingFile(a.getAttribute("reader"))
      }
      if(a.getAttribute("iframe")) {
        const iframeContent = document.createElement("iframe")
        iframeContent.className = "w-full h-screen border-none"
        iframeContent.src = a.getAttribute("iframe")
        nextContent.replaceChildren(iframeContent)
      }
    })
  })
})();