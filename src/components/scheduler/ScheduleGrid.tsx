import React, { useState } from "react";
import moment from "moment-timezone";
import data from "@/assets/data.json";
import buildScheduleMatrix from "@/lib/utils/buildScheduleMatrix";
import TimezoneWarning from "./TimezoneWarning";
import FullGrid from "./FullGrid";
import SchduleNavigation from "./SchduleNavigation";

type Schedules = {
  [key: string]: string[];
};

const timezone = data.timezone || "UTC"; // Coach's timezone - from "moment.tz.guess()"
const schedules: Schedules = data.schedules;
const reserved = data.reserved;

const ScheduleGrid: React.FC = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  const [reservedSet, setReservedSet] = useState(
    new Set(
      reserved.map((iso) => moment.tz(iso, timezone).format("YYYY-MM-DD HH:mm"))
    )
  );

  const { hours, matrix, dayDates } = buildScheduleMatrix(
    weekOffset,
    timezone,
    schedules,
    reservedSet
  );

  // Detect timezones
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const coachTz = moment.tz.zone(timezone)?.name || timezone;

  const nextWeek = () => setWeekOffset((prev) => prev + 1);
  const prevWeek = () => setWeekOffset((prev) => prev - 1);

  const onBook: (params: {
    isActive: boolean;
    day: string;
    hour: string;
  }) => void = ({ isActive, day, hour }) => {
    if (!isActive) return;

    const datetime = moment.tz(
      `${dayDates[day].format("YYYY-MM-DD")} ${hour}`,
      "YYYY-MM-DD HH:mm",
      timezone
    );

    // datetime.toISOString() - format to save into the DB

    setReservedSet(
      (c) => new Set([...Array.from(c), datetime.format("YYYY-MM-DD HH:mm")])
    );
  };

  return (
    <div>
      {/* Warning */}
      <TimezoneWarning userTz={userTz} coachTz={coachTz} />

      {/* Navigation */}
      <SchduleNavigation
        dayDates={dayDates}
        nextWeek={nextWeek}
        prevWeek={prevWeek}
      />

      {/* Grid */}
      <FullGrid
        dayDates={dayDates}
        hours={hours}
        matrix={matrix}
        onBook={onBook}
      />
    </div>
  );
};

export default ScheduleGrid;
