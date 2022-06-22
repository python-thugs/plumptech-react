import DrawerAction from "../../components/DrawerAction";
// icons
import MaintenanceIcon from "@mui/icons-material/Handyman";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const Navigation: React.FC<{open?: boolean}> = ({open}) => {
  return (
    <>
      <DrawerAction
        open={!!open}
        text="График прохождения ТО"
        icon={<MaintenanceIcon />}
        uri="/"
      />
      <DrawerAction
        open={!!open}
        text="Парк автомобилей"
        icon={<DirectionsCarIcon />}
        uri="/automobiles"
      />
      <DrawerAction
        open={!!open}
        text="Отчет о затратах"
        icon={<AssessmentIcon />}
        uri="/reports"
      />
    </>
  );
};
