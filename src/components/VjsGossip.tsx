import React from 'react';
import videojs from 'video.js';
import GossipPlugin, { TopicMetadata } from '../main';
import { VjsGossipBridgeOptions } from '../types';
import Test from './Test';
import VjsBridgeComponentBase, { RenderFn } from './VjsComponentBridgeBase';
import VjsComponentBridgeProvider from './VjsComponentBrigdeProvider';

type VjsGossipComponentOptions = VjsGossipBridgeOptions<GossipPlugin<TopicMetadata>>;

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
