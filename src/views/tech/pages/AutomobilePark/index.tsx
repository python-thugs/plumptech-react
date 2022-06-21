import {useQuery, useQueryClient} from "react-query";
import T from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
// custom styles
import AutoRow from "./AutoRow";
import {getAutomobiles} from "../../../../api/auto";
import styles from "./AutomobilePark.module.css";

const AutomobilePark = ({}) => {
  const {data} = useQuery("automobiles", getAutomobiles);
  const client = useQueryClient();

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
            data.map(auto => (
              <AutoRow
                key={`auto-row-${auto.id}`}
                onCheckboxClick={() => {}}
                {...auto}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AutomobilePark;
