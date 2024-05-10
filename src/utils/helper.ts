import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { changeToSeconds, convertToHMInString } from "./dateTime";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getWorkingHours = (checkIn: string, checkOut: string) => {
  const checkInSecs = changeToSeconds(checkIn);
  const checkOutSecs = changeToSeconds(checkOut);
  const workHrs = checkOutSecs - checkInSecs;
  const workHrsTime = convertToHMInString(workHrs.toString());
  return workHrsTime;
};
