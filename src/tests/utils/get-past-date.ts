import { setYear, parseISO } from "date-fns";

export function getPastDate(date: string): Date {
  return setYear(parseISO(date), new Date(date).getFullYear() - 1);
}
