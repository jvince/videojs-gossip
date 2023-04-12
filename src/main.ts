import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

const BasePlugin = videojs.getPlugin('plugin') as any;

class Gossip extends BasePlugin {

  constructor(player: Player) {
    super(player);

    this.on(player, ['playing', 'pause'], this.updateState);
    this.on('statechanged', this.logState);
  }

  dispose() {
    super.dispose();
  }

  updateState() {
    this.setState({ playing: this.player.paused() });
  }

  logState() {
    this.player.log(`the player is now ${this.state.playing ? 'playing' : 'paused'}`);
  }

}

Gossip.defaultState = {};

Gossip.VERSION = '0.0.1';

videojs.registerPlugin('gossip', Gossip);

export default Gossip;

