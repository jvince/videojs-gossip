import { kebabCase } from 'lodash';
import { FunctionComponent } from 'react';
import { Root, createRoot } from 'react-dom/client';
import videojs, { VjsPlayer } from 'video.js';
import Component from 'video.js/dist/types/component';
import { VjsComponent } from '../types';

const VjsComponentBase = videojs.getComponent('Component') as VjsComponent<typeof Component, Component>;

export interface VjsComponentBridgeOptions {
  name: string;
  children?: any[];
  className?: string;
}

export type VjsReactComponentProps<T = null> = T extends null ? VjsComponentBridgeOptions : VjsComponentBridgeOptions & T;

export interface VjsReactFunctionComponent<T = null> extends FunctionComponent<VjsReactComponentProps<T>> {}

export type RenderFn = Root['render'];
export type UnmountFn = Root['unmount'];

abstract class VjsBridgeComponentBase<Options extends VjsComponentBridgeOptions = VjsComponentBridgeOptions> extends VjsComponentBase {

  private root: Root;

  declare options_: Options;

  declare player_: VjsPlayer;

  declare player: () => VjsPlayer;

  constructor(player: VjsPlayer, options?: Options) {
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
