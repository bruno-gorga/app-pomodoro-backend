import React from "react";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/contexts/timer";

const TimerControls = () => {
  const { timerState, startTimer, pauseTimer, resetTimer } = useTimer();

  return (
    <div className="flex justify-center space-x-3 mt-6">
      {timerState === "idle" || timerState === "completed" ? (
        <Button
          onClick={startTimer}
          className="px-8 py-2 bg-timer-focus hover:bg-timer-focus/90 text-white"
        >
          Start
        </Button>
      ) : timerState === "running" ? (
        <Button
          onClick={pauseTimer}
          variant="outline"
          className="px-8 py-2"
        >
          Pause
        </Button>
      ) : (
        <Button
          onClick={startTimer}
          className="px-8 py-2 bg-timer-focus hover:bg-timer-focus/90 text-white"
        >
          Resume
        </Button>
      )}

      <Button
        onClick={resetTimer}
        variant="ghost"
        className="px-6 py-2"
        disabled={timerState === "idle"}
      >
        Reset
      </Button>
    </div>
  );
};

export default TimerControls;
