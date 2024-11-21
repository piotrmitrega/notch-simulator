import React, { useEffect, useState } from "react";
import type { Protocol } from "devtools-protocol";
import { deviceSpecs } from "./devices/configs.ts";
import { DevicePreview } from "./devices/DevicePreview.tsx";
import type { DeviceOverlay } from "./devices/types.ts";

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    padding: '20px 0',
  },
  deviceBox: {
    width: '150px',
    height: '150px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
    position: 'relative',
  },
  deviceName: {
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '8px',
    textAlign: 'center',
    color: '#333',
  },
  previewContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
};

const OVERLAY_STYLES = `
  position: fixed;
  z-index: 999999999;
  pointer-events: none;
`;

function injectOverlayStyles() {
  const styleId = 'device-overlay-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .device-overlay {
        ${OVERLAY_STYLES}
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }
}

function createOverlayElement(overlay: DeviceOverlay): HTMLDivElement {
  const element = document.createElement('div');
  element.className = 'device-overlay';
  Object.assign(element.style, {
    top: overlay.top + 'px',
    left: overlay.left + 'px',
    width: overlay.width + 'px',
    height: overlay.height + 'px',
    borderRadius: (overlay.borderRadius || 0) + 'px',
    backgroundColor: overlay.backgroundColor || '#000',
    ...(overlay.type === 'notch' && {
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    }),
  });
  return element;
}

export function DevToolsApp() {
  const [tabId, setTabId] = useState<number>();
  const [url, setUrl] = useState<string>();
  const [activeDevice, setActiveDevice] = useState<string | null>(null);

  useEffect(() => {
    chrome.devtools.inspectedWindow.eval(
      "window.location.href",
      (result, isException) => {
        if (!isException && typeof result === "string") {
          setUrl(result);
        }
      }
    );

    setTabId(chrome.devtools.inspectedWindow.tabId);

    chrome.devtools.network.onNavigated.addListener((newUrl) => {
      setUrl(newUrl);
    });
  }, []);

  const injectOverlays = (deviceName: string) => {
    // Get the current tab ID from chrome.devtools
    const tabId = chrome.devtools.inspectedWindow.tabId;

    // Execute the injection in the content script context
    chrome.scripting.executeScript({
      target: { tabId },
      func: (deviceConfig) => {
        // Clean up existing overlays
        const existingOverlays = document.querySelectorAll('.device-overlay');
        existingOverlays.forEach(overlay => overlay.remove());

        // Add styles
        const styleId = 'device-overlay-styles';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.textContent = `
            .device-overlay {
              position: fixed;
              z-index: 999999999;
              pointer-events: all;
              transition: all 0.3s ease;
            }
          `;
          document.head.appendChild(style);
        }

        // Create and inject overlays
        deviceConfig.safeArea.overlays?.forEach(overlay => {
          const element = document.createElement('div');
          element.className = 'device-overlay';
          Object.assign(element.style, {
            top: overlay.top + 'px',
            left: overlay.left + 'px',
            width: overlay.width + 'px',
            height: overlay.height + 'px',
            borderRadius: (overlay.borderRadius || 0) + 'px',
            backgroundColor: overlay.backgroundColor || '#000',
            ...(overlay.type === 'notch' && {
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
            }),
          });
          document.documentElement.appendChild(element);
        });
      },
      args: [deviceSpecs[deviceName]]
    });
  };

  const handleDeviceSelect = (deviceName: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.id) {
        const debuggeeId = { tabId: tab.id };
        const device = {
          ...deviceSpecs[deviceName],
          name: deviceName,
        };
        
        // Remove overlays if switching from one device to another
        if (activeDevice) {
          chrome.devtools.inspectedWindow.eval(`
            document.querySelectorAll('.device-overlay').forEach(el => el.remove());
          `);
        }

        chrome.debugger.attach(debuggeeId, "1.3", () => {
          chrome.debugger.sendCommand(
            debuggeeId,
            "Emulation.setDeviceMetricsOverride",
            device
          );
          
          // Inject new overlays
          injectOverlays(deviceName);
          setActiveDevice(deviceName);
        });
      }
    });
  };

  const calculateScale = (width: number, height: number): number => {
    const boxWidth = 130; // 150px - 20px padding
    const boxHeight = 110; // 150px - 40px for name and padding
    const scaleX = boxWidth / width;
    const scaleY = boxHeight / height;
    return Math.min(scaleX, scaleY) * 0.9; // 0.9 to add some margin
  };

  return (
    <div style={styles.container}>
      <h1>iOS Device Previews</h1>

      <div style={styles.grid}>
        {Object.entries(deviceSpecs).map(([deviceName, config]) => {
          const scale = calculateScale(config.width, config.height);
          
          return (
            <div 
              key={deviceName}
              style={styles.deviceBox}
              onClick={() => handleDeviceSelect(deviceName)}
            >
              <div style={styles.deviceName}>{deviceName}</div>
              <div style={styles.previewContainer}>
                <DevicePreview
                  name={deviceName}
                  {...config}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 