import {useCallback, useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import T from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FAB from "@mui/material/Fab";
// icons
import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";
import PlusIcon from "@mui/icons-material/Add";
// custom imports
import MonthView, {adapter} from "./MonthView";
import InformationView from "./InformationView";
import {getMaintenances} from "../../../../api/maintenance";

const CalendarPlanning = () => {
  const [currentMonth, setMonth] = useState(new Date());
  const [selectedDate, setDate] = useState(new Date());
  // react-query
  const client = useQueryClient();
  const maintenances = useQuery("maintenances", getMaintenances);

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
    <div className="flex flex-row flex-1 w-full">
      <div className="flex flex-col py-4 gap-4 bg-gray-100 h-full flex-1 relative">
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
          maintenances={maintenances.data}
        />
        <FAB className="absolute right-4 bottom-8" color="primary">
          <PlusIcon />
        </FAB>
      </div>
      <InformationView
        date={currentMonth}
        maintenances={maintenances.data || []}
      />
    </div>
  );
};

export default CalendarPlanning;
