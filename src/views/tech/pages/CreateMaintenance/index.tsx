import {useCallback, useMemo, useState} from "react";
import {useQuery} from "react-query";
import T from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
// list
import List from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
// form fields
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
// date pickers
import {ru} from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
// icons
import AddIcon from "@mui/icons-material/Add";
// custom imports
import MaterialsTable from "./MaterialsTable";
import {getAutomobiles} from "../../../../api/auto";
import {IAuto, JobWithMaterials, WithId} from "../../../../api/types";
import {useNavigate} from "react-router-dom";
import {createMaintenance} from "../../../../api/maintenance/create";

const ListItem: React.FC<React.ComponentProps<typeof MuiListItemButton>> = ({
  className,
  ...props
}) => (
  <MuiListItemButton
    className={`px-6 py-3 ${className || ""}`}
    {...props}
  ></MuiListItemButton>
);

const TODAY = new Date();

const CreateMaintenancePage = () => {
  const automobilesQuery = useQuery("automobiles", getAutomobiles);
  const navigate = useNavigate();

  const handleCancelClick = useCallback(
    () => navigate("/", {replace: true}),
    [navigate]
  );

  const autoItems = useMemo(() => {
    if (!automobilesQuery.data) return;
    return automobilesQuery.data.map(auto => (
      <MenuItem key={`auto-select-${auto.id}`} value={auto.id}>
        {auto.manufacturer} {auto.model} ({auto.licensePlate})
      </MenuItem>
    ));
  }, [automobilesQuery.data]);

  const [auto, setAuto] = useState<WithId<IAuto> | null>(null);
  const handleAutoChange = useCallback<
    NonNullable<React.ComponentProps<typeof Select>["onChange"]>
  >(
    e => {
      setAuto(
        automobilesQuery.data?.find(a => a.id === (e.target.value as number)) ||
          null
      );
    },
    [automobilesQuery.data]
  );

  //#region Jobs management
  const [jobs, setJobs] = useState<JobWithMaterials[]>([]);

  const [selectedJobIndex, selectJob] = useState<number>();

  const handleJobItemClick = useCallback(
    (jobIndex: number) => () => selectJob(jobIndex),
    []
  );

  const updateJob = useCallback(
    (property: keyof JobWithMaterials, value: any) => {
      if (selectedJobIndex == undefined) return;
      setJobs([
        ...jobs.slice(0, selectedJobIndex),
        {...jobs[selectedJobIndex], [property]: value},
        ...jobs.slice(selectedJobIndex + 1),
      ]);
    },
    [selectedJobIndex, jobs]
  );

  const handleJobInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    ({target}) => {
      updateJob(target.name as keyof JobWithMaterials, target.value);
    },
    [updateJob]
  );

  const handleJobAdd = useCallback(() => {
    setJobs([...jobs, {name: "Новая задача"}]);
    selectJob(jobs.length);
  }, [jobs]);

  //#endregion

  //#region Dates management
  const [startDate, setStartDate] = useState(new Date());
  const handleStartDateChange = useCallback((newDate: Date | null) => {
    if (!newDate || Number.isNaN(newDate.getDate())) return;
    setStartDate(newDate);
  }, []);

  const [endDate, setEndDate] = useState<Date>();
  const handleEndDateChange = useCallback((newDate: Date | null) => {
    if (!newDate || Number.isNaN(newDate.getDate())) return;
    setEndDate(newDate);
  }, []);
  //#endregion

  //#region Materials management
  const handleMaterialAdd = useCallback<
    React.ComponentProps<typeof MaterialsTable>["onMaterialAdd"]
  >(() => {
    if (selectedJobIndex == undefined) return;
    updateJob("materials", [
      ...(jobs[selectedJobIndex]?.materials || []),
      {name: "", code: "", price: 0},
    ]);
  }, [updateJob]);

  const handleMaterialChange = useCallback<
    React.ComponentProps<typeof MaterialsTable>["onMaterialChange"]
  >(
    (index, material) => {
      if (selectedJobIndex == undefined) return;
      const materials = jobs[selectedJobIndex].materials;
      if (!materials) return;
      updateJob("materials", [
        ...materials.slice(0, index),
        material,
        ...materials.slice(index + 1),
      ]);
    },
    [updateJob]
  );

  const handleMaterialDelete = useCallback<
    React.ComponentProps<typeof MaterialsTable>["onMaterialDelete"]
  >(
    index => {
      if (selectedJobIndex == undefined) return;
      const materials = jobs[selectedJobIndex].materials;
      if (!materials) return;
      updateJob("materials", [
        ...materials.slice(0, index),
        ...materials.slice(index + 1),
      ]);
    },
    [updateJob]
  );
  //#endregion

  const handleMaintenanceCreate = useCallback(() => {
    if (!auto || !endDate || !startDate || jobs.length === 0) return;
    createMaintenance({
      start: startDate,
      deadline: endDate,
      auto: auto.id,
      status: 1,
      jobs,
    })
      .then(() => {
        navigate("/", {replace: true});
      })
      .catch(err => {
        console.error("# Error during creation: ", err);
      });
  }, [startDate, endDate, auto, jobs, navigate]);

  return (
    <main className="flex flex-col flex-1 overflow-hidden">
      <T variant="h4" component="h4" className="px-9 py-6">
        Создание технического обслуживания
      </T>
      <div className="flex flex-col px-6 pb-6 gap-6 w-fit">
        <FormControl fullWidth>
          <InputLabel id="auto-select-label">Автомобиль</InputLabel>
          <Select
            id="auto-select"
            label="Автомобиль"
            labelId="auto-select-label"
            value={auto?.id}
            onChange={handleAutoChange}
          >
            {autoItems}
          </Select>
        </FormControl>
        <div className="flex flex-row gap-4 items-center">
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
            <DesktopDatePicker
              InputProps={{className: "max-w-xs"}}
              label="Дата начала обслуживания"
              minDate={TODAY}
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={props => <TextField {...props} />}
            />
          </LocalizationProvider>
          <span> — </span>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
            <DesktopDatePicker
              InputProps={{className: "max-w-xs"}}
              label="Планируемая дата завершения"
              minDate={startDate || TODAY}
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={props => <TextField {...props} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Divider />
      <div className="flex flex-row w-full flex-1 overflow-auto">
        <div className="flex flex-col h-full w-fit min-w-[480px] border-solid border-0 border-r border-gray-200">
          <div className="flex flex-row justify-between items-center pl-6 pr-3">
            <T variant="h6" component="h6" className="py-4">
              Список задач
            </T>
            <Button
              variant="text"
              color="primary"
              endIcon={<AddIcon />}
              className="h-fit py-2 px-2"
              onClick={handleJobAdd}
            >
              Добавить
            </Button>
          </div>
          <List className="gap-1">
            {jobs.map((j, i) => (
              <ListItem
                key={`job-item-${i}`}
                selected={i === selectedJobIndex}
                onClick={handleJobItemClick(i)}
              >
                {j.name}
              </ListItem>
            ))}
          </List>
        </div>
        {selectedJobIndex != undefined && (
          <div className="flex flex-col flex-1 px-6 py-4 gap-6 overflow-y-auto">
            <T variant="h6" component="h6" className="px-3">
              Основная информация
            </T>
            <div className="flex flex-col gap-6">
              <TextField
                label="Наименование работ"
                name="name"
                onChange={handleJobInputChange}
                value={jobs[selectedJobIndex].name}
              />
              <TextField
                multiline
                minRows={3}
                label="Описание работ"
                name="description"
                onChange={handleJobInputChange}
                value={jobs[selectedJobIndex].description}
              />
            </div>
            <T variant="h6" component="h6" className="px-3">
              Требуемые материалы
            </T>
            <MaterialsTable
              materials={jobs[selectedJobIndex].materials}
              onMaterialAdd={handleMaterialAdd}
              onMaterialChange={handleMaterialChange}
              onMaterialDelete={handleMaterialDelete}
            />
          </div>
        )}
      </div>
      <Toolbar className="border-0 border-t border-solid border-gray-200 gap-6 justify-end">
        <Button
          color="error"
          variant="text"
          className="text-gray-500 hover:text-rose-600 px-6"
          onClick={handleCancelClick}
        >
          Отмена
        </Button>
        <Button
          disableElevation
          color="primary"
          variant="contained"
          className="px-6"
          onClick={handleMaintenanceCreate}
        >
          Создать
        </Button>
      </Toolbar>
    </main>
  );
};

export default CreateMaintenancePage;
