import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import T from "@mui/material/Typography";
// data grid
import {DataGrid, GridColDef} from "@mui/x-data-grid";
// date formatting
import ru from "date-fns/locale/ru";
import DateFnsAdapter from "@date-io/date-fns";
// custom imports
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import {getMaintenances} from "../../../../api/maintenance";
import {WithId, MaintenanceWithJobs} from "../../../../api/types";
import {addMechanic} from "../../../../api/maintenance/addMechanic";
import {useAppSelector} from "../../../../store";

const adapter = new DateFnsAdapter({locale: ru});

const columns: GridColDef[] = [
  {
    field: "name",
    flex: 1,
    minWidth: 250,
    cellClassName: "!px-6",
    headerClassName: "!px-6",
    headerName: "Обслуживаемая техника",
    editable: false,
    valueGetter: params =>
      `${params.row.auto.manufacturer} ${params.row.auto.model}`,
  },
  {
    field: "jobs_count",
    minWidth: 150,
    headerName: "Количество задач",
    editable: false,
    valueGetter: params => `${params.row.jobs?.length || 0}`,
  },
  {
    field: "deadline",
    minWidth: 150,
    headerName: "Срок выполнения",
    editable: false,
    valueFormatter: params => adapter.format(params.value, "fullDate"),
  },
];

const AvailableTasks = () => {
  const navigate = useNavigate();
  const userId = useAppSelector(state => state.auth.id);
  const maintenancesQuery = useQuery(
    "maintenances",
    () =>
      getMaintenances({withParam: ["jobs"], available: true}) as Promise<
        WithId<MaintenanceWithJobs>[]
      >
  );

  const [showDialog, setShowDialog] = useState(false);
  const [selectedMaintenance, selectMaintenance] =
    useState<WithId<MaintenanceWithJobs>>();

  const handleMaintenanceClick = useCallback(
    ({row}: {row: WithId<MaintenanceWithJobs>}) => {
      setShowDialog(true);
      selectMaintenance(row);
    },
    []
  );

  const handleDialogClose = useCallback<
    React.ComponentProps<typeof ConfirmationDialog>["onClose"]
  >(
    success => {
      if (!success || !selectedMaintenance || !userId) {
        setShowDialog(false);
        return;
      }
      addMechanic({maintenanceId: selectedMaintenance.id, mechanicId: userId})
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          setShowDialog(false);
        });
    },
    [selectedMaintenance, userId, navigate]
  );

  return (
    <main className="h-full w-full flex flex-col py-6">
      <T variant="h4" component="h4" className="px-6">
        Запланированные обслуживания техники
      </T>
      <DataGrid
        disableColumnMenu
        hideFooter
        disableSelectionOnClick
        className="border-0"
        rows={maintenancesQuery.data || []}
        columns={columns}
        loading={maintenancesQuery.isLoading}
        onRowClick={handleMaintenanceClick}
      />
      <ConfirmationDialog
        open={showDialog}
        onClose={handleDialogClose}
        text={`Вы действительно хотите взяться за выполнение обслуживания ${selectedMaintenance?.auto.manufacturer} ${selectedMaintenance?.auto.model}?`}
        confirmText="Да"
        cancelText="Нет"
      />
    </main>
  );
};

export default AvailableTasks;
