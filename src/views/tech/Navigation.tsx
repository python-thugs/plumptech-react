import DrawerAction from "../../components/DrawerAction";
// icons
import MaintenanceIcon from "@mui/icons-material/Handyman";

export const Navigation: React.FC<{open?: boolean}> = ({open}) => {
  console.log("navigation open: ", open);
  return (
    <DrawerAction
      open={!!open}
      text="тес"
      icon={<MaintenanceIcon />}
      onClick={() => {}}
    />
  );
};
