
import { Session } from "@/lib/api";

export interface ExtendedSession extends Session {
  notes: string;
}

export type TimerState = "idle" | "running" | "paused" | "completed";

export type TimerMode = "focus" | "break";

export interface TimerContextType {
  duration: number;
  timeRemaining: number;
  progress: number;
  timerState: TimerState;
  timerMode: TimerMode;
  isAudioEnabled: boolean;
  sessions: ExtendedSession[];
  setDuration: (minutes: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  toggleAudio: () => void;
  switchMode: (mode: TimerMode) => void;
  loadSessions: () => Promise<void>;
  generateQuickSession: (customDuration?: number) => void;
}
