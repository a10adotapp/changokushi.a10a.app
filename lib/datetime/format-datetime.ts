import { format } from "@formkit/tempo";

export function formatDateTime(date: Date): string {
  return format(date, "YYYY-MM-DD HH:mm:ss");
}
