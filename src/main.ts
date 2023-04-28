import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { TopicState, TopicData } from './topicState';
import { Identifiable, Plugin } from './types';

interface PluginState {
  initialized: boolean;
}

const defaultPluginState: PluginState = {
  initialized: false
}

const PluginBase = videojs.getPlugin('plugin') as Plugin<PluginState>;

// const ComponentBase = videojs.getComponent('Component') as Ctor<typeof Component> & Component;

// const Button = videojs.getComponent('Button') as Ctor<typeof ButtonComponent> & ButtonComponent;

interface PluginOptions<TopicMetadata extends Identifiable> {
  topics?: TopicData<TopicMetadata>[]
}

class GossipPlugin<TopicMetadata extends Identifiable> extends PluginBase {

  static VERSION = '0.0.1';

  static defaultState: PluginState = defaultPluginState;

  private topics: TopicState<TopicMetadata> = new TopicState();

  constructor(player: Player, options: PluginOptions<TopicMetadata>) {
    super(player, options);

    if (options.topics) {
      this.topics.populate(options.topics)
    }

    this.on(player, 'timeupdate', () => {
      const currentTime = this.player.currentTime();
      console.log(`current time: ${currentTime}`);
      console.log(this.topics.findInRange(currentTime));
    });

    this.on(player, 'loadedmetadata', () => {
    });
  }

}

interface TopicMetadata {
  id: string;
  title: string;
  author: string;
}

videojs.registerPlugin('gossip', GossipPlugin<TopicMetadata>);

export default GossipPlugin;

