import React from 'react';
import videojs from 'video.js';
import Test from './Test';
import VjsBridgeComponentBase, { RenderFn } from './VjsComponentBridgeBase';
import VjsComponentBridgeProvider from './VjsComponentBrigdeProvider';

class VjsGossipComponent extends VjsBridgeComponentBase {

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
