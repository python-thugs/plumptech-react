import {useEffect, useMemo, useState} from "react";
import Adapter from "@date-io/date-fns";
import {ru} from "date-fns/locale";
import DayView from "./DayView";
import {IMaintenance} from "../../../../api/types";

export const adapter = new Adapter({locale: ru});

export type Day = {
  value: Date;
  current: boolean;
};

/**
 * Function that returns normalized array of days for current month
 *
 * @param {Date} date - date that will be used for getting month
 * @returns array of days
 */
function getDaysInMonth(date: Date): Day[] {
  let firstDay = adapter.startOfMonth(date);
  let lastDay = adapter.endOfMonth(date);
  let days: Day[] = [{value: firstDay, current: true}];
  let d = firstDay;
  while (!adapter.isSameDay(d, lastDay)) {
    d = adapter.addDays(d, 1);
    days.push({value: d, current: true});
  }

  const weekDayFiller = [0, 1, 2, 3, 4, 5, 6];
  const startFill = weekDayFiller
    .slice(0, days[0].value.getDay())
    .map(i => ({value: adapter.addDays(firstDay, -(i + 1)), current: false}))
    .reverse();
  const endFill = weekDayFiller
    .slice(days[days.length - 1].value.getDay() + 1)
    .map((_, i) => ({value: adapter.addDays(lastDay, i + 1), current: false}));

  return [...startFill, ...days, ...endFill];
}

interface IProps {
  active: Date;
  month: Date;
  onDateChange: (date: Date) => void;
  maintenances?: IMaintenance[];
}

const MonthView: React.FC<IProps> = ({
  active,
  maintenances,
  month,
  onDateChange,
}) => {
  const [daysOfMonth, setDaysOfMonth] = useState(getDaysInMonth(month));
  const dayElements = useMemo(() => {
    let result = [];
    for (let i = 0; i < daysOfMonth.length; i += 7) {
      result.push(
        daysOfMonth.slice(i, i + 7).map(day => {
          const plannedMaintenances = maintenances?.filter(({start}) =>
            adapter.isSameDay(start, day.value)
          ).length;
          const deadlineMaintenances = maintenances?.filter(({deadline}) =>
            adapter.isSameDay(deadline, day.value)
          ).length;
          return (
            <DayView
              key={day.value.getTime()}
              active={adapter.isSameDay(day.value, active)}
              day={day}
              onClick={onDateChange}
              plannedMaintenances={plannedMaintenances}
              deadlineMaintenances={deadlineMaintenances}
            />
          );
        })
      );
    }
    return result;
  }, [active, daysOfMonth, maintenances, onDateChange]);

  useEffect(() => {
    setDaysOfMonth(getDaysInMonth(month));
  }, [month]);

  return (
    <div className="flex flex-col gap-3 px-4">
      {dayElements.map((row, i) => (
        <div key={`calendar-row-${i}`} className="flex flex-row gap-3">
          {row}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
