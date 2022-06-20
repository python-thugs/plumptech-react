import Paper from "@mui/material/Paper";
import T from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {useMemo} from "react";
// icons
import CogIcon from "@mui/icons-material/Settings";
import TimerIcon from "@mui/icons-material/Timer";
// custom imports
import {adapter} from "./MonthView";

interface IProps {
  date: Date;
}

const InformationView: React.FC<IProps> = ({date}) => {
  const dateDisplay = useMemo(
    () => (
      <div className="flex flex-col text-center py-5 bg-indigo-700 text-white">
        <T component="h4" variant="h4" className="uppercase">
          {adapter.format(date, "month")}
        </T>
        <T component="h1" variant="h1" className="font-semibold">
          {adapter.format(date, "dayOfMonth")}
        </T>
        <T component="h5" variant="h5" className="font-light">
          {adapter.format(date, "year")}
        </T>
      </div>
    ),
    [date]
  );
  return (
    <Paper elevation={1} className="min-w-[300px]">
      {dateDisplay}
      <List className="py-3">
        <ListItem className="justify-between">
          <T variant="body1" className="font-medium">
            Запланированные ТО
          </T>
          <ListItemIcon className="min-w-fit">
            <CogIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <T variant="body1">Нет запланированных задач</T>
        </ListItem>
      </List>
      <List className="py-3">
        <ListItem className="justify-between">
          <T variant="body1" className="font-medium">
            Срок выполнения ТО
          </T>
          <ListItemIcon className="min-w-fit">
            <TimerIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <T variant="body1">Нет запланированных задач</T>
        </ListItem>
      </List>
    </Paper>
  );
};

export default InformationView;
