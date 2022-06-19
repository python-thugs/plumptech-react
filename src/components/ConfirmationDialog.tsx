import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {useCallback} from "react";

interface IProps {
  classes: React.ComponentProps<typeof Dialog>["classes"];
  open: boolean;
  text: string;
  cancelText?: string;
  confirmText?: string;
  onClose: (confirmed: boolean) => void;
}

const ConfirmationDialog: React.FC<IProps> = ({
  classes,
  open,
  text,
  cancelText = "Отмена",
  confirmText = "Подтвердить",
  onClose,
}) => {
  const cancelClick = useCallback(() => onClose(false), [onClose]);
  const confirmClick = useCallback(() => onClose(true), [onClose]);

  return (
    <Dialog open={open} onClose={cancelClick} classes={classes}>
      <DialogTitle>Подтверждение</DialogTitle>
      <DialogContent>
        <p className="m-0 text-justify">{text}</p>
      </DialogContent>
      <DialogActions className="gap-4 px-5">
        <Button color="error" variant="contained" onClick={cancelClick}>
          {cancelText}
        </Button>
        <Button
          color="inherit"
          className="text-gray-500 hover:text-blue-600"
          variant="text"
          onClick={confirmClick}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
