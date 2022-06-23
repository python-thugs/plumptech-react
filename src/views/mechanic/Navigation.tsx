import DrawerAction from "../../components/DrawerAction";
// icons
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const Navigation = () => {
  return [
    <DrawerAction
      key="sidebar-action-root"
      text="Мои задачи"
      icon={<FormatListBulletedIcon />}
      uri="/"
    />,
    <DrawerAction
      key="sidebar-action-automobiles"
      text="Запланированные обслуживания"
      icon={<AssignmentIcon />}
      uri="/maintenances"
    />,
  ];
};
