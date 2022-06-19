import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {useCallback} from "react";

interface IProps {
  classes?: React.ComponentProps<typeof Dialog>["classes"];
  open: boolean;
  text: string;
  onClose: (confirmed: boolean) => void;
  cancelText?: string;
  cancelClass?: string;
  cancelType?: React.ComponentProps<typeof Button>["color"];
  cancelVariant?: React.ComponentProps<typeof Button>["variant"];
  confirmText?: string;
  confirmClass?: string;
  confirmType?: React.ComponentProps<typeof Button>["color"];
  confirmVariant?: React.ComponentProps<typeof Button>["variant"];
}

const ConfirmationDialog: React.FC<IProps> = ({
  classes,
  open,
  text,
  cancelText = "Отмена",
  cancelClass = "",
  cancelType = "error",
  cancelVariant = "text",
  confirmText = "Подтвердить",
  confirmClass = "",
  confirmType = "primary",
  confirmVariant = "contained",
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
        <Button
          className={cancelClass}
          color={cancelType}
          variant={cancelVariant}
          onClick={cancelClick}
        >
          {cancelText}
        </Button>
        <Button
          className={confirmClass}
          color={confirmType}
          variant={confirmVariant}
          onClick={confirmClick}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
