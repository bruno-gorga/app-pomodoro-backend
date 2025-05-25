
import React, { createContext } from "react";
import { TimerContextType } from "./types";

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export default TimerContext;
