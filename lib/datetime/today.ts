import { applyOffset, dayStart, offset } from "@formkit/tempo";

export function today(): Date {
  const now = new Date();

  return applyOffset(dayStart(now), offset(now, "Asia/Tokyo"));
}
