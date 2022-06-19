import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
// icons
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import {useCallback, useState} from "react";
import {changeUser} from "../api/users";
import {IEmployee, WithPassword} from "../api/types";

interface IProps {
  id: number;
  open: boolean;
  onClose: (updatedUser?: WithPassword<IEmployee>) => void;
}

const PasswordResetDialog: React.FC<IProps> = ({id, open, onClose}) => {
  const [show, setShow] = useState({password: false, confirm: false});
  const [inputs, setInputs] = useState({password: "", confirm: ""});
  const [error, setError] = useState(false);

  const createShowChangeHandler = useCallback(
    (name: keyof typeof show) => () => {
      setShow({...show, [name]: !show[name]});
    },
    [show]
  );

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    ({target}) => {
      setInputs({...inputs, [target.name]: target.value});
    },
    [inputs]
  );

  const closeWithoutChanges = useCallback(() => onClose, [onClose]);

  const closeSavingChanges = useCallback(() => {
    const {password, confirm} = inputs;
    if (!password || !confirm || password !== confirm) {
      setError(true);
      return;
    }
    changeUser(id, {password})
      .then(user => {
        onClose({...user, password});
      })
      .catch(err => {
        console.error("Error on password reset:", err);
      });
  }, [id, inputs, onClose]);

  return (
    <Dialog open={open} onClose={closeWithoutChanges}>
      <DialogTitle>Сброс пароля</DialogTitle>
      <DialogContent className="flex flex-col gap-8">
        <TextField
          type="password"
          name="password"
          label="Новый пароль"
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={createShowChangeHandler("password")}
              >
                {show.password ? <HideIcon /> : <ShowIcon />}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="password"
          name="confirm"
          label="Подтверждение пароля"
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={createShowChangeHandler("confirm")}
              >
                {show.confirm ? <HideIcon /> : <ShowIcon />}
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className="w-full"
          onClick={closeSavingChanges}
        >
          Изменить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetDialog;
