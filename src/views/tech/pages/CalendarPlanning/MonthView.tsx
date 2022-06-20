import {useMemo} from "react";
import Adapter from "@date-io/date-fns";
import {ru} from "date-fns/locale";

let adapter = new Adapter({locale: ru});

/**
 * Function that returns normalized array of days for current month
 *
 * @param {Date} date - date that will be used for getting month
 * @returns {Date[]} array of days
 */
function getDaysInMonth(date: Date) {
  let firstDay = adapter.startOfMonth(date);
  let lastDay = adapter.endOfMonth(date);
  let days = [firstDay];
  let d = firstDay;
  while (!adapter.isSameDay(d, lastDay)) {
    d = adapter.addDays(d, 1);
    days.push(d);
  }

  const weekDayFiller = [0, 1, 2, 3, 4, 5, 6];
  const startFill = weekDayFiller
    .slice(0, days[0].getDay())
    .map(i => adapter.addDays(firstDay, -(i + 1)))
    .reverse();
  const endFill = weekDayFiller
    .slice(days[days.length - 1].getDay() + 1)
    .map((_, i) => adapter.addDays(lastDay, i + 1));

  return [...startFill, ...days, ...endFill];
}
