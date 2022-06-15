import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Text from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ReactComponent as BG} from "./background.svg";
import "./styles.css";

const LoginPage = () => {
  return (
    <div className="relative overflow-hidden h-full w-full">
      <BG />
      <Paper
        className="absolute left-16 top-0 bottom-0 my-auto rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] w-max h-max px-12 py-12"
        elevation={3}
      >
        <FormGroup className="w-full gap-8">
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
          />
          <TextField
            aria-label="Пароль"
            label="Пароль"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            variant="contained"
            className="text-base font-medium py-3"
            size="large"
            disableElevation
          >
            Войти
          </Button>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default LoginPage;
