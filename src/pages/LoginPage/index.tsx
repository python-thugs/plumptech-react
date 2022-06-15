import {useCallback, useState} from "react";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ReactComponent as BG} from "./background.svg";
import "./styles.css";
import {login} from "../../api/auth";
import {useAppDispatch} from "../../store";
import {setUserAction} from "../../store/auth";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginClick = useCallback<React.FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      if (!userName || !password) return;
      login({username: userName, password})
        .then(result => {
          dispatch(setUserAction(result));
          navigate("/", {replace: true});
        })
        .catch(e => {
          console.error("login error:", e);
        });
    },
    [userName, password, dispatch]
  );

  const onUserNameChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(({target}) => setUserName(target?.value), []);

  const onPasswordChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(({target}) => setPassword(target?.value), []);

  return (
    <div className="relative overflow-hidden h-full w-full">
      <BG />
      <Paper
        className="absolute left-16 top-0 bottom-0 my-auto rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] w-max h-max px-12 py-12"
        elevation={3}
      >
        <form
          action=""
          className="w-full flex flex-col gap-8"
          onSubmit={handleLoginClick}
        >
          <Text
            variant="h3"
            component="h1"
            className="font-semibold leading-normal uppercase"
          >
            Вход в систему
          </Text>
          <TextField
            aria-label="Имя пользователя"
            label="Имя пользователя"
            name="username"
            id="username"
            autoComplete="nickname"
            onChange={onUserNameChange}
            value={userName}
          />
          <TextField
            aria-label="Пароль"
            label="Пароль"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
            value={password}
          />
          <Button
            variant="contained"
            type="submit"
            className="text-base font-medium py-3"
            size="large"
            disableElevation
          >
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
