import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// custom import
import {IMaintenance} from "../../../../api/types";
import {adapter} from "./MonthView";

interface IProps extends IMaintenance {}

const InformationViewItem: React.FC<IProps> = ({...maintenance}) => {
  return (
    <ListItem className="p-0">
      <ListItemButton className="flex flex-col gap-2 px-4 py-3 items-stretch">
        <p className="flex flex-row m-0 justify-between items-baseline font-medium">
          <span>
            {`${maintenance.auto.manufacturer} ${maintenance.auto.model}`}
          </span>
          <span className="text-xs">
            {maintenance.end ? "Завершено" : "Срок окончания"}
          </span>
        </p>
        <p className="flex flex-row m-0 justify-between items-baseline text-xs">
          <span>{maintenance.auto.licensePlate}</span>
          <span>
            {adapter.format(
              maintenance.end || maintenance.deadline,
              "fullDate"
            )}
          </span>
        </p>
      </ListItemButton>
    </ListItem>
  );
};
export default InformationViewItem;
