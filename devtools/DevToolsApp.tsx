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
        <button onClick={() =>{
          chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab) {
              const tabId = tab.id;
          
              // Attach to the active tab
              chrome.debugger.attach({ tabId }, "1.3", () => {
                // Set the viewport size
                chrome.debugger.sendCommand(
                  { tabId },
                  chrome.debugger.sendCommand
                  "Emulation.setDeviceMetricsOverride",
                  {
                    width: 375, // Desired width
                    height: 812, // Desired height
                    deviceScaleFactor: 2,
                    mobile: true
                  }
                );
              });
            }
          });
        }}>
          Open in mobile
        </button>
      </div>
    </div>
  );
} 