import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTimer } from "@/contexts/timer";
import { format, subDays, isSameDay } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { 
  NameType, 
  ValueType 
} from "recharts/types/component/DefaultTooltipContent";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const PerformanceChart = () => {
  const { sessions, generateQuickSession, duration } = useTimer();

  // Generate data for the last 7 days
  const generateChartData = () => {
    const today = new Date();
    const last7Days = [...Array(7)].map((_, i) => {
      const date = subDays(today, 6 - i);
      
      // Find all sessions for this day
      const daySessions = sessions.filter(session => 
        isSameDay(new Date(session.startTime), date)
      );
      
      // Calculate total minutes for the day
      const totalMinutes = daySessions.reduce(
        (acc, session) => acc + (session.duration / 60),
        0
      );
      
      return {
        date: format(date, "EEE"),
        minutes: totalMinutes,
        fullDate: format(date, "MMM d"),
      };
    });

    return last7Days;
  };

  const data = generateChartData();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const dataPoint = data.find(d => d.date === label);
      return (
        <div className="custom-tooltip bg-popover text-popover-foreground p-2 rounded-md shadow-md border border-border">
          <p className="font-medium">{dataPoint?.fullDate}</p>
          <p className="text-sm">
            <span className="text-timer-progress">{`${item.value} minutes`}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  const handleRefresh = () => {
    // Pass the current timer duration when generating a quick session
    generateQuickSession(duration);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Weekly Performance</CardTitle>
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
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="minutes" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]} 
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
