import {useMemo} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import T from "@mui/material/Typography";
// icons
import CogIcon from "@mui/icons-material/Settings";
import TimerIcon from "@mui/icons-material/Timer";
// custom imports
import {Day} from "./MonthView";

interface IProps {
  day: Day;
}

const DayView: React.FC<IProps> = ({day}) => {
  const {value, current} = day;
  const cardClassName = useMemo(
    () => (current ? "text-black" : "bg-gray-50 text-gray-400"),
    [current]
  );

  return (
    <Card className={`flex-1 ${cardClassName}`} elevation={current ? 1 : 0}>
      <CardContent className="flex flex-col gap-2 !px-4 !pt-3 !pb-4 ">
        <T variant="body1" component="p" className="text-right">
          {value.getDate()}
        </T>
        <T
          variant="body2"
          component="p"
          className={`flex flex-row items-center gap-2 ${
            current ? "text-gray-600" : "text-inherit"
          }`}
        >
          <CogIcon fontSize="small" />2
        </T>
        <T
          variant="body2"
          component="p"
          className={`flex flex-row items-center gap-2 ${
            current ? "text-gray-600" : "text-inherit"
          }`}
        >
          <TimerIcon fontSize="small" />2
        </T>
      </CardContent>
    </Card>
  );
};

export default DayView;
