import {useMemo} from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MuiAppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import T from "@mui/material/Typography";
import TodayIcon from "@mui/icons-material/Today";

const AppBar = () => {
  const today = useMemo(() => new Date(), []);
  const trigger = useScrollTrigger({disableHysteresis: true, threshold: 0});
  return (
    <MuiAppBar
      className="px-5 pb-2 pt-4"
      position="sticky"
      elevation={trigger ? 4 : 0}
    >
      <p className="flex flex-row gap-2 m-0 self-end items-center">
        <TodayIcon />
        <T variant="body1" component="span" className="font-medium">
          {today.toLocaleDateString()}
        </T>
      </p>
    </MuiAppBar>
  );
};

export default AppBar;
