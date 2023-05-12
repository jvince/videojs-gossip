import { kebabCase } from 'lodash';
import { Root, createRoot } from 'react-dom/client';
import videojs from 'video.js';
import Component from 'video.js/dist/types/component';
import Player from 'video.js/dist/types/player';
import { VjsComponent } from '../types';

const VjsComponentBase = videojs.getComponent('Component') as VjsComponent<typeof Component, Component>;

export interface VjsComponentBridgeOptions {
  name: string;
  children?: any[];
  className?: string;
}

export type RenderFn = Root['render'];
export type UnmountFn = Root['unmount'];

abstract class VjsBridgeComponentBase<Options extends VjsComponentBridgeOptions = VjsComponentBridgeOptions> extends VjsComponentBase {

  private root: Root;

  declare options_: Options;

  constructor(player: Player, options?: Options) {
    super(player, options);

    this.root = createRoot(this.el());

    this.player().ready(() => this.mount());
    this.on('dispose', () => this.unmount());
  }

  abstract onMount(render: RenderFn): void;

  protected componentName() {
    return this.constructor.name;
  }

  private mount() {
    this.onMount(this.root.render.bind(this.root));
  }

  private unmount() {
    this.onUnmount(this.root.unmount.bind(this.root));
  }

  protected onUnmount(unmount: UnmountFn): void {
    unmount();
  }

  override createEl(_: any, properties?: any, attributes?: any): Element {
    return videojs.dom.createEl('div', {
      className: `vjs-bridge-component ${kebabCase(this.componentName())}`,
      ...properties
    }, attributes);
  }

}

export default VjsBridgeComponentBase;
