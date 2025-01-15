import { renderHook, act } from "@testing-library/react";
import useTimer from "@/hook/useTimer";

// Mock TimerPlaylist
const mockPlaylist = {
  id: "it-playlist",
  intervals: [
    { name: "Interval 1", duration: 5 },
    { name: "Interval 2", duration: 10 },
    { name: "Interval 3", duration: 8 },
  ],
};

describe("useTimer Hook", () => {
  it("should initialize with the first interval", () => {
    const { result } = renderHook(() => useTimer(mockPlaylist));

    expect(result.current.currentInterval).toEqual(mockPlaylist.intervals[0]);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.timeRemaining).toBe(mockPlaylist.intervals[0].duration);
  });

  it("should start the timer when handleStartPause is called", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTimer(mockPlaylist));

    act(() => {
      result.current.handleStartPause();
    });

    expect(result.current.isRunning).toBe(true);

    // Simulate time passing
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timeRemaining).toBe(2);
    jest.useRealTimers();
  });

  it("should pause the timer when handleStartPause is called again", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTimer(mockPlaylist));

    act(() => {
      result.current.handleStartPause();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
      result.current.handleStartPause();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.timeRemaining).toBe(3);
    jest.useRealTimers();
  });

  it("should move to the next interval when handleNext is called", () => {
    const { result } = renderHook(() => useTimer(mockPlaylist));

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentInterval).toEqual(mockPlaylist.intervals[1]);
    expect(result.current.timeRemaining).toBe(mockPlaylist.intervals[1].duration);
  });

  it("should indicate completion after the last interval", () => {
    const { result } = renderHook(() => useTimer(mockPlaylist));

    // Move through all intervals
    act(() => {
      result.current.handleNext();
      result.current.handleNext();
      result.current.handleNext();
    });

    expect(result.current.isCompleted).toBe(true);
    expect(result.current.currentInterval).toBeUndefined();
  });

  it("should reset to the initial state when handleReset is called", () => {
    const { result } = renderHook(() => useTimer(mockPlaylist));

    act(() => {
      result.current.handleStartPause();
      result.current.handleNext();
      result.current.handleReset();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.currentInterval).toEqual(mockPlaylist.intervals[0]);
    expect(result.current.timeRemaining).toBe(mockPlaylist.intervals[0].duration);
    expect(result.current.isCompleted).toBe(false);
  });
});
