import React from 'react';
import videojs from 'video.js';
import VjsBridgeComponentBase, { RenderFn } from './VjsComponentBridgeBase';
import Test from './Test';
import VjsComponentBridgeProvider from './VjsComponentBrigdeProvider';

class VjsGossipComponent extends VjsBridgeComponentBase {

  override onMount(this: VjsBridgeComponentBase, render: RenderFn): void {
    render(
      <VjsComponentBridgeProvider bridge={this}>
        <Test {...this.options_} />
      </VjsComponentBridgeProvider>
    );
  }

}

videojs.registerComponent('VjsGossipComponent', VjsGossipComponent);

export default VjsGossipComponent;
