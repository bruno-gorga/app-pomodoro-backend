import React from "react";
import { ExtendedSession } from "@/contexts/timer/types";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

interface SessionItemProps {
  session: ExtendedSession;
}

const SessionItem = ({ session }: SessionItemProps) => {
  // Format date only, remove time
  const date = format(new Date(session.startTime), "MMM d, yyyy");
  
  // Duration in minutes
  const durationMinutes = session.duration / 60;

  return (
    <div className="session-item flex items-center justify-between p-3 bg-card rounded-md border border-border">
      <div className="flex items-start gap-3">
        <div className="flex flex-col">
          <div className="flex items-center text-sm font-medium">
            <CalendarDays size={14} className="mr-1 text-muted-foreground" />
            {date}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium">{durationMinutes} min</span>
      </div>
    </div>
  );
};

export default SessionItem;
