import {useCallback, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import T from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
// icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
// custom styles
import AutoRow from "./AutoRow";
import AutoDialog from "./AutoDialog";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import {deleteAuto, getAutomobiles} from "../../../../api/auto";
import styles from "./AutomobilePark.module.css";
import {Alert} from "@mui/material";

const AutomobilePark = () => {
  const [feedback, setFeedback] = useState<
    | {type: React.ComponentProps<typeof Alert>["color"]; message: string}
    | undefined
  >();
  const {data} = useQuery("automobiles", getAutomobiles);
  const client = useQueryClient();

  const [dialog, setDialog] = useState<"add" | "confirm" | false>(false);
  const handleAddClick = useCallback(() => {
    setDialog("add");
  }, []);
  const handleDialogClose = useCallback(() => {
    setDialog(false);
    client.invalidateQueries("automobiles");
  }, [client]);

  const [selected, setSelected] = useState<number[]>([]);
  const createHandleCheckboxChange = useCallback(
    (id: number): React.ComponentProps<typeof Checkbox>["onChange"] =>
      (_, checked) => {
        if (checked) {
          setSelected([...selected, id]);
        } else {
          setSelected(selected.filter(s => s !== id));
        }
      },
    [selected]
  );
  const handleHeaderCheckboxChange = useCallback(
    (_: any, checked: boolean) => {
      if (checked) setSelected(data?.map(d => d.id) || []);
      else setSelected([]);
    },
    [data]
  );

  const handleConfirmClose = useCallback<
    React.ComponentProps<typeof ConfirmationDialog>["onClose"]
  >(
    confirm => {
      setDialog(false);
      if (!confirm) return;
      deleteAuto(selected).then(() => {
        setFeedback({type: "success", message: "Автомобили успешно удалены"});
        setSelected([]);
        client.invalidateQueries("automobiles");
      });
    },
    [selected, client]
  );

  const handleConfirmOpen = useCallback(() => setDialog("confirm"), []);
  const handleSnackbarClose = useCallback(() => setFeedback(undefined), []);

  return (
    <div className="flex flex-col">
      <T variant="h4" component="h4" className="px-[4.25rem] pt-8 pb-4">
        Парк автомобилей
      </T>
      <Toolbar variant="dense" className="pl-[3.75rem] pr-5">
        {selected.length > 0 && (
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={handleConfirmOpen}
          >
            Удалить выбранное
          </Button>
        )}
      </Toolbar>
      <Table className="table-auto">
        <TableHead>
          <TableRow className="text-base">
            <TableCell className="w-0 p-2">
              <Checkbox
                className="p-2"
                indeterminate={
                  selected.length > 0 && selected.length !== data?.length
                }
                checked={selected.length === data?.length}
                onChange={handleHeaderCheckboxChange}
              />
            </TableCell>
            <TableCell className={styles["table-column"]}>
              Наименование
            </TableCell>
            <TableCell className={styles["table-column"]}>
              Государственный номер
            </TableCell>
            <TableCell className={styles["table-column"]}>
              Гаражный номер
            </TableCell>
            <TableCell className={styles["table-column"]}>
              Дата проведения
              <br />
              очередного ТО
            </TableCell>
            <TableCell className={styles["table-column"]}>
              Дата прохождения
              <br />
              последнего ТО
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map(auto => (
              <AutoRow
                key={`auto-row-${auto.id}`}
                onCheckboxClick={createHandleCheckboxChange(auto.id)}
                selected={selected.includes(auto.id)}
                {...auto}
              />
            ))}
        </TableBody>
      </Table>
      <Fab
        className="fixed bottom-10 right-5"
        color="primary"
        onClick={handleAddClick}
      >
        <AddIcon />
      </Fab>
      <AutoDialog open={dialog === "add"} onClose={handleDialogClose} />
      <ConfirmationDialog
        open={dialog === "confirm"}
        onClose={handleConfirmClose}
        text="Вы действительно хотите удалить выбранные автомобили?"
        confirmVariant="text"
        confirmText="Удалить"
        confirmType="inherit"
        confirmClass="text-gray-500 hover:text-rose-600"
        cancelVariant="contained"
      />
      <Snackbar
        open={!!feedback}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert variant="standard" color={feedback?.type || "info"}>
          {feedback?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AutomobilePark;
