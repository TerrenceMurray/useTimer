import { TimerPlaylist } from "@/types";
import { TimerQueue } from "@/utils";

describe("TimerQueue", () => {
  const samplePlaylist: TimerPlaylist = {
    id: "98342",
    intervals: [
      { name: "Workout 1", duration: 30, rest: 10 },
      { name: "Workout 2", duration: 10 },
    ]
  };

  it("should build the timer queue correctly", () => {
    const timerQueue = new TimerQueue(samplePlaylist);
    timerQueue.next();
    expect(timerQueue.current).toEqual({ name: "Rest", duration: 10 });
  });

  it("should be able to get the current timer interval", () => {
    const timerQueue = new TimerQueue(samplePlaylist);
    expect(timerQueue.current).toEqual(samplePlaylist.intervals[0]);
  });

  it("should be able to move to the next timer interval", () => {
    const timerQueue = new TimerQueue(samplePlaylist);
    const nextInterval = timerQueue.next();
    expect(nextInterval).toEqual({ name: "Rest", duration: 10 });
    expect(timerQueue.current).toEqual({ name: "Rest", duration: 10 });
  });

  it("should be able indicate if there are more timer intervals", () => {
    const timerQueue = new TimerQueue(samplePlaylist);
    expect(timerQueue.hasNext()).toBeTruthy();
    timerQueue.next();
    timerQueue.next();
    timerQueue.next();
    expect(timerQueue.hasNext()).toBeFalsy();
  });
});