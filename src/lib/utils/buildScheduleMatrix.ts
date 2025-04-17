import moment, { Moment } from "moment-timezone";
import getHourSlots from "./getHourSlots";
import daysOfWeek from "../constants/daysOfTheWeek";
// Build the weekly schedule matrix
const buildScheduleMatrix = (
  weekOffset: number,
  timezone: string,
  schedules: Record<string, string[]>,
  reservedSet: Set<string>
): {
  hours: string[];
  matrix: Record<string, Set<string>>;
  dayDates: Record<string, Moment>;
} => {
  const matrix: Record<string, Set<string>> = {};
  const allHours = new Set<string>();
  const dayDates: Record<string, Moment> = {};

  const today = moment.tz(timezone).startOf("minute");
  const baseDate = moment
    .tz(timezone)
    .isoWeekday(1)
    .startOf("day")
    .add(weekOffset, "weeks");

  for (const day of daysOfWeek) {
    const date = baseDate.clone().isoWeekday(day);
    dayDates[day] = date;
    matrix[day] = new Set();

    const ranges = schedules[day] ?? [];
    for (const range of ranges) {
      const hourSlots = getHourSlots(range, date, timezone);

      const filtered = hourSlots.filter((slot) => {
        const slotTime = moment.tz(
          `${date.format("YYYY-MM-DD")} ${slot}`,
          "YYYY-MM-DD HH:mm",
          timezone
        );

        const isFuture = slotTime.isSameOrAfter(today);
        const isReserved = reservedSet.has(slotTime.format("YYYY-MM-DD HH:mm"));

        return isFuture && !isReserved;
      });

      filtered.forEach((slot) => {
        matrix[day].add(slot);
        allHours.add(slot);
      });
    }
  }

  const sortedHours = Array.from(allHours).sort();
  return { hours: sortedHours, matrix, dayDates };
};

export default buildScheduleMatrix;
