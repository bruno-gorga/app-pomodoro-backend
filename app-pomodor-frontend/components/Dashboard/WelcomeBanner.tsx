
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check } from "lucide-react";

const WelcomeBanner = () => {
  const { user } = useAuth();
  
  // Don't show banner for our special user anymore
  if (user?.email === "bmg391@hotmail.com") return null;
  
  return (
    <Alert className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <Check className="h-4 w-4 text-green-500" />
      <AlertTitle>Welcome Back!</AlertTitle>
      <AlertDescription>
        Ready to boost your productivity today? Your Pomodoro timer is all set up.
      </AlertDescription>
    </Alert>
  );
};

export default WelcomeBanner;
