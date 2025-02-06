import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatUpdateDateToString(date: Date): string {
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

  if (diffInSeconds < 60) {
    return `Updated a few seconds ago`;
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.round(diffInSeconds / 60);
    return `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  return `Updated on ${format(date, "d MMM yyyy", { locale: enUS })}`;
}
