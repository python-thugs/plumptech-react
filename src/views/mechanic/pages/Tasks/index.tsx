import {useCallback, useMemo, useState} from "react";
import T from "@mui/material/Typography";
import {useQuery} from "react-query";
// list
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
// date formatting
import ru from "date-fns/locale/ru";
import DateFnsAdapter from "@date-io/date-fns";
// custom imports
import {getMaintenances} from "../../../../api/maintenance";
import {WithId, MaintenanceWithJobs} from "../../../../api/types";
import Checkbox from "@mui/material/Checkbox";
import {useAppSelector} from "../../../../store";

const adapter = new DateFnsAdapter({locale: ru});

const TasksPage = () => {
  //#region state
  const [selectedMaintenance, selectMaintenance] =
    useState<WithId<MaintenanceWithJobs>>();

  const userId = useAppSelector(state => state.auth.id);
  //#endregion

  //#region queries
  const maintenancesQuery = useQuery(
    "maintenances",
    () =>
      getMaintenances({
        withParam: ["jobs", "mechanic"],
        mechanic: userId,
      }) as Promise<WithId<MaintenanceWithJobs>[]>
  );
  //#endregion

  //#region callbacks
  const createHandleMaintenanceClick = useCallback(
    (m: WithId<MaintenanceWithJobs>) => () => selectMaintenance(m),
    []
  );
  //#endregion

  //#region memo
  const tasks = useMemo(() => {
    if (!maintenancesQuery.data) return [];
    return ([] as JSX.Element[]).concat(
      ...maintenancesQuery.data.map(m => [
        <ListItemButton
          key={`maintenance-item-${m.id}`}
          className="p-3 rounded"
          selected={selectedMaintenance?.id === m.id}
          onClick={createHandleMaintenanceClick(m)}
        >
          <div className="flex flex-col gap-4 w-full">
            <T variant="subtitle1" component="h6" className="font-medium">
              Обслуживание {m.auto.licensePlate}
            </T>
            <div className="flex flex-col gap-2">
              <p className="m-0  flex flex-row flex-1 justify-between gap-4 items-baseline">
                <T variant="body2" component="span" className="font-medium">
                  Дата начала:
                </T>
                <T variant="body2" component="span">
                  {adapter.format(m.start, "fullDate")}
                </T>
              </p>
              <p className="m-0 flex flex-row justify-between flex-1 gap-4 items-baseline">
                <T variant="body2" component="span" className="font-medium">
                  Дата завершения:
                </T>
                <T variant="body2" component="span">
                  {adapter.format(m.deadline, "fullDate")}
                </T>
              </p>
            </div>
          </div>
        </ListItemButton>,
        <Divider key={`maintenance-divider-${m.id}`} className="mx-6" />,
      ])
    );
  }, [maintenancesQuery.data, selectedMaintenance]);
  //#endregion

  return (
    <main className="flex flex-row h-full w-full">
      <div className="flex flex-col gap-3 border-0 border-solid border-r border-gray-200 h-full overflow-y-hidden">
        <T variant="h4" component="h4" className="px-6 mt-6">
          Активные задачи
        </T>
        <List className="flex flex-col gap-2 px-3 overflow-y-auto">
          {tasks}
        </List>
      </div>
      {selectedMaintenance && (
        <>
          <div className="flex flex-col flex-1 py-6">
            <T variant="h4" component="h4" className="px-14">
              Список работ
            </T>
            <List className="mt-5 px-4">
              {selectedMaintenance.jobs?.map(j => (
                <ListItem
                  key={`job-item-${j.id}`}
                  disablePadding
                  className="py-1"
                >
                  <Checkbox />
                  <T variant="body1">{j.name}</T>
                </ListItem>
              ))}
            </List>
          </div>
          <div className="flex flex-col gap-4 p-6 border-0 border-solid border-l border-gray-200">
            <T variant="h4" component="h4">
              {`${selectedMaintenance.auto.manufacturer} ${selectedMaintenance.auto.model}`}
            </T>
            <p className="flex flex-col m-0 gap-2">
              <T variant="h6" component="span">
                Государственный номер
              </T>
              <T variant="body1" component="span">
                {selectedMaintenance.auto.licensePlate}
              </T>
            </p>
            <p className="flex flex-col m-0 gap-2">
              <T variant="h6" component="span">
                Гаражный номер
              </T>
              <T variant="body1" component="span">
                {selectedMaintenance.auto.garagePlate}
              </T>
            </p>
          </div>
        </>
      )}
    </main>
  );
};

export default TasksPage;
