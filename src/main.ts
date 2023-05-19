import videojs, { VjsPlayer } from 'video.js';
import './components/Button';
import './components/VjsGossip';
import { TopicData, TopicState } from './topicState';
import { Identifiable } from './types';
import { getPlugin } from './utils';
interface GossipPluginState {
  isAnnotationMode: boolean;
  initialized: boolean;
}

const defaultPluginState: GossipPluginState = {
  isAnnotationMode: false,
  initialized: false
}

const Plugin = getPlugin<GossipPluginState>();

interface PluginOptions<TopicMetadata extends Identifiable> {
  topics?: TopicData<TopicMetadata>[]
}

class GossipPlugin<TopicMetadata extends Identifiable> extends Plugin {

  static VERSION = '0.0.1';

  static defaultState: GossipPluginState = defaultPluginState;

  private topics: TopicState<TopicMetadata> = new TopicState();

  declare state: typeof Plugin['state'];

  constructor(player: VjsPlayer, options: PluginOptions<TopicMetadata>) {
    super(player, options);

    this.setState = this.setState.bind(this);

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

export default GossipPlugin;

