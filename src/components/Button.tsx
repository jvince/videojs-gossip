import clsx from 'clsx';
import React, { useCallback } from 'react';
import { MdModeComment } from 'react-icons/md';
import videojs from 'video.js';
import GossipPlugin, { TopicMetadata } from '../main';
import { VjsGossipBridgeOptions } from '../types';
import VjsBridgeComponentBase, { RenderFn } from './VjsComponentBridgeBase';
import VjsComponentBridgeProvider, { useVjsComponentBridge } from './VjsComponentBrigdeProvider';

type VjsGossipButtonOptions = VjsGossipBridgeOptions<GossipPlugin<TopicMetadata>>;

export type VjsGossipButtonProps = VjsGossipButtonOptions;

function Button(props: VjsGossipButtonProps) {
  const { player } = useVjsComponentBridge();

  const handleClick = useCallback(() => {
    player.pause();
    props.plugin?.setState({ isAnnotationMode: true });
  }, [player, props?.plugin]);

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

class VjsGossipButton extends VjsBridgeComponentBase<VjsGossipButtonOptions> {

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

