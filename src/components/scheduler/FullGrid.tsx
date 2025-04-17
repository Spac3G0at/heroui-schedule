import daysOfWeek from "@constants/daysOfTheWeek";
import { Button } from "@heroui/react";
import clsx from "clsx";

type FullGridProps = {
  dayDates: Record<string, moment.Moment>;
  hours: string[];
  matrix: Record<string, Set<string>>;
  onBook: (params: { isActive: boolean; day: string; hour: string }) => void;
};

const FullGrid: React.FC<FullGridProps> = ({
  dayDates,
  hours,
  matrix,
  onBook,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Header */}
      {daysOfWeek.map((day) => (
        <div key={`header-${day}`} className="font-bold text-center capitalize">
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
            <Button
              key={`${day}-${hour}`}
              isDisabled={!isActive}
              className={clsx(
                "rounded-md text-white",
                isActive && "bg-violet-600",
                !isActive && "bg-gray-200"
              )}
              onPress={() => onBook({ isActive, day, hour })}
            >
              {isActive ? hour : ""}
            </Button>
          );
        })
      )}
    </div>
  );
};

export default FullGrid;
