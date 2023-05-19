import React, { useCallback } from 'react';
import GossipPlugin from '../main';
import { VjsPluginType } from '../types';
import { VjsReactFunctionComponent } from './VjsComponentBridgeBase';
import useVjsPlugin from './useVjsPlugin';

const Test: VjsReactFunctionComponent = () => {
  const { setState } = useVjsPlugin<VjsPluginType<typeof GossipPlugin>>('gossip');

  const handleClick = useCallback(() => {
    setState({ isAnnotationMode: false });
  }, [setState]);

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
