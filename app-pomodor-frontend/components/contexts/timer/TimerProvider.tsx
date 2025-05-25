import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import TimerContext from "./TimerContext";
import { TimerState, TimerMode, ExtendedSession } from "./types";
import { DEFAULT_FOCUS_DURATION, DEFAULT_BREAK_DURATION, MIN_DURATION, MOCK_SESSIONS } from "./constants";

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [duration, setDurationState] = useState(DEFAULT_FOCUS_DURATION);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_FOCUS_DURATION);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [timerMode, setTimerMode] = useState<TimerMode>("focus");
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [sessions, setSessions] = useState<ExtendedSession[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Calculate progress (0 to 1)
  const progress = 1 - timeRemaining / duration;

  const setDuration = useCallback((newDuration: number) => {
    // Ensure the duration is at least MIN_DURATION (1 minute)
    const validDuration = Math.max(newDuration, MIN_DURATION);
    
    if (timerState === "idle") {
      setDurationState(validDuration);
      setTimeRemaining(validDuration);
    }
  }, [timerState]);

  const startTimer = useCallback(() => {
    if (!user) return;

    // If timer is completed or idle, reset time before starting
    if (timerState === "completed" || timerState === "idle") {
      setTimeRemaining(duration);
    }

    setTimerState("running");

    // Record session start time if we're starting a focus session
    if (timerMode === "focus" && (timerState === "idle" || timerState === "completed")) {
      setSessionStartTime(new Date());
    }

    // Clear existing interval if any
    if (timerInterval) clearInterval(timerInterval);

    // Start a new interval
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerInterval(null);
          setTimerState("completed");
          
          // Play sound if enabled
          if (isAudioEnabled) {
            // In a real implementation, use Audio API to play sound
            console.log("Playing completion sound");
          }
          
          // Save completed session if it was a focus session
          if (timerMode === "focus" && sessionStartTime) {
            saveSession(duration);
            setSessionStartTime(null);
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimerInterval(interval);
  }, [user, timerState, duration, timerInterval, timerMode, isAudioEnabled, sessionStartTime]);

  const pauseTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimerState("paused");
  }, [timerInterval]);

  const resetTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimeRemaining(duration);
    setTimerState("idle");
    setSessionStartTime(null);
  }, [timerInterval, duration]);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled((prev) => !prev);
  }, []);

  const switchMode = useCallback((mode: TimerMode) => {
    setTimerMode(mode);
    resetTimer();
    
    // Set appropriate default duration for the mode, ensuring minimum duration
    if (mode === "focus") {
      setDurationState(DEFAULT_FOCUS_DURATION);
      setTimeRemaining(DEFAULT_FOCUS_DURATION);
    } else {
      setDurationState(DEFAULT_BREAK_DURATION);
      setTimeRemaining(DEFAULT_BREAK_DURATION);
    }
  }, [resetTimer]);

  // Helper function to get stored sessions from localStorage
  const getStoredSessions = useCallback(() => {
    try {
      const storedSessions = JSON.parse(localStorage.getItem('pomodoro_sessions') || '[]');
      return storedSessions;
    } catch (error) {
      console.error("Error parsing stored sessions:", error);
      return [];
    }
  }, []);

  const saveSession = useCallback(async (sessionDuration: number) => {
    if (!user || !sessionStartTime) return;
    
    try {
      // Create a local session first
      const newSession: ExtendedSession = {
        _id: `local-${Date.now()}`,
        userId: user._id,
        duration: sessionDuration,
        startTime: sessionStartTime.toISOString(),
        notes: ''
      };
      
      // Store in local state
      setSessions(prevSessions => [...prevSessions, newSession]);
      
      // Also store in localStorage for persistence
      const storedSessions = getStoredSessions();
      localStorage.setItem('pomodoro_sessions', JSON.stringify([...storedSessions, newSession]));
      
      // Try to save to backend in the background (but don't show errors)
      try {
        api.createSession(user._id, sessionDuration).catch(() => {
          // Silent fail - nothing to do, already saved locally
        });
      } catch (error) {
        // Silently ignore backend errors, we already saved locally
      }
      
      toast({
        title: "Session completed",
        description: `You completed a ${sessionDuration / 60} minute session!`,
      });
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  }, [user, sessionStartTime, toast, getStoredSessions]);

  // Modified generateQuickSession to accept a custom duration
  const generateQuickSession = useCallback((customDuration?: number) => {
    if (!user) return;
    
    try {
      // Use the provided custom duration or default to 60 seconds (1 minute)
      const sessionDuration = customDuration || 60;
      
      // Create a quick session with the specified duration
      const newSession: ExtendedSession = {
        _id: `quick-${Date.now()}`,
        userId: user._id,
        duration: sessionDuration, // Use the custom duration
        startTime: new Date().toISOString(),
        notes: ''
      };
      
      // Store in local state
      setSessions(prevSessions => [...prevSessions, newSession]);
      
      // Also store in localStorage for persistence
      const storedSessions = getStoredSessions();
      localStorage.setItem('pomodoro_sessions', JSON.stringify([...storedSessions, newSession]));
      
      const durationMinutes = Math.round(sessionDuration / 60);
      toast({
        title: "Session Added",
        description: `A ${durationMinutes} minute session was added to your history.`,
      });
    } catch (error) {
      console.error("Failed to generate quick session:", error);
    }
  }, [user, getStoredSessions, toast]);

  const loadSessions = useCallback(async () => {
    if (!user) return;
    
    try {
      // Check if the user is bmg391@gmail.com (blank dashboard)
      const userEmail = localStorage.getItem('user_email');
      if (userEmail === 'bmg391@gmail.com') {
        // Clear any existing sessions and return empty
        setSessions([]);
        localStorage.setItem('pomodoro_sessions', JSON.stringify([]));
        return;
      }
      
      // For bmg391@hotmail.com or any other user, load sessions
      
      // First load from localStorage
      const storedSessions = getStoredSessions();
      // Filter for current user's sessions
      const userSessions = storedSessions.filter(
        (session: ExtendedSession) => session.userId === user._id
      );
      
      // Use mock data if no local sessions and user is bmg391@hotmail.com
      if (userSessions.length === 0 && userEmail === 'bmg391@hotmail.com') {
        console.log("No stored sessions found, using mock data");
        setSessions(MOCK_SESSIONS);
        // Save mock sessions to localStorage
        localStorage.setItem('pomodoro_sessions', JSON.stringify(MOCK_SESSIONS));
        return;
      } else if (userSessions.length === 0) {
        // For other users (not bmg391@gmail.com or bmg391@hotmail.com)
        // Just set empty array
        setSessions([]);
        return;
      }
      
      // Set sessions from localStorage
      setSessions(userSessions);
      
      // Try to fetch from backend but don't show errors
      try {
        const apiSessions = await api.getSessions();
        // Update sessions if backend fetch was successful
        const enhancedSessions = apiSessions.map(session => {
          return {
            ...session,
            notes: session.notes || ''
          } as ExtendedSession;
        });
        
        // Merge local and remote sessions (prefer remote)
        const mergedSessions = [
          ...userSessions.filter(local => 
            !enhancedSessions.some(remote => remote._id === local._id)
          ),
          ...enhancedSessions
        ];
        
        setSessions(mergedSessions);
        localStorage.setItem('pomodoro_sessions', JSON.stringify(mergedSessions));
      } catch (error) {
        // Silent fail - we already have local sessions
        console.log("Backend unavailable, using local sessions only");
      }
    } catch (error) {
      console.error("Failed to load sessions:", error);
      // Check if user is bmg391@hotmail.com - only then use mock data
      const userEmail = localStorage.getItem('user_email');
      if (userEmail === 'bmg391@hotmail.com') {
        setSessions(MOCK_SESSIONS);
        localStorage.setItem('pomodoro_sessions', JSON.stringify(MOCK_SESSIONS));
      } else {
        // For other users, set empty array
        setSessions([]);
      }
    }
  }, [user, getStoredSessions]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Load sessions when user changes
  useEffect(() => {
    if (user) {
      loadSessions();
    } else {
      setSessions([]);
    }
  }, [user, loadSessions]);

  return (
    <TimerContext.Provider
      value={{
        duration,
        timeRemaining,
        progress,
        timerState,
        timerMode,
        isAudioEnabled,
        sessions,
        setDuration,
        startTimer,
        pauseTimer,
        resetTimer,
        toggleAudio,
        switchMode,
        loadSessions,
        generateQuickSession,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
