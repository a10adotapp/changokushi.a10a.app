import { addDay } from "@formkit/tempo";
import { today } from "./today";

export function tomorrow(): Date {
  return addDay(today());
}
