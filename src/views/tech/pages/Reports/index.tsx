import {useCallback, useMemo, useState} from "react";
import {useQuery} from "react-query";
import T from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// date pickers
import Adapter from "@date-io/date-fns";
import {ru} from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
// list
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
// custom imports
import {getMaintenances, getJobs} from "../../../../api/maintenance";
import {
  MaintenanceWithId,
  MaintenanceWithJobs,
  IMaterial,
  WithId,
} from "../../../../api/types";
import Divider from "@mui/material/Divider";

const ListButtonItem: React.FC<
  React.ComponentProps<typeof MuiListItemButton>
> = ({className, ...props}) => (
  <MuiListItemButton
    className={`px-4 py-3 rounded ${className || ""}`}
    {...props}
  />
);

const ListItem: React.FC<React.ComponentProps<typeof MuiListItem>> = ({
  className,
  ...props
}) => (
  <MuiListItem className={`px-0 py-3 rounded ${className || ""}`} {...props} />
);

const adapter = new Adapter({locale: ru});

const TODAY = new Date();

const ReportsPage = () => {
  //#region State

  const [from, setFrom] = useState<Date | null>(TODAY);
  const [to, setTo] = useState<Date | null>(null);
  const [selectedMaintenance, selectMaintenance] =
    useState<MaintenanceWithId>();

  //#endregion

  //#region memo

  const selectedMaintenanceMaterials = useMemo(() => {
    if (!selectedMaintenance) return;
    return selectedMaintenance.jobs?.reduce<IMaterial[]>(
      (res, job) => (job.materials ? res.concat(job.materials) : res),
      []
    );
  }, [selectedMaintenance]);

  //#endregion

  //#region Queries

  const maintenancesQuery = useQuery(
    "maintenances",
    () => getMaintenances(true) as Promise<WithId<MaintenanceWithJobs>[]>
  );

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
            <T variant="body1">{maintenancesQuery.data?.length || 0}</T>
          </p>
          <List className="gap-1 px-4">
            {maintenancesQuery.data?.map((j, i) => (
              <ListButtonItem
                key={`maintenance-item-${i}`}
                selected={j.id === selectedMaintenance?.id}
                onClick={createHandleMaintenanceClick(j)}
              >
                {j.auto.manufacturer} {j.auto.model}
              </ListButtonItem>
            ))}
          </List>
        </div>
      </div>
      <div className="flex flex-col flex-1 min-w-fit border-solid border-0 border-l border-gray-200 p-6">
        <T variant="h4" component="h4" className="uppercase">
          Итог
        </T>
        {selectedMaintenance && selectedMaintenance.end && (
          <T variant="subtitle1" component="h6">
            {adapter.format(selectedMaintenance.start, "fullDate")}
            {" — "}
            {adapter.format(selectedMaintenance.end, "fullDate")}
          </T>
        )}
        <List>
          {selectedMaintenanceMaterials &&
            selectedMaintenanceMaterials?.map(m => (
              <ListItem className="gap-2">
                <span>{m.name}</span>
                <Divider className="flex-1 self-end mb-1 border-dotted" />
                <span>{m.price} ₽</span>
              </ListItem>
            ))}
        </List>
        <Divider variant="fullWidth" />
        <T
          variant="subtitle1"
          component="p"
          className="font-medium text-right mt-3 uppercase"
        >
          Сумма:{" "}
          {selectedMaintenanceMaterials?.reduce((sum, m) => sum + m.price, 0)} ₽
        </T>
      </div>
    </main>
  );
};

export default ReportsPage;
