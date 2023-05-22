import { VjsPlayer } from 'video.js';
import VideojsPlugin from 'video.js/dist/types/plugin';

export type Nullable<T> = T | null;

export type Id = string | number;

export interface Identifiable<T extends Id = string> {
  id: T
}

export interface Ctor<T extends new (...args: any) => any> {
  new (...args: ConstructorParameters<T>): InstanceType<T>;
}

export type VjsComponent<T extends new (...args: any) => any, K> = Ctor<T> & K;

export interface PluginCtor<T> {
  new (player: VjsPlayer, options: any): VjsPlugin<T> & VideojsPlugin;
}

interface StateUpdateFn<T> {
  (stateUpdates: (() => Partial<T>) | Partial<T>): void
}

export interface StatfulPlugin<T> {
  state: T;
  setState: StateUpdateFn<T>
}

type EventTarget = string | [] | Element | object;
type EventType = string | [] | Function

export interface EventedPlugin {
  on(target: EventTarget, type: EventType, listener?: Function): void;
}

export type VjsPlugin<PluginState> = PluginCtor<PluginState> & EventedPlugin & StatfulPlugin<PluginState>;

export type VjsPluginLike = VjsPlugin<any> | VideojsPlugin;

export type VjsPluginType<T> = T extends VjsPlugin<infer U> ? VjsPlugin<U> : VjsPlugin<unknown>;
