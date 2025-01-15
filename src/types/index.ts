// Generic queue interface for type T
export interface IQueue<T> {
  enqueue: (item: T) => void; // Add an item to the queue
  dequeue: () => T | undefined; // Remove and return the first item
  peek: () => T | undefined; // View the first item without removing it
  isEmpty: () => boolean; // Check if the queue is empty
}

// Interface for a specialized Timer Queue handling timer playlists
export interface ITimerQueue {
  // The currently active timer interval (undefined if none is active)
  get current(): TimerInterval | undefined;

  // Move to the next timer interval in the playlist
  next: () => TimerInterval | undefined;

  // Check if the queue has more timer intervals
  hasNext: () => boolean;

  // Reset the timer queue to its initial state
  reset: () => void;
}

// Timer interval type representing an activity duration with an optional rest period
export type TimerInterval = {
  name: string; // Name of the interval (e.g., "Workout")
  duration: number; // Duration of the interval in seconds
  rest?: number; // Optional rest period after the interval, in seconds
};

// Timer playlist type containing a list of timer intervals
export type TimerPlaylist = {
  id: string; // Unique identifier for the playlist
  intervals: TimerInterval[]; // Array of timer intervals
};