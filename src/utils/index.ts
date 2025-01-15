import { IQueue, ITimerQueue, TimerInterval } from "@/types";

export class Queue<T> implements IQueue<T> {
  #_items: T[] = [];

  dequeue(): T | undefined {
    return this.#_items.shift();
  }

  enqueue(item: T): void {
    this.#_items.push(item);
  }

  isEmpty(): boolean {
    return this.#_items.length === 0;
  }

  peek(): T | undefined {
    return this.#_items[0];
  }
}
