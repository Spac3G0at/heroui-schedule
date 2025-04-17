import React from "react";

type TimezoneWarningProps = {
  coachTz: string;
  userTz: string;
};

const TimezoneWarning: React.FC<TimezoneWarningProps> = ({
  coachTz,
  userTz,
}) => {
  const isDifferentTz = userTz !== coachTz;

  if (!isDifferentTz) return null;

  return (
    <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4">
      ⚠️ The schedule is shown in the coach's timezone ({coachTz}). You are
      currently in {userTz}.
    </div>
  );
};

export default TimezoneWarning;
