import { useEffect, useState } from "react";
import { TimerInterval, TimerPlaylist } from "@/types";
import { TimerQueue } from "@/utils";


interface UseTimerReturn {
  isRunning: boolean;   // Indicates if the timer is currently running
  timeRemaining: number; // Time remaining in seconds
  currentInterval: TimerInterval | undefined; // The current timer interval
  handleStartPause: () => void; // Start or pause the timer
  handleNext: () => void; // Move to the next timer interval
  handleReset: () => void; // Reset the timer to the initial state
  isDelay: boolean; // Indicates if there is a delay between intervals
  timerQueue: TimerQueue; // The timer queue instance
  isCompleted: boolean; // Indicates if the timer has completed
}

const useTimer = (playlist: TimerPlaylist): UseTimerReturn => {
  const [timerQueue] = useState<TimerQueue>(new TimerQueue(playlist));
  const [currentInterval, setCurrentInterval] = useState(timerQueue.current);
  const [endTime, setEndTime] = useState<number | null>(null); // Store endTime as a timestamp
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(currentInterval?.duration || 0);
  const [isDelay, setIsDelay] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const calculateTimeLeft = (): number => {
    if (!endTime) return 0;
    const now = Date.now();
    return Math.max(0, Math.floor((endTime - now) / 1000));
  };

  useEffect(() => {
    let animationFrameId: number;

    if (isDelay) return; // Skip the animation frame during the delay

    const tick = () => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining > 0) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        handleNext().then();
      }
    };

    if (isRunning && endTime) {
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(animationFrameId) // Cleanup animation when unmounting or pausing
  }, [isRunning, endTime]);

  const handleStartPause = () => {
    if (!isRunning) {
      if (!endTime) {
        // Initialize the end time when starting for the first time
        const newEndTime = Date.now() + currentInterval!.duration * 1000;
        setEndTime(newEndTime);
        setTimeLeft(currentInterval!.duration);
        setIsCompleted(false);
      } else {
        // Resume the timer by adding the remaining time to the end time
        setEndTime(Date.now() + (timeLeft * 1000) + 500);
      }
    }
    setIsRunning(!isRunning);
  };

  const handleNext = async () => {
    setIsDelay(true);

    await new Promise(resolve => setTimeout(resolve, 500)); // Delay for 0.5 seconds

    const nextInterval = timerQueue.next();
    if (nextInterval) {
      setCurrentInterval(nextInterval);
      setTimeLeft(nextInterval.duration);

      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 0.5 seconds

      const newEndTime = Date.now() + nextInterval.duration * 1000;
      setEndTime(newEndTime);
    } else {
      setIsCompleted(true);
      resetTimer();
    }

    setIsDelay(false);
  };

  const resetTimer = () => {
    timerQueue.reset();
    setCurrentInterval(timerQueue.current);
    setEndTime(null);
    setTimeLeft(timerQueue.current?.duration || 0);
    setIsRunning(false);
    setIsDelay(false);
  };

  return {
    isRunning,
    timeRemaining: timeLeft,
    currentInterval,
    timerQueue,
    isDelay,
    isCompleted,
    handleStartPause,
    handleNext,
    handleReset: resetTimer,
  }
}

export default useTimer;
