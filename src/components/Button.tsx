import clsx from 'clsx';
import React, { useCallback } from 'react';
import { MdModeComment } from 'react-icons/md';
import videojs from 'video.js';
import VjsBridgeComponentBase, { VjsReactFunctionComponent } from './VjsComponentBridgeBase';
import VjsComponentBridgeProvider, { useVjsComponentBridge } from './VjsComponentBrigdeProvider';
import GossipPlugin from '../main';
import { PluginType } from '../types';

const Button: VjsReactFunctionComponent<PluginType<typeof GossipPlugin>> = () => {
  const { player, setPluginState } = useVjsComponentBridge();

  const handleClick = useCallback(() => {
    player.pause();
    setPluginState({ isAnnotationMode: true });
  }, [player, setPluginState]);

  return (
    <button
      className={clsx([
        'vjs-control',
        'vjs-button',
        'vjs-menu-button'
      ])}
      onClick={handleClick}
    >
      <span className="vjs-icon-placeholder">
        <MdModeComment size={18} />
      </span>
      <span
        aria-hidden="true"
        className="vjs-control-text">
          Gossip
        </span>
    </button>
  );
}

class VjsGossipButton extends VjsBridgeComponentBase<PluginType<typeof GossipPlugin>> {

  override onMount<T extends (children: React.ReactNode) => void>(render: T): void {
    render(
      <VjsComponentBridgeProvider bridge={this}>
        <Button {...this.options_} />
      </VjsComponentBridgeProvider>
    );
  }

}

videojs.registerComponent('VjsGossipButton', VjsGossipButton);

export default VjsGossipButton;

