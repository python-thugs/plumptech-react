import DrawerAction from "../../components/DrawerAction";
// icons
import MaintenanceIcon from "@mui/icons-material/Handyman";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const Navigation = () => {
  return [
    <DrawerAction
      key="sidebar-action-root"
      text="График прохождения ТО"
      icon={<MaintenanceIcon />}
      uri="/"
    />,
    <DrawerAction
      key="sidebar-action-automobiles"
      text="Парк автомобилей"
      icon={<DirectionsCarIcon />}
      uri="/automobiles"
    />,
    <DrawerAction
      key="sidebar-action-reports"
      text="Отчет о затратах"
      icon={<AssessmentIcon />}
      uri="/reports"
    />,
  ];
};
