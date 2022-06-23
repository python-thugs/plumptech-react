import {useMemo} from "react";
import T from "@mui/material/Typography";
import {useQuery} from "react-query";
// list
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
// date formatting
import ru from "date-fns/locale/ru";
import DateFnsAdapter from "@date-io/date-fns";
// custom imports
import {getMaintenances} from "../../../../api/maintenance";

const adapter = new DateFnsAdapter({locale: ru});

const TasksPage = () => {
  //#region queries
  const maintenancesQuery = useQuery("maintenances", () =>
    getMaintenances({withJobs: true})
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
  }, [maintenancesQuery.data]);

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
    </main>
  );
};

export default TasksPage;
