import Player from 'video.js/dist/types/player';

declare module 'video.js' {
    export interface VjsPlayer extends Player {
        usingPlugin(name: string): boolean;

        [key: string]: Function | any;
    }
}