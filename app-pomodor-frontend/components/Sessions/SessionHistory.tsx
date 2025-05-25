import React, { useEffect } from "react";
import { useTimer } from "@/contexts/timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SessionItem from "./SessionItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const SessionHistory = () => {
  const { sessions, loadSessions, generateQuickSession, duration } = useTimer();

  // Load sessions when component mounts
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // Sort sessions by date (newest first)
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  const handleRefresh = () => {
    // Pass the current timer duration when generating a quick session
    generateQuickSession(duration);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <History size={18} />
          Session History
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs font-normal text-muted-foreground">
            {sessions.length} sessions
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={handleRefresh}
            title="Add a quick session with current duration"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 pr-4">
          {sortedSessions.length > 0 ? (
            <div className="space-y-2">
              {sortedSessions.map((session) => (
                <SessionItem key={session._id} session={session} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-muted-foreground">No sessions yet</p>
              <p className="text-sm text-muted-foreground">
                Complete your first Pomodoro to see it here
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SessionHistory;
