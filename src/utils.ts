import videojs from "video.js";
import { VjsPlugin, VjsComponent } from "./types";
import Component from "video.js/dist/types/component";

/**
 * Converts a date to a unix timestamp.
 */
export function toUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

/**
 * Checks if the current environment is a browser.
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

export function getPlugin<T>() {
  return videojs.getPlugin('plugin') as VjsPlugin<T>;
}

export function getComponent() {
  return videojs.getComponent('Component') as VjsComponent<typeof Component, Component>;
}
