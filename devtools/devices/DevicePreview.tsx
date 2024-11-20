import { type DeviceConfig } from './types.ts';
import { DeviceOverlay } from './DeviceOverlay.tsx';

interface DevicePreviewProps extends Omit<DeviceConfig, 'deviceScaleFactor' | 'mobile'> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    border: '1px solid black',
    overflow: 'hidden',
  },
  safeArea: {
    position: 'absolute',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #e0e0ff, #fff8f0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    padding: '10px',
    textAlign: 'center',
    fontSize: '14px'
  },
  dimensions: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px'
  }
};

export function DevicePreview({
  name,
  width,
  height,
  borderRadius,
  safeArea,
  className,
  style,
  onClick,
}: DevicePreviewProps) {
  return (
    <div className={className} style={style} onClick={onClick}>
      <div
        style={{
          ...styles.container,
          width,
          height,
          borderRadius,
        }}
      >
        {safeArea.overlays?.map((overlay, index) => (
          <DeviceOverlay key={index} overlay={overlay} />
        ))}

        <div
          style={{
            ...styles.safeArea,
            top: safeArea.top,
            right: safeArea.right,
            bottom: safeArea.bottom,
            left: safeArea.left,
          }}
        >
          <div style={styles.content}>
            <div style={styles.text}>
              {name}
              <div style={styles.dimensions}>
                {width}×{height}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}