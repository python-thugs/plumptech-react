import {useCallback, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
// icons
import MenuClosedIcon from "@mui/icons-material/Menu";
import MenuOpenedIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./SideBar.module.css";
import {useAppDispatch} from "../store";
import {setUserAction} from "../store/auth";

const DrawerAction: React.FC<{
  open: boolean;
  text: string;
  icon: JSX.Element;
  onClick: React.ComponentProps<typeof ListItem>["onClick"];
}> = ({open, text, icon, onClick}) => (
  <ListItem disablePadding onClick={onClick}>
    <ListItemButton className={`gap-2 ${open ? "pl-2 pr-6" : "px-2 "}`}>
      <ListItemIcon className="min-w-0">{icon}</ListItemIcon>
      <ListItemText
        sx={{opacity: open ? 1 : 0, whiteSpace: "nowrap"}}
        primary={text}
      />
    </ListItemButton>
  </ListItem>
);

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleMenuOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleLogoutClick = useCallback(() => {
    dispatch(setUserAction(undefined));
  }, []);

  return (
    <Drawer
      classes={{
        root: "w-16",
        paper: `overflow-x-hidden ${
          open ? "w-[320px]" : "w-16"
        } transition-all pt-2 gap-2`,
      }}
      variant="permanent"
      open={open}
    >
      <IconButton
        className={`max-w-fit p-3 ${open ? "self-end" : "self-center"}`}
        onClick={handleMenuOpen}
      >
        {open ? <MenuOpenedIcon /> : <MenuClosedIcon />}
      </IconButton>
      <Divider className="mx-3" />
      <div className="flex flex-col flex-1 items-center">
        {open ? "open" : "close"}
      </div>
      <Divider className="mx-3" />
      <DrawerAction
        open={open}
        icon={<LogoutIcon className={styles["icon"]} />}
        text="Выйти"
        onClick={handleLogoutClick}
      />
    </Drawer>
  );
};

export default Sidebar;
