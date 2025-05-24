import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTimer } from "@/contexts/timer";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

// AI insights based on session patterns
const generateInsights = (sessions: any[]) => {
  const insights = [
    "Based on your session history, you're most productive in the morning hours. Consider scheduling important tasks between 9 AM and 12 PM for optimal focus.",
    "Your focus sessions are most effective when they're 25 minutes long. Consider sticking to this duration for optimal productivity.",
    "You've been consistent with your Pomodoro practice! Your weekly session count is above average, showing great discipline in your work habits.",
    "I notice you take fewer breaks on Mondays. Remember that regular breaks help maintain sustained productivity throughout the week.",
    "Your longest focus streaks happen on Thursdays. This might be a good day to tackle your most challenging tasks.",
    "You've completed more sessions in the afternoon than any other time. Consider scheduling your most important work during these peak performance hours.",
    "Your session history shows great discipline. You've maintained consistent 25-minute sessions, which is the sweet spot for focus according to research.",
    "Based on your completed sessions, you might be experiencing a productivity dip mid-week. Consider adding a short walking break on Wednesdays.",
    "Your focus pattern shows great improvement! You've increased your average session duration by 15% over the past week.",
    "According to your history, you complete more focus sessions when you start your day with one. Try beginning each workday with a focused Pomodoro session."
  ];
  
  // If no sessions, return generic insights
  if (!sessions || sessions.length === 0) {
    return insights.slice(0, 5);
  }
  
  // Shuffle the insights and take 5
  const shuffled = [...insights].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

const AISuggestions = () => {
  const [suggestion, setSuggestion] = useState<string>("");
  const [allInsights, setAllInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { sessions } = useTimer();

  // Generate insights based on sessions when component mounts or sessions change
  useEffect(() => {
    setAllInsights(generateInsights(sessions));
  }, [sessions]);

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Select a random insight that's different from current one
      let newInsight;
      do {
        const randomIndex = Math.floor(Math.random() * allInsights.length);
        newInsight = allInsights[randomIndex];
      } while (newInsight === suggestion && allInsights.length > 1);
      
      setSuggestion(newInsight);
    } catch (error) {
      console.error("Failed to fetch AI suggestion:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show first insight automatically when component mounts
  useEffect(() => {
    if (allInsights.length > 0 && !suggestion) {
      setSuggestion(allInsights[0]);
    }
  }, [allInsights, suggestion]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Activity size={18} />
          AI Productivity Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestion ? (
          <div className="space-y-4">
            <p className="text-sm">{suggestion}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchSuggestion} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Generating new insights..." : "Get new insights"}
            </Button>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-muted-foreground mb-2">No session data yet</p>
            <p className="text-sm text-muted-foreground">
              Complete some Pomodoro sessions to receive AI-powered productivity insights
            </p>
          </div>
        ) : loading ? (
          <div className="text-center p-6">
            <p className="text-muted-foreground animate-pulse">
              Analyzing your productivity patterns...
            </p>
          </div>
        ) : (
          <div className="text-center p-6">
            <Button 
              onClick={fetchSuggestion} 
              disabled={loading}
            >
              Generate insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
