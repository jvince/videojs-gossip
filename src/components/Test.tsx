import React, { useCallback } from 'react';
import { VjsGossipComponentProps } from './VjsGossip';

function Test({ plugin }: VjsGossipComponentProps) {
  const handleClick = useCallback(() => {
    plugin.setState({ isAnnotationMode: false });
  }, [plugin.setState])

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
