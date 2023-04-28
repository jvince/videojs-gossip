import { Interval, IntervalTree } from 'node-interval-tree';
import { Id, Identifiable } from './types';

type IntervalType = number | bigint;

interface IntervalData<T extends Identifiable, K extends IntervalType> extends Interval<K> {
  data: T;
}

class State<T extends IntervalData<Identifiable, K>, K extends IntervalType> extends IntervalTree<T, K> {

  override remove(record?: T): boolean {
    if (!record) {
      return false;
    }
    return super.remove(record);
  }

  findRecord(id: Id): T | undefined {
    for (const record of this.preOrder()) {
      if (record.data.id === id) {
        return record;
      }
    }

    return undefined;
  }

}

export type TopicData<T extends Identifiable, K extends IntervalType = number> = IntervalData<T, K>;

class TopicState<T extends Identifiable, K extends IntervalType = number> {

  private state: State<IntervalData<T, K>, K> = new State();

  get count(): number {
    return this.state.count;
  }

  insert(low: K, high: K, data: T): boolean {
    return this.state.insert({ low, high, data });
  }

  delete(id: Id): boolean {
    const record = this.state.findRecord(id);
    return this.state.remove(record);
  }

  findInRange(low: K, high: K = low): IntervalData<T, K>[] {
    return this.state.search(low, high);
  }

  populate(topics: TopicData<T, K>[]): void {
    for (const topic of topics) {
      this.insert(topic.low, topic.high, topic.data);
    }
  }

}

export { TopicState };
