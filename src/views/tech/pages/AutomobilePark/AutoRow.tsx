import {ru} from "date-fns/locale";
import DateFnsAdapter from "@date-io/date-fns";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import T from "@mui/material/Typography";
// custom imports
import {
  getMaintenances,
  ResponseNext,
  ResponseLast,
} from "../../../../api/auto/getMaintenances";
import styles from "./AutomobilePark.module.css";
import {useQuery} from "react-query";
import {IAuto, WithId} from "../../../../api/types";

interface IProps {
  onCheckboxClick: React.ComponentProps<typeof Checkbox>["onClick"];
}

const adapter = new DateFnsAdapter({locale: ru});

const AutoRow: React.FC<IProps & WithId<IAuto>> = ({
  onCheckboxClick,
  licensePlate,
  garagePlate,
  manufacturer,
  model,
  id,
}) => {
  const {data, isLoading} = useQuery(
    ["auto-maintenances", id],
    () =>
      getMaintenances(id, {next: true, last: true}) as Promise<
        ResponseNext & ResponseLast
      >
  );

  return (
    <TableRow className="text-base">
      <TableCell className="w-0 p-2">
        <Checkbox className="p-2" onClick={onCheckboxClick} />
      </TableCell>
      <TableCell className={styles["table-column"]}>
        <T variant="body1">
          {manufacturer} {model}
        </T>
      </TableCell>
      <TableCell className={styles["table-column"]}>
        <T variant="body1">{licensePlate}</T>
      </TableCell>
      <TableCell className={styles["table-column"]}>{garagePlate}</TableCell>
      <TableCell className={styles["table-column"]}>
        {data && adapter.format(data.last.end, "shortDate")}
      </TableCell>
      <TableCell className={styles["table-column"]}>
        {data && adapter.format(data.next.start, "shortDate")}
      </TableCell>
    </TableRow>
  );
};

export default AutoRow;
