import React, { useEffect, useState } from "react";

export function DevToolsApp() {
  const [tabId, setTabId] = useState<number>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    // Get the inspected window's information
    chrome.devtools.inspectedWindow.eval(
      "window.location.href",
      (result, isException) => {
        if (!isException && typeof result === "string") {
          setUrl(result);
        }
      }
    );

    setTabId(chrome.devtools.inspectedWindow.tabId);

    // Listen for navigation events
    chrome.devtools.network.onNavigated.addListener((newUrl) => {
      setUrl(newUrl);
    });
  }, []);

  return (
    <div className="devtools-app">
      <h1>DevTools Panel</h1>
      <div>
        <p>Inspecting Tab ID: {tabId}</p>
        <p>Current URL: {url}</p>
      </div>
    </div>
  );
} 