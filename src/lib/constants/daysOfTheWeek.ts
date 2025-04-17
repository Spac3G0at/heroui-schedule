import moment from "moment";

const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
  moment()
    .isoWeekday(i + 1)
    .format("dddd")
    .toLocaleLowerCase()
);

export default daysOfWeek;
