import moment, { Moment } from "moment-timezone";
// Build hour slots for a given day and time range
const getHourSlots = (
  range: string,
  dayDate: Moment,
  timezone: string
): string[] => {
  const [start, end] = range.split("-");

  const startTime = moment.tz(
    `${dayDate.format("YYYY-MM-DD")} ${start}`,
    "YYYY-MM-DD HH:mm",
    timezone
  );
  const endTime = moment.tz(
    `${dayDate.format("YYYY-MM-DD")} ${end}`,
    "YYYY-MM-DD HH:mm",
    timezone
  );

  const slots: string[] = [];

  const current = startTime.clone();
  while (current.isBefore(endTime)) {
    slots.push(current.format("HH:mm"));
    current.add(1, "hour");
  }

  return slots;
};

export default getHourSlots;
