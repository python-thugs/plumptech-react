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
        className="absolute left-12 top-0 bottom-0 my-auto rounded-lg rounded-bl-[3rem] rounded-tr-[3rem] w-max h-max px-8 py-12"
        elevation={3}
      >
        <FormGroup className="w-full gap-8">
          <Text
            variant="h3"
            component="h1"
            className="font-semibold leading-normal"
          >
            Вход в систему
          </Text>
          <TextField label="Имя пользователя" />
          <TextField label="Пароль" type="password" />
          <Button
            variant="contained"
            size="large"
            style={{fontSize: "1rem", fontWeight: 500}}
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
