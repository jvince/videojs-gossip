import React, { useCallback } from 'react';
import { useVjsComponentBridge } from './VjsComponentBrigdeProvider';
import { VjsReactFunctionComponent } from './VjsComponentBridgeBase';

const Test: VjsReactFunctionComponent = () => {
  const { setPluginState } = useVjsComponentBridge();

  const handleClick = useCallback(() => {
    setPluginState({ isAnnotationMode: false });
  }, [setPluginState]);

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        position: 'absolute',
        inset: 0
      }}
    >
      Overlay
      <button onClick={handleClick}>Close</button>
    </div>
  );
}

export default Test;
