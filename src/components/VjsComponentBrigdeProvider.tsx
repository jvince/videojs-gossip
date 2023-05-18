import React, { useContext, useMemo, useRef } from 'react';
import Player from 'video.js/dist/types/player';
import VjsBridgeComponentBase from './VjsComponentBridgeBase';
import { PluginLike } from '../types';

export interface VjsComponentBridgeContextValue<Plugin extends PluginLike = PluginLike> {
  player: Player;
  setPluginState: Plugin['setState'];
}

const VjsComponentBridgeContext = React.createContext<VjsComponentBridgeContextValue>(null!);

export interface VjsComponentBridgeProviderProps {
  bridge: VjsBridgeComponentBase<PluginLike>;
  children: React.ReactNode;
}

function VjsComponentBridgeProvider({ bridge, children }: VjsComponentBridgeProviderProps) {
  const player = useRef(bridge.player());
  const plugin = useRef(bridge.options_.plugin);

  const context = useMemo<VjsComponentBridgeContextValue>(() => ({
    player: player.current,
    setPluginState: plugin.current.setState.bind(plugin.current)
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
