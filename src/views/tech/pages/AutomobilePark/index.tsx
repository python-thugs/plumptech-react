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
// icons
import AddIcon from "@mui/icons-material/Add";
// custom styles
import AutoRow from "./AutoRow";
import AutoDialog from "./AutoDialog";
import {getAutomobiles} from "../../../../api/auto";
import styles from "./AutomobilePark.module.css";

const AutomobilePark = ({}) => {
  const {data} = useQuery("automobiles", getAutomobiles);
  const client = useQueryClient();

  const [dialog, setDialog] = useState(false);
  const handleAddClick = useCallback(() => {
    setDialog(true);
  }, []);
  const handleDialogClose = useCallback(() => {
    setDialog(false);
    client.invalidateQueries("automobiles");
  }, [client]);

  const [selected, setSelected] = useState<number[]>([]);
  const createHandleCheckboxChange = useCallback(
    (index: number): React.ComponentProps<typeof Checkbox>["onChange"] =>
      (_, checked) => {
        if (checked) {
          setSelected([...selected, index]);
        } else {
          setSelected(selected.filter(s => s !== index));
        }
      },
    [selected]
  );

  return (
    <div className="flex flex-col">
      <T variant="h4" component="h4" className="px-[4.25rem] py-8">
        Парк автомобилей
      </T>
      <Table className="table-auto">
        <TableHead>
          <TableRow className="text-base">
            <TableCell className="w-0 p-2">
              <Checkbox className="p-2" />
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
            data.map((auto, i) => (
              <AutoRow
                key={`auto-row-${auto.id}`}
                onCheckboxClick={createHandleCheckboxChange(i)}
                selected={selected.includes(i)}
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
      <AutoDialog open={dialog} onClose={handleDialogClose} />
    </div>
  );
};

export default AutomobilePark;
