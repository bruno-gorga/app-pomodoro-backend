import { useTimer } from "@/contexts/timer";
import TimerControls from "./TimerControls";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";

const PomodoroTimer = () => {
  const {
    duration,
    timeRemaining,
    progress,
    timerState,
    timerMode,
    isAudioEnabled,
    setDuration,
    toggleAudio,
    switchMode,
  } = useTimer();

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const circumference = 2 * Math.PI * 120; // 120 is the radius of the circle
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <Badge
              variant={timerMode === "focus" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => switchMode("focus")}
            >
              Focus
            </Badge>
            <Badge
              variant={timerMode === "break" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => switchMode("break")}
            >
              Break
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="audio-toggle"
              checked={isAudioEnabled}
              onCheckedChange={toggleAudio}
            />
            <Label htmlFor="audio-toggle">Sound</Label>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Timer circle */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 256 256"
            >
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                strokeWidth="8"
                stroke="hsl(var(--secondary))"
                className="timer-backdrop"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                strokeWidth="12"
                stroke={timerMode === "focus" ? "#4F46E5" : "#10B981"}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="timer-circle"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Clock
                size={28}
                className="mb-2 text-muted-foreground"
              />
              <div className="text-5xl font-bold tracking-tighter">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {timerState === "running"
                  ? "Running"
                  : timerState === "paused"
                  ? "Paused"
                  : timerState === "completed"
                  ? "Completed"
                  : "Ready"}
              </div>
            </div>
          </div>

          <TimerControls />

          {timerState === "idle" && (
            <div className="w-full mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Duration</span>
                <span className="text-sm font-medium">{duration / 60} min</span>
              </div>
              <Slider
                defaultValue={[duration / 60]}
                min={1}
                max={60}
                step={1}
                onValueChange={(values) => setDuration(values[0] * 60)}
                className="w-full"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
