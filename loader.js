(async() => {
    const src = chrome.runtime.getURL("script.js");
    const contentMain = await import(src);
})()
