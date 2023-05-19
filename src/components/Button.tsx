import clsx from 'clsx';
import React, { useCallback } from 'react';
import { MdModeComment } from 'react-icons/md';
import videojs from 'video.js';
import GossipPlugin from '../main';
import { VjsPluginType } from '../types';
import VjsBridgeComponentBase, { RenderFn, VjsReactFunctionComponent } from './VjsComponentBridgeBase';
import VjsComponentBridgeProvider, { useVjsComponentBridge } from './VjsComponentBrigdeProvider';
import useVjsPlugin from './useVjsPlugin';

const Button: VjsReactFunctionComponent = () => {
  const { player } = useVjsComponentBridge();
  const { setState } = useVjsPlugin<VjsPluginType<typeof GossipPlugin>>('gossip');

  const handleClick = useCallback(() => {
    player.pause();
    setState({ isAnnotationMode: true });
  }, [player, setState]);

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

class VjsGossipButton extends VjsBridgeComponentBase {

  override onMount(render: RenderFn): void {
    render(
      <VjsComponentBridgeProvider bridge={this}>
        <Button {...this.options_} />
      </VjsComponentBridgeProvider>
    );
  }

}

videojs.registerComponent('VjsGossipButton', VjsGossipButton);

export default VjsGossipButton;

