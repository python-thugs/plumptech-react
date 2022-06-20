import {useCallback, useEffect, useState} from "react";
import T from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// icons
import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";
// custom imports
import MonthView, {adapter} from "./MonthView";
import InformationView from "./InformationView";

const CalendarPlanning = () => {
  const [currentMonth, setMonth] = useState(new Date());
  const [selectedDate, setDate] = useState(new Date());

  const selectPreviousMonth = useCallback(() => {
    setMonth(adapter.addMonths(currentMonth, -1));
  }, [currentMonth]);

  const selectNextMonth = useCallback(() => {
    setMonth(adapter.addMonths(currentMonth, 1));
  }, [currentMonth]);

  const handleDateSelect = useCallback<
    React.ComponentProps<typeof MonthView>["onDateChange"]
  >(date => setDate(date), []);

  useEffect(() => {
    setMonth(selectedDate);
  }, [selectedDate]);

  return (
    <div className="flex flex-row h-full w-full">
      <div className="flex flex-col py-12 gap-3 bg-gray-100 h-full flex-1">
        <div className="flex flex-row items-center justify-center gap-4">
          <IconButton onClick={selectPreviousMonth}>
            <LeftIcon />
          </IconButton>
          <T
            variant="h5"
            component="h5"
            className="uppercase leading-normal min-w-[200px] text-center"
          >
            {adapter.format(currentMonth, "monthAndYear")}
          </T>
          <IconButton onClick={selectNextMonth}>
            <RightIcon />
          </IconButton>
        </div>
        <MonthView
          active={selectedDate}
          month={currentMonth}
          onDateChange={handleDateSelect}
        />
      </div>
      <InformationView date={currentMonth} />
    </div>
  );
};

export default CalendarPlanning;
