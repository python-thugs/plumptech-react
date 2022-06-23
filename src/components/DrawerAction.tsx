import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const DrawerAction: React.FC<{
  open?: boolean;
  text: string;
  icon: JSX.Element;
  uri?: string;
  selected?: boolean;
  onClick?: () => void;
}> = ({open, text, icon, uri, selected, onClick}) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (uri) navigate(uri);
    if (onClick) onClick();
  }, [uri]);

  return (
    <ListItem disablePadding onClick={handleClick}>
      <ListItemButton
        className={`gap-2 ${open ? "pl-2 pr-6" : "px-2 "}`}
        selected={selected}
      >
        <ListItemIcon className="min-w-0 p-3">{icon}</ListItemIcon>
        <ListItemText
          sx={{
            opacity: open ? 1 : 0,
            whiteSpace: "nowrap",
            width: open ? "unset" : 0,
          }}
          primary={text}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerAction;
