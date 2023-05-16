import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import './components/Button';
import './components/VjsGossip';
import { TopicData, TopicState } from './topicState';
import { Identifiable, Plugin } from './types';

interface PluginState {
  isAnnotationMode: boolean;
  initialized: boolean;
}

const defaultPluginState: PluginState = {
  isAnnotationMode: false,
  initialized: false
}

const PluginBase = videojs.getPlugin('plugin') as Plugin<PluginState>;

interface PluginOptions<TopicMetadata extends Identifiable> {
  topics?: TopicData<TopicMetadata>[]
}

class GossipPlugin<TopicMetadata extends Identifiable> extends PluginBase {

  static VERSION = '0.0.1';

  static defaultState: PluginState = defaultPluginState;

  private topics: TopicState<TopicMetadata> = new TopicState();

  declare state: typeof PluginBase['state'];

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

export { PluginBase };

export default GossipPlugin;

