export const iOSDeviceNames = [
  // Modern iPhones (15 series)
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15 Plus",
  "iPhone 15",
  
  // iPhone 14 Pro series (different due to Dynamic Island)
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  
  // iPhone 14/13 series (identical specs)
  "iPhone 14/13 Plus",
  "iPhone 14/13",
  
  // iPhone mini series
  "iPhone 12/13 mini",  // Merged since identical specs
  
  // iPhone 12/11 Pro series
  "iPhone 12/11 Pro Max",
  "iPhone 12/11 Pro",
  "iPhone 12/11",
  
  // iPhone X series (split due to different deviceScaleFactor)
  "iPhone XS Max",
  "iPhone XR",
  "iPhone XS/X",  // These are truly identical
  
  // iPhone SE series
  "iPhone SE (2nd/3rd generation)",
  
  // iPads
  "iPad Pro 12.9-inch (6th generation)",
  "iPad Pro 11-inch (4th generation)",
  "iPad Air/10th gen",
  "iPad mini (6th generation)"
] as const;

export type iOSDeviceName = typeof iOSDeviceNames[number];

export function isIOSDeviceName(name: string): name is iOSDeviceName {
  return iOSDeviceNames.includes(name as iOSDeviceName);
} 