import {useCallback, useState} from "react";
import {useQuery} from "react-query";
import T from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// date pickers
import {ru} from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
// list
import List from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
// custom imports
import {getMaintenances} from "../../../../api/maintenance";
import {MaintenanceWithId} from "../../../../api/types";

const ListItem: React.FC<React.ComponentProps<typeof MuiListItemButton>> = ({
  className,
  ...props
}) => (
  <MuiListItemButton
    className={`px-4 py-3 rounded ${className || ""}`}
    {...props}
  ></MuiListItemButton>
);

const TODAY = new Date();

const ReportsPage = () => {
  //#region State

  const [from, setFrom] = useState<Date | null>(TODAY);
  const [to, setTo] = useState<Date | null>(null);
  const [selectedMaintenance, selectMaintenance] =
    useState<MaintenanceWithId>();

  //#endregion

  //#region Queries

  const maintenancesQuery = useQuery("maintenances", getMaintenances);

  //#endregion

  //#region Handlers

  const handleFromDateChange = useCallback((d: Date | null) => setFrom(d), []);
  const handleToDateChange = useCallback((d: Date | null) => setTo(d), []);

  const createHandleMaintenanceClick = useCallback(
    (m: MaintenanceWithId) => () => {
      if (m.id === selectedMaintenance?.id) selectMaintenance(undefined);
      else selectMaintenance(m);
    },
    [selectedMaintenance]
  );

  //#endregion

  return (
    <main className="h-full w-full flex flex-row">
      <div className="flex flex-col flex-[2] gap-6 pt-6">
        <T variant="h4" component="h4" className="px-8">
          Отчетный период
        </T>
        <div className="flex flex-row gap-2 items-center pt-2 px-5">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DesktopDatePicker
              label="Начальная дата"
              value={from}
              maxDate={TODAY}
              onChange={handleFromDateChange}
              renderInput={props => <TextField {...props} />}
            />
            <span> — </span>
            <DesktopDatePicker
              label="Конечная дата"
              value={to}
              maxDate={TODAY}
              minDate={from || TODAY}
              onChange={handleToDateChange}
              renderInput={props => <TextField {...props} />}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-col gap-6 pt-4">
          <T variant="h4" component="h4" className="px-8">
            Информация
          </T>
          <p className="flex flex-row gap-6 items-baseline m-0 px-8">
            <T variant="body1" className="font-medium">
              Количество завершенных ТО:
            </T>
            <T variant="body1">2</T>
          </p>
          <List className="gap-1 px-4">
            {maintenancesQuery.data?.map((j, i) => (
              <ListItem
                key={`maintenance-item-${i}`}
                selected={j.id === selectedMaintenance?.id}
                onClick={createHandleMaintenanceClick(j)}
              >
                {j.auto.manufacturer} {j.auto.model}
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className="flex flex-col flex-1 min-w-fit border-solid border-0 border-l border-gray-200">
        <T variant="h4" component="h4" className="uppercase">
          Итог
        </T>
      </div>
    </main>
  );
};

export default ReportsPage;
