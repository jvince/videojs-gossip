import React from 'react';
import videojs from 'video.js';
import GossipPlugin, { TopicMetadata } from '../main';
import Test from './Test';
import VjsBridgeComponentBase, { RenderFn, VjsComponentBridgeOptions } from './VjsComponentBridgeBase';
import VjsComponentBridgeProvider from './VjsComponentBrigdeProvider';

type VjsGossipComponentOptions = VjsComponentBridgeOptions<GossipPlugin<TopicMetadata>>;

export type VjsGossipComponentProps = VjsGossipComponentOptions;

class VjsGossipComponent extends VjsBridgeComponentBase<VjsGossipComponentOptions> {

  override onMount(render: RenderFn): void {
    render(
      <VjsComponentBridgeProvider bridge={this}>
        <Test {...this.options_} />
      </VjsComponentBridgeProvider>
    );
  }

}

videojs.registerComponent('VjsGossipComponent', VjsGossipComponent);

export default VjsGossipComponent;
