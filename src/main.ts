import { Interval, IntervalTree } from 'node-interval-tree';
import { v4 as uuid } from 'uuid';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

type Metadata = {
  author: string;
  created: number;
}

interface Topic<Metadata> {
  id: Id,
  metadata: Metadata
}

type IntervalType = number | bigint;

interface IntervalData<T extends Identifiable, N extends IntervalType = number> extends Interval<N> {
  data: T;
}

function toUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

class IntervalDataTree<T extends IntervalData<Identifiable, N>, N extends IntervalType = number> extends IntervalTree<T, N> {

  private cache = new Map<Identifiable['id'], T>();

  override insert(record: T): boolean {
    const inserted = super.insert(record);

    if (inserted) {
      this.cache.set(record.data.id, record);
    }

    return inserted;
  }

  override remove(record?: T): boolean {
    if (!record) {
      return false;
    }

    const removed = super.remove(record);

    if (removed) {
      this.cache.delete(record.data.id);
    }

    return removed;
  }

  findRecord(id: string): T | undefined {
    return this.cache.get(id);
  }

}

const tree = new IntervalDataTree<IntervalData<Topic<Metadata>>>();
tree.insert({ low: 0.5, high: 10, data: { id: '101', metadata: { author: 'Pera Peric', created: toUnixTimestamp(new Date()) } } });
tree.insert({ low: 5.1, high: 15.1, data: { id: uuid(), metadata: { author: 'Zoka Zokic', created: toUnixTimestamp(new Date()) } } });
tree.insert({ low: 1.0, high: 1.5, data: { id: uuid(), metadata: { author: 'Mika Mikic', created: toUnixTimestamp(new Date()) } } });
tree.insert({ low: 12.2, high: 13.1, data: { id: uuid(), metadata: { author: 'Mika Mikic', created: toUnixTimestamp(new Date()) } } });
tree.insert({ low: 6.1, high: 18.5, data: { id: uuid(), metadata: { author: 'Mika Mikic', created: toUnixTimestamp(new Date()) } } });


console.log(tree.count);
tree.remove(tree.findRecord('101'));
console.log(tree.count);

const BasePlugin = videojs.getPlugin('plugin') as any;

class Gossip extends BasePlugin {

  constructor(player: Player) {
    super(player);
    console.log(this);

    this.on(player, 'timeupdate', () => {
      const currentTime = this.player.currentTime();
      console.log(`current time: ${currentTime}`);
      console.log(tree.search(currentTime, currentTime))
    });
  }

  dispose() {
    super.dispose();
  }

  updateState() {
    this.setState({ playing: !this.player.paused() });
  }

  logState() {
    this.log(`the player is now ${this.state.playing ? 'playing' : 'paused'}`);
  }

}

Gossip.defaultState = {};

Gossip.VERSION = '0.0.1';

videojs.registerPlugin('gossip', Gossip);

export default Gossip;

