import React, { useContext, useMemo, useRef } from 'react';
import Player from 'video.js/dist/types/player';
import VjsBridgeComponentBase from './VjsComponentBridgeBase';

export interface VjsComponentBridgeContextValue {
  player: Player;
}

const VjsComponentBridgeContext = React.createContext<VjsComponentBridgeContextValue>(null!);

export interface VjsComponentBridgeProviderProps {
  bridge: VjsBridgeComponentBase;
  children: React.ReactNode;
}

function VjsComponentBridgeProvider({ bridge, children }: VjsComponentBridgeProviderProps) {
  const player = useRef(bridge.player());

  const context = useMemo<VjsComponentBridgeContextValue>(() => ({
    player: player.current,
  }), []);

  return (
    <VjsComponentBridgeContext.Provider value={context}>
      {children}
    </VjsComponentBridgeContext.Provider>
  )
}

export function useVjsComponentBridge() {
  const context = useContext<VjsComponentBridgeContextValue>(VjsComponentBridgeContext);

  if (!context) {
    throw new Error('`useVjsComponentBridge` must be used within a `VjsComponentBridgeProvider`');
  }

  return context;
}

export default VjsComponentBridgeProvider;
