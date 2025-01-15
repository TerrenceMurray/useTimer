"use client";
import React from 'react';
import useTimer from "@/hook/useTimer";

const Timer = () => {
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

export default Timer;