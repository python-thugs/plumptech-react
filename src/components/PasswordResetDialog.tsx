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
      if (target.name === "confirm") {
        if (inputs.password !== target.value) setError(true);
        else setError(false);
      }
    },
    [inputs]
  );

  const closeWithoutChanges = useCallback(() => onClose(), [onClose]);

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
      <DialogTitle className="pt-5 pb-2">Сброс пароля</DialogTitle>
      <DialogContent className="!pt-3 min-w-[400px]">
        <form action="" className="flex flex-col gap-6">
          <TextField
            error={error && !inputs.password}
            type={show.password ? "text" : "password"}
            autoComplete="new-password"
            name="password"
            label="Новый пароль"
            onChange={handleInputChange}
            value={inputs.password}
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
            error={
              error && (!inputs.password || inputs.password !== inputs.confirm)
            }
            type={show.confirm ? "text" : "password"}
            autoComplete="new-password"
            name="confirm"
            label="Подтверждение пароля"
            helperText={
              inputs.password !== inputs.confirm && "Пароли должны совпадать!"
            }
            onChange={handleInputChange}
            value={inputs.confirm}
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
        </form>
      </DialogContent>
      <DialogActions className="px-6 pb-5">
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
