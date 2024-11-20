export type DeviceOverlayType = "dynamicIsland" | "notch" | "homeIndicator" | "cameraHousing";

export interface DeviceOverlay {
  type: DeviceOverlayType;
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius?: number;
  backgroundColor?: string;
}

export interface SafeAreaConfig {
  top: number;
  right: number;
  bottom: number;
  left: number;
  overlays?: DeviceOverlay[];
}

export interface DeviceConfig {
  name: string;
  width: number;
  height: number;
  deviceScaleFactor: number;
  mobile: boolean;
  borderRadius: number;
  safeArea: SafeAreaConfig;
}

export type DeviceSpecs = {
  [key: string]: Omit<DeviceConfig, "name">;
}; 