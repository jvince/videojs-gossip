import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import './components/Button';
import './components/VjsGossip';
import { TopicData, TopicState } from './topicState';
import { Identifiable } from './types';
import { getPlugin } from './utils';

interface GossipPluginState {
  isAnnotationMode: boolean;
  initialized: boolean;
}

interface PluginOptions<TopicMetadata extends Identifiable> {
  topics?: TopicData<TopicMetadata>[]
}

const defaultPluginState: GossipPluginState = {
  isAnnotationMode: false,
  initialized: false
}

const Plugin = getPlugin<GossipPluginState>();

class GossipPlugin<TopicMetadata extends Identifiable> extends Plugin {

  static VERSION = '0.0.1';

  static defaultState: GossipPluginState = defaultPluginState;

  declare state: typeof Plugin['state'];

  protected topics: TopicState<TopicMetadata> = new TopicState();

  constructor(player: Player, options: PluginOptions<TopicMetadata>) {
    super(player, options);

    if (options.topics) {
      this.topics.populate(options.topics);
    }

    this.on(player, 'timeupdate', () => {
      // const currentTime = this.player.currentTime();
      // console.log(`current time: ${currentTime}`);
      // console.log(this.topics.findInRange(currentTime));
    });

    this.on('statechanged', ({ changes }: any) => {
      if (changes?.isAnnotationMode && changes.isAnnotationMode.to) {
        player.addChild('VjsGossipComponent', { plugin: this });
      }

      if (changes?.isAnnotationMode && !changes?.isAnnotationMode?.to) {
        const component = player.getChild('VjsGossipComponent');

        if (component) {
          player.removeChild(component);
        }
      }
    });

    player.getChild('ControlBar')?.addChild('VjsGossipButton', {
      plugin: this
    });
  }

}

export interface TopicMetadata {
  id: string;
  title: string;
  author: string;
}

videojs.registerPlugin('gossip', GossipPlugin<TopicMetadata>);

export { Plugin as PluginBase };

export default GossipPlugin;
