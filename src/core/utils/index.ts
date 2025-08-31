import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: string) {
  if (!date) {
    return "";
  }

  const [datePart, hoursPart] = date.split("T");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = hoursPart.split(":");

  return `${hours}:${minutes} - ${day}/${month}/${year}`;
}
