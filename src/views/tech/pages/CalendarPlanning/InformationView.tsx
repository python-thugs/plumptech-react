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
import {IMaintenance} from "../../../../api/types";
import InformationViewItem from "./InformationViewItem";

interface IProps {
  date: Date;
  maintenances: IMaintenance[];
}

const InformationView: React.FC<IProps> = ({date, maintenances}) => {
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

  const [plannedMaintenancesList, deadlineMaintenancesList] = useMemo(() => {
    let planned = [],
      deadline = [];
    for (let i = 0; i < maintenances.length; ++i) {
      const maintenance = maintenances[i];
      if (adapter.isSameDay(maintenance.start, date)) {
        planned.push(<InformationViewItem {...maintenance} />);
      }
      if (adapter.isSameDay(maintenance.end, date)) {
        deadline.push(<InformationViewItem {...maintenance} />);
      }
    }
    return [planned, deadline];
  }, [date, maintenances]);

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
        {plannedMaintenancesList.length ? (
          plannedMaintenancesList
        ) : (
          <ListItem>
            <T variant="body1">Нет запланированных задач</T>
          </ListItem>
        )}
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
        {deadlineMaintenancesList.length ? (
          deadlineMaintenancesList
        ) : (
          <ListItem>
            <T variant="body1">Нет запланированных задач</T>
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default InformationView;
