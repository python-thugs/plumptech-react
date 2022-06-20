import {useReactToPrint} from "react-to-print";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// icons
import UserIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Lock";
// custom import
import ConfirmationDialog from "./ConfirmationDialog";
import {IEmployee} from "../api/types";
import style from "./UserInfoDialog.module.css";
import {useCallback, useRef, useState} from "react";

interface IProps extends Partial<IEmployee> {
  open: boolean;
  onClose: () => void;
}

const UserInfoDialog: React.FC<IProps> = ({open, onClose, ...user}) => {
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => dialogRef.current,
    documentTitle: user?.name,
    onBeforeGetContent: () => {
      setLoading(true);
    },
    onAfterPrint: () => {
      setLoading(false);
    },
    removeAfterPrint: true,
  });

  const displayConfirmation = useCallback(() => setConfirmClose(true), []);

  const handleClose = useCallback<
    React.ComponentProps<typeof ConfirmationDialog>["onClose"]
  >(
    confirm => {
      setConfirmClose(false);
      if (confirm) onClose();
    },
    [onClose]
  );

  return (
    <>
      <Dialog
        ref={dialogRef}
        open={open}
        onClose={displayConfirmation}
        classes={{
          paper: "pr-6",
        }}
      >
        <DialogTitle className="pl-16 pt-8">Информация для входа</DialogTitle>
        <DialogContent className="max-w-lg flex flex-col gap-6 text-justify pb-6">
          <div className="flex flex-col pl-10 gap-6">
            <p className="m-0 text-base">
              Для входа в систему введите указанные ниже данные. В целях
              безопасности, после первого входа в систему необходимо сменить
              временный пароль, сгенерированный системой.
            </p>
            <p className="m-0 flex flex-col gap-2">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs">{user?.post?.name}</span>
            </p>
          </div>
          <div className={style["user-info"]}>
            <UserIcon className="text-gray-400" />
            <span className="font-medium">Имя пользователя:</span>
            <span>{user.username}</span>
            <PasswordIcon className="text-gray-400" />
            <span className="font-medium">Пароль:</span>
            <span>{(user as any).password}</span>
          </div>
        </DialogContent>
        <DialogActions className="px-6 pb-6">
          <Button
            className="w-full ml-10"
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={handlePrint}
          >
            Распечатать
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        classes={{
          paper: "max-w-md",
        }}
        open={confirmClose}
        onClose={handleClose}
        text="Прежде чем закрыть окно убедитесь, что сохранили информацию для входа
          пользователя. Впоследствии ее невозможно будет просмотреть."
        confirmText="Закрыть"
        confirmType="inherit"
        confirmVariant="text"
        confirmClass="text-gray-500 hover:text-indigo-700"
        cancelVariant="contained"
      />
    </>
  );
};

export default UserInfoDialog;
