import { type DeviceOverlay } from './types.ts';

interface DeviceOverlayProps {
  overlay: DeviceOverlay;
}

const overlayStyles = (overlay: DeviceOverlay): React.CSSProperties => ({
  position: 'absolute',
  top: overlay.top,
  left: overlay.left,
  width: overlay.width,
  height: overlay.height,
  borderRadius: overlay.borderRadius,
  backgroundColor: overlay.backgroundColor,
  zIndex: 999999999,
  ...(overlay.type === 'notch' && {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  }),
});

export function DeviceOverlay({ overlay }: DeviceOverlayProps) {
  return <div style={overlayStyles(overlay)} />;
} 