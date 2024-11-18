import { fetchChangeInfo } from "../shared/hotReload/utils.ts";

const LAST_RELOAD_KEY = 'devtools-last-reload-time';

function getLastReloadTime(): number {
  return parseInt(localStorage.getItem(LAST_RELOAD_KEY) || '0');
}

function setLastReloadTime(time: number) {
  localStorage.setItem(LAST_RELOAD_KEY, time.toString());
}

async function checkForChanges() {
  try {
    console.log("[HOT RELOAD] Checking for changes in devtools..x.");
    const changes = await fetchChangeInfo();
    console.log("[HOT RELOAD] Changes:", changes);
    if (!changes) return;

    const lastReloadTime = getLastReloadTime();

    if (changes.timestamp > lastReloadTime) {
      setLastReloadTime(changes.timestamp);

      if (changes.hasDevToolsChanges) {
        console.log("[HOT RELOAD] DevTools changes detected, reloading...");
        globalThis.location.reload();
      }
    }
  } catch (error) {
    console.error("[HOT RELOAD] Error checking for changes:", error);
  }
}

setInterval(checkForChanges, 1000); 