import React, {useCallback, useMemo, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
// icons
import MenuClosedIcon from "@mui/icons-material/Menu";
import MenuOpenedIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";
// custom import
import DrawerAction from "./DrawerAction";
import {useAppDispatch} from "../store";
import {setUserAction} from "../store/auth";

const Sidebar: React.FC<React.PropsWithChildren> = ({children}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleMenuOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleLogoutClick = useCallback(() => {
    dispatch(setUserAction(undefined));
  }, []);

  const mainActions = useMemo(
    () =>
      React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {open});
      }),
    [children, open]
  );

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
      {mainActions}
      <div className="flex flex-col flex-1 items-center"></div>
      <Divider className="mx-3" />
      <DrawerAction
        open={open}
        icon={<LogoutIcon />}
        text="Выйти"
        onClick={handleLogoutClick}
      />
    </Drawer>
  );
};

export default Sidebar;
