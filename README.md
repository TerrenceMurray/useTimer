# `useTimer` Hook for React

The `useTimer` hook is a versatile utility for managing sequential timers in React applications. It supports custom timer playlists, integrates interval transitions seamlessly, and provides a straightforward API for controlling timer behavior. This hook is ideal for building components like workout timers, guided routines, or any use case requiring timer queues.

## Getting Started
___

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open http://localhost:3000 with your browser to see the result.

---

## Features

- **Playlist Support**: Supports sequentially timed intervals based on a provided playlist.
- **Precise Timer Control**: Includes controls to start/pause, skip to the next interval, and reset the timer.
- **Delay Handling**: Smooth transitions between intervals with optional delay states.
- **State Tracking**: Provides real-time information on the current interval, time remaining, and completion status.
- **Custom Logic Handling**: Built-in mechanisms to manage delay states and interval transitions.

---

## Types

### TimerInterval
Represents an activity duration with an optional rest period.
```ts
export type TimerInterval = {
  name: string; // Name of the interval (e.g., "Workout")
  duration: number; // Duration of the interval in seconds
  rest?: number; // Optional rest period after the interval, in seconds
};
```

### TimerPlaylist
A collection of timer intervals.
```ts
export type TimerPlaylist = {
  id: string; // Unique identifier for the playlist
  intervals: TimerInterval[]; // Array of timer intervals
};
```

### ITimerQueue
Interface for a specialized Timer Queue handling timer playlists.
```ts
export interface ITimerQueue {
  current: TimerInterval | undefined; // The currently active timer interval (undefined if none is active)
  next: () => TimerInterval | undefined; // Move to the next timer interval in the playlist
  hasNext: () => boolean; // Check if the queue has more timer intervals
  reset: () => void; // Reset the timer queue to its initial state
}
```

### IQueue
A generic queue interface.
```ts
export interface IQueue<T> {
  enqueue: (item: T) => void; // Add an item to the queue
  dequeue: () => T | undefined; // Remove and return the first item
  peek: () => T | undefined; // View the first item without removing it
  isEmpty: () => boolean; // Check if the queue is empty
}
```

---

## Implementation

This hook is included in the project as a module and can be directly imported into your components:

### Example Usage

```tsx
import React from 'react';
import useTimer from './hooks/useTimer';

const TimerComponent = () => {
  const playlist = {
    id: 'playlist1',
    intervals: [
      { name: 'Interval 1', duration: 10 },
      { name: 'Interval 2', duration: 5 },
      { name: 'Interval 3', duration: 8 },
    ],
  };

  const {
    isRunning,
    timeRemaining,
    currentInterval,
    handleStartPause,
    handleNext,
    handleReset,
    isCompleted,
    isDelay,
  } = useTimer(playlist);

  return (
    <div>
      <h1>Custom Timer</h1>
      {isCompleted ? (
        <p>Timer completed!</p>
      ) : (
        <>
          <p>Current Interval: {currentInterval?.name}</p>
          <p>Time Remaining: {timeRemaining} seconds</p>
        </>
      )}
      <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={handleNext} disabled={isCompleted || isDelay}>
        Next
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default TimerComponent;
```

---

## API Reference

### Hook Signature
```tsx
const {
  isRunning,
  timeRemaining,
  currentInterval,
  handleStartPause,
  handleNext,
  handleReset,
  isDelay,
  timerQueue,
  isCompleted,
} = useTimer(playlist);
```

### Parameters
- **`playlist`** *(TimerPlaylist)*: A playlist object containing:
    - `id` *(string)*: Unique identifier for the playlist.
    - `intervals` *(TimerInterval[])*: Array of intervals where each interval has:
        - `name` *(string)*: Name of the interval.
        - `duration` *(number)*: Duration of the interval in seconds.
        - `rest?` *(number)*: Optional rest period in seconds.

### Returned Values
| Name                | Type                           | Description                                                   |
|---------------------|--------------------------------|---------------------------------------------------------------|
| `isRunning`         | `boolean`                     | Whether the timer is running.                                 |
| `timeRemaining`     | `number`                      | Time remaining (in seconds) for the current interval.         |
| `currentInterval`   | `TimerInterval | undefined`   | The currently active interval.                                |
| `handleStartPause`  | `() => void`                  | Toggles between starting and pausing the timer.               |
| `handleNext`        | `() => void`                  | Skips to the next interval in the playlist.                   |
| `handleReset`       | `() => void`                  | Resets the timer to the initial interval and stops execution. |
| `isDelay`           | `boolean`                     | Indicates if a delay is occurring between intervals.          |
| `timerQueue`        | `ITimerQueue`                 | The instance of the playlist queue.                          |
| `isCompleted`       | `boolean`                     | Indicates whether the timer has finished all intervals.       |

---

## Contributing

Since this module is specific to your project, improvements and contributions can follow internal team processes. Create issues or submit pull requests to propose updates or fixes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

### Feedback

For any questions, suggestions, or feedback, feel free to reach out or create an issue in the repository. Your input helps us make this hook better!

