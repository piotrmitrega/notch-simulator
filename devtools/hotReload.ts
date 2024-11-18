const LAST_RELOAD_KEY = 'devtools-last-reload-time';

function getLastReloadTime(): number {
  return parseInt(localStorage.getItem(LAST_RELOAD_KEY) || '0');
}

function setLastReloadTime(time: number) {
  localStorage.setItem(LAST_RELOAD_KEY, time.toString());
}

async function checkForChanges() {
  try {
    const response = await fetch(chrome.runtime.getURL("reload-signal.js"));
    const content = await response.text();

    const matches = content.match(/\/\/ (\d+) \[(.*?)\]/);
    if (!matches) return;

    const [, timestamp, changedFiles] = matches;
    const changeTime = parseInt(timestamp);
    const lastReloadTime = getLastReloadTime();

    if (changeTime > lastReloadTime) {
      setLastReloadTime(changeTime);

      if (changedFiles.includes("devtools/")) {
        console.log("[HOT RELOAD] DevTools changes detected, reloading...");
        globalThis.location.reload();
      }
    }
  } catch (error) {
    console.error("[HOT RELOAD] Error checking for changes:", error);
  }
}

setInterval(checkForChanges, 1000); 