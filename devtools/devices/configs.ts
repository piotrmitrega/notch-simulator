import type { DeviceSpecs, DeviceOverlay } from "./types.ts";

interface OverlayParams {
  left: number;
  deviceHeight?: number;
  bottomSafeArea?: number;
}

interface NotchParams extends OverlayParams {
  notchWidth: number;
}

function createHomeIndicator({ left, deviceHeight }: OverlayParams): DeviceOverlay {
  const width = 176;
  const height = 5;
  const BOTTOM_GAP = 8;
  
  return {
    type: "homeIndicator",
    width,
    height,
    borderRadius: 2.5,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    top: deviceHeight! - BOTTOM_GAP - height,
    left
  };
}

function createDynamicIsland({ left }: OverlayParams): DeviceOverlay {
  const width = 126;
  const height = 37;
  const TOP_GAP = 11;
  
  return {
    type: "dynamicIsland",
    width,
    height,
    borderRadius: 20,
    backgroundColor: "#000",
    top: TOP_GAP,
    left
  };
}

function createNotch({ left, notchWidth }: NotchParams): DeviceOverlay {
  return {
    type: "notch",
    width: notchWidth,
    height: 34,
    borderRadius: 20,
    backgroundColor: "#000",
    top: 0,
    left
  };
}

function createCameraHousing({ left }: OverlayParams): DeviceOverlay {
  const width = 80;
  const height = 24;
  
  return {
    type: "cameraHousing",
    width,
    height,
    borderRadius: 12,
    backgroundColor: "#000",
    top: 0,
    left
  };
}

export const deviceSpecs: DeviceSpecs = {
  "iPhone 15 Pro Max": {
    width: 430,
    height: 932,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 55,
    safeArea: {
      top: 59,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createDynamicIsland({ left: 152 }),
        createHomeIndicator({ 
          left: 127,
          deviceHeight: 932
        })
      ]
    }
  },
  "iPhone 15 Pro": {
    width: 393,
    height: 852,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 55,
    safeArea: {
      top: 59,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createDynamicIsland({ left: 133.5 }),
        createHomeIndicator({ 
          left: 108.5,
          deviceHeight: 852
        })
      ]
    }
  },
  "iPhone 15 Plus": {
    width: 430,
    height: 932,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 55,
    safeArea: {
      top: 59,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createDynamicIsland({ left: 152 }),
        createHomeIndicator({ 
          left: 127,
          deviceHeight: 932
        })
      ]
    }
  },
  "iPhone 15": {
    width: 393,
    height: 852,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 55,
    safeArea: {
      top: 59,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createDynamicIsland({ left: 133.5 }),
        createHomeIndicator({ 
          left: 108.5,
          deviceHeight: 852
        })
      ]
    }
  },
  "iPhone 14 Pro Max": {
    width: 430,
    height: 932,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 55,
    safeArea: {
      top: 59,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createDynamicIsland({ left: 152 }),
        createHomeIndicator({ 
          left: 127,
          deviceHeight: 932
        })
      ]
    }
  },
  "iPhone 14 Pro": {
    width: 393,
    height: 852,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 55,
    safeArea: {
      top: 59,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createDynamicIsland({ left: 133.5 }),
        createHomeIndicator({ 
          left: 108.5,
          deviceHeight: 852
        })
      ]
    }
  },
  "iPhone 14/13 Plus": {
    width: 428,
    height: 926,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 47,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 135.5,
          notchWidth: 157
        }),
        createHomeIndicator({ 
          left: 126,
          deviceHeight: 926
        })
      ]
    }
  },
  "iPhone 14/13": {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 47,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 116.5,
          notchWidth: 157
        }),
        createHomeIndicator({ 
          left: 107,
          deviceHeight: 844
        })
      ]
    }
  },
  "iPhone 12/13 mini": {
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 50,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 107.5,
          notchWidth: 160
        }),
        createHomeIndicator({ 
          left: 99.5,
          deviceHeight: 812
        })
      ]
    }
  },
  "iPhone 12/11 Pro Max": {
    width: 428,
    height: 926,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 47,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 134,
          notchWidth: 160
        }),
        createHomeIndicator({ 
          left: 126,
          deviceHeight: 926
        })
      ]
    }
  },
  "iPhone 12/11 Pro": {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 47,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 115,
          notchWidth: 160
        }),
        createHomeIndicator({ 
          left: 107,
          deviceHeight: 844
        })
      ]
    }
  },
  "iPhone 12/11": {
    width: 414,
    height: 896,
    deviceScaleFactor: 2,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 48,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 127,
          notchWidth: 160
        }),
        createHomeIndicator({ 
          left: 119,
          deviceHeight: 896
        })
      ]
    }
  },
  "iPhone XS Max": {
    width: 414,
    height: 896,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 44,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 124.5,
          notchWidth: 165
        }),
        createHomeIndicator({ 
          left: 119,
          deviceHeight: 896
        })
      ]
    }
  },
  "iPhone XR": {
    width: 414,
    height: 896,
    deviceScaleFactor: 2,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 44,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 124.5,
          notchWidth: 165
        }),
        createHomeIndicator({ 
          left: 119,
          deviceHeight: 896
        })
      ]
    }
  },
  "iPhone XS/X": {
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    mobile: true,
    borderRadius: 47,
    safeArea: {
      top: 44,
      right: 0,
      bottom: 34,
      left: 0,
      overlays: [
        createNotch({ 
          left: 105,
          notchWidth: 165
        }),
        createHomeIndicator({ 
          left: 99.5,
          deviceHeight: 812
        })
      ]
    }
  },
  "iPhone SE (2nd/3rd generation)": {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true,
    borderRadius: 0,
    safeArea: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  "iPad Pro 12.9-inch (6th generation)": {
    width: 1024,
    height: 1366,
    deviceScaleFactor: 2,
    mobile: true,
    borderRadius: 18,
    safeArea: {
      top: 24,
      right: 20,
      bottom: 20,
      left: 20,
      overlays: [
        createCameraHousing({ left: 472 }),
        createHomeIndicator({ 
          left: 424,
          deviceHeight: 1366
        })
      ]
    }
  },
  "iPad Pro 11-inch (4th generation)": {
    width: 834,
    height: 1194,
    deviceScaleFactor: 2,
    mobile: true,
    borderRadius: 18,
    safeArea: {
      top: 24,
      right: 20,
      bottom: 20,
      left: 20,
      overlays: [
        createCameraHousing({ left: 377 }),
        createHomeIndicator({ 
          left: 329,
          deviceHeight: 1194
        })
      ]
    }
  },
  "iPad Air/10th gen": {
    width: 820,
    height: 1180,
    deviceScaleFactor: 2,
    mobile: true,
    borderRadius: 18,
    safeArea: {
      top: 24,
      right: 20,
      bottom: 20,
      left: 20,
      overlays: [
        createCameraHousing({ left: 370 }),
        createHomeIndicator({ 
          left: 322,
          deviceHeight: 1180
        })
      ]
    }
  },
  "iPad mini (6th generation)": {
    width: 744,
    height: 1133,
    deviceScaleFactor: 2,
    mobile: true,
    borderRadius: 18,
    safeArea: {
      top: 24,
      right: 20,
      bottom: 20,
      left: 20,
      overlays: [
        createCameraHousing({ left: 332 }),
        createHomeIndicator({ 
          left: 284,
          deviceHeight: 1133
        })
      ]
    }
  }
}; 