import { Button } from "@heroui/react";

type SchduleNavigationProps = {
  prevWeek: () => void;
  nextWeek: () => void;
  dayDates: Record<string, moment.Moment>;
};

const SchduleNavigation: React.FC<SchduleNavigationProps> = ({
  prevWeek,
  nextWeek,
  dayDates,
}) => {
  return (
    <div className="flex justify-between mb-4">
      <Button
        disableRipple
        variant="faded"
        className="bg-transparent border-none"
        onPress={prevWeek}
      >
        ← Previous Week
      </Button>
      <div className="font-bold">
        Week of {dayDates["monday"].format("MMMM D, YYYY")}
      </div>
      <Button
        disableRipple
        variant="faded"
        className="bg-transparent border-none"
        onPress={nextWeek}
      >
        Next Week →
      </Button>
    </div>
  );
};

export default SchduleNavigation;
