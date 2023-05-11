import VideojsPlugin from 'video.js/dist/types/plugin';
import Player from 'video.js/dist/types/player';

export type Id = string | number;

export interface Identifiable<T extends Id = string> {
  id: T
}

export interface Ctor<T extends new (...args: any) => any> {
  new (...args: ConstructorParameters<T>): InstanceType<T>;
}

export type VjsComponent<T extends new (...args: any) => any, K> = Ctor<T> & K;

export interface PluginCtor<T> {
  new (player: Player, options: any): Plugin<T> & VideojsPlugin;
}

interface StateUpdatesFn<T> {
  (): Partial<T>;
}

export interface StatfulPlugin<T> {
  state: T;
  setState(stateUpdates: StateUpdatesFn<T> | Partial<T>): void;
}

type EventTarget = string | [] | Element | object;
type EventType = string | [] | Function

export interface EventedPlugin {
  on(target: EventTarget, type: EventType, listener?: Function): void;
}

export type Plugin<PluginState> = PluginCtor<PluginState> & EventedPlugin & StatfulPlugin<PluginState>;
