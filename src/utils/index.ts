import type { IQueue, ITimerQueue, TimerInterval, TimerPlaylist } from "@/types";

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

export class TimerQueue implements ITimerQueue {

  readonly #_currentPlaylist: TimerPlaylist | null = null;
  #_queue: Queue<TimerInterval> = new Queue<TimerInterval>();

  constructor(playlist: TimerPlaylist) {
    // Set the current playlist
    this.#_currentPlaylist = playlist;
    // Build the queue based on the intervals in the playlist
    this.#buildQueue();
  }

  // Build the queue based on the intervals in the playlist
  #buildQueue(): void {
    if (this.#_currentPlaylist)
      for (const interval of this.#_currentPlaylist.intervals) {
        // Add the interval to the queue
        this.#_queue.enqueue(interval);
        // If there is a rest period, add it to the queue
        if (interval.rest)
          this.#_queue.enqueue({ name: "Rest", duration: interval.rest });
      }
  }

  get current(): TimerInterval | undefined {
    // Return the first item in the queue
    return this.#_queue.peek();
  }

  next(): TimerInterval | undefined {
    // Remove and return the first item in the queue
    this.#_queue.dequeue();
    return this.current;
  }

  hasNext(): boolean {
    // Check if the queue is empty
    return !this.#_queue.isEmpty();
  }

  reset(): void {
    // Rebuild the queue based on the playlist
    this.#_queue = new Queue<TimerInterval>();
    this.#buildQueue();
  }
}