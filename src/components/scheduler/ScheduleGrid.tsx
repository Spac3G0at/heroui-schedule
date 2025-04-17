import React, { useState } from "react";
import moment from "moment-timezone";
import data from "@/assets/data.json";
import daysOfWeek from "@constants/daysOfTheWeek";
import buildScheduleMatrix from "@/lib/utils/buildScheduleMatrix";

type Schedules = {
  [key: string]: string[];
};

const timezone = data.timezone || "UTC"; // Coach's timezone
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
  const isDifferentTz = userTz !== coachTz;

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

    console.log("Save this in DB", datetime.toISOString());

    setReservedSet(
      (c) => new Set([...Array.from(c), datetime.format("YYYY-MM-DD HH:mm")])
    );
  };

  return (
    <div>
      {/* Warning */}
      {isDifferentTz && (
        <div
          style={{
            background: "#fff3cd",
            color: "#856404",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          ⚠️ The schedule is shown in the coach’s timezone ({coachTz}). You are
          currently in {userTz}.
        </div>
      )}

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <button onClick={prevWeek}>← Previous Week</button>
        <div style={{ fontWeight: "bold" }}>
          Week of {dayDates["monday"].format("MMMM D, YYYY")}
        </div>
        <button onClick={nextWeek}>Next Week →</button>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(7, 1fr)`,
          gap: "4px",
        }}
      >
        {/* Header */}
        {daysOfWeek.map((day) => (
          <div
            key={`header-${day}`}
            style={{
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {day}
            <br />
            <small>{dayDates[day].format("MM/DD")}</small>
          </div>
        ))}

        {/* Time Slots */}
        {hours.map((hour) =>
          daysOfWeek.map((day) => {
            const isActive = matrix[day].has(hour);
            return (
              <div
                key={`${day}-${hour}`}
                onClick={() => onBook({ isActive, day, hour })}
                style={{
                  height: "30px",
                  backgroundColor: isActive ? "#d0f0c0" : "#f0f0f0",
                  borderRadius: "4px",
                  textAlign: "center",
                  lineHeight: "30px",
                }}
              >
                {isActive ? hour : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ScheduleGrid;
