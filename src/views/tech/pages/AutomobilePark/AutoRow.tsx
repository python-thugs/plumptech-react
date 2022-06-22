import {ru} from "date-fns/locale";
import DateFnsAdapter from "@date-io/date-fns";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import T from "@mui/material/Typography";
// custom imports
import {getMaintenances} from "../../../../api/auto/getMaintenances";
import styles from "./AutomobilePark.module.css";
import {useQuery} from "react-query";
import {IAuto, IMaintenance, WithId} from "../../../../api/types";

interface IProps {
  onCheckboxClick: React.ComponentProps<typeof Checkbox>["onChange"];
  selected: boolean;
}

const adapter = new DateFnsAdapter({locale: ru});

const AutoRow: React.FC<IProps & WithId<IAuto>> = ({
  selected,
  onCheckboxClick,
  licensePlate,
  garagePlate,
  manufacturer,
  model,
  id,
}) => {
  const {data} = useQuery(
    ["auto-maintenances", id],
    () =>
      // @ts-ignore
      getMaintenances(id, {next: true, last: true}) as {
        last?: IMaintenance;
        next?: IMaintenance;
      },
    {retry: false}
  );

  return (
    <TableRow className="text-base">
      <TableCell className="w-0 p-2">
        <Checkbox
          className="p-2"
          onChange={onCheckboxClick}
          checked={selected}
        />
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
        {data && data.next ? adapter.format(data.next.start, "fullDate") : "—"}
      </TableCell>
      <TableCell className={styles["table-column"]}>
        {data && data.last && data.last.end
          ? adapter.format(data.last.end, "fullDate")
          : "—"}
      </TableCell>
    </TableRow>
  );
};

export default AutoRow;
