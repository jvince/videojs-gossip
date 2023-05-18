import { kebabCase } from 'lodash';
import { FunctionComponent } from 'react';
import { Root, createRoot } from 'react-dom/client';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { PluginLike } from '../types';
import { getComponent } from '../utils';

const VjsComponent = getComponent();

export interface VjsComponentBridgeOptions<T extends PluginLike> {
  name: string;
  children?: any[];
  className?: string;
  plugin: T;
}

// export type Props<T = null> = T extends null ? VjsComponentBridgeOptions : VjsComponentBridgeOptions & T;

// export interface VjsReactFunctionComponent<T = null, K = Props<T>> {
//   (props: K): JSX.Element;
// }

export interface VjsReactFunctionComponent<Plugin extends PluginLike> extends FunctionComponent<VjsComponentBridgeOptions<Plugin>> { }

export type RenderFn = Root['render'];
export type UnmountFn = Root['unmount'];

abstract class VjsBridgeComponentBase<
  Plugin extends PluginLike,
  Options extends VjsComponentBridgeOptions<Plugin> = VjsComponentBridgeOptions<Plugin>
> extends VjsComponent {

  private root: Root;

  declare options_: Options;

  constructor(player: Player, options?: Options) {
    super(player, options);

    this.root = createRoot(this.el());

    this.player().ready(() => this.mount());
    this.on('dispose', () => this.unmount());
  }

  abstract onMount<T extends RenderFn>(render: T): void;

  protected componentName() {
    return this.constructor.name;
  }

  private mount() {
    this.onMount(this.root.render.bind(this.root));
  }

  private unmount() {
    this.onUnmount(this.root.unmount.bind(this.root));
  }

  protected onUnmount<T extends UnmountFn>(unmount: T): void {
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
