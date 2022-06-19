import {useCallback, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {getPosts} from "../../../../../api/post";
import {signUp} from "../../../../../api/auth";
import {IEmployee, PostEnum} from "../../../../../api/types";
import {changeUser} from "../../../../../api/users";

export type DialogCloseHandler<T = any> = (value?: T) => void;
const UserDialogTypes = ["create", "edit", undefined] as const;
export type UserDialogType = typeof UserDialogTypes[number];
/**
 * Method for checking that `v` is of type `UserDialogType`
 *
 * @param {any} v - value to check
 */
export function isUserDialogType(v: any): v is UserDialogType {
  return UserDialogTypes.includes(v);
}

interface IProps {
  type: UserDialogType;
  user?: IEmployee;
  onClose: DialogCloseHandler<IEmployee>;
}

const EmptyMenuItem = <MenuItem key="menu-item-0" value={0}></MenuItem>;

const UserDialog: React.FC<IProps> = ({type, user, onClose}) => {
  console.debug("> UserDialog render %d", Date.now());
  const [postElements, setPostElements] = useState<JSX.Element[]>([
    EmptyMenuItem,
  ]);
  const [personName, setPersonName] = useState<string>(user ? user.name : "");
  const [userName, setUserName] = useState<string>(user ? user.username : "");
  const [selectedPost, setPost] = useState<PostEnum | null>(
    user ? user.post.id : 0
  );
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setPersonName(user.name);
      setUserName(user.username);
      setPost(user.post.id);
    }
  }, [user]);

  useEffect(() => {
    getPosts().then(posts => {
      if (!selectedPost) setPost(posts[0].id);
      setPostElements(
        posts.map(post => (
          <MenuItem key={`post-select-item-${post.id}`} value={post.id}>
            {post.name}
          </MenuItem>
        ))
      );
    });
  }, []);

  const handlePostSelect = useCallback(
    (e: SelectChangeEvent<number | null>) => {
      setPost(Number(e.target.value));
      setError(error.filter(i => i !== e.target.name));
    },
    [error]
  );

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    e => {
      if (e.target.name === "username") {
        setUserName(e.target.value);
      }
      if (e.target.name === "name") {
        setPersonName(e.target.value);
      }
      setError(error.filter(i => i !== e.target.name));
    },
    [error]
  );

  const handleSaveChanges = useCallback(() => {
    let newErrors = [];
    if (!personName) newErrors.push("name");
    if (!userName) newErrors.push("username");
    if (!selectedPost) newErrors.push("post");
    if (newErrors.length !== 0) {
      setError([...error, ...newErrors]);
      return;
    }
    if (type === "create") {
      signUp({name: personName, username: userName, post: selectedPost!})
        .then(newUser => onClose(newUser))
        .catch(() => setError([...error, "exists"]));
    } else if (type === "edit" && user) {
      changeUser(user.id, {
        name: personName,
        username: userName,
        post: selectedPost!,
      })
        .then(newUser => onClose(newUser))
        .catch(() => setError([...error, "exists"]));
    }
  }, [onClose, personName, userName, selectedPost, error]);

  const handleCancelChanges = useCallback(() => onClose(), [onClose]);

  return (
    <Dialog open={!!type} onClose={handleCancelChanges}>
      <DialogTitle>
        {type === "create" ? "Добавление" : "Редактирование"} пользователя
      </DialogTitle>
      <DialogContent dividers className="flex flex-col gap-6 p-6">
        <TextField
          required
          autoComplete="name"
          label="ФИО сотрудника"
          name="name"
          error={error.includes("name") && !personName}
          onChange={handleInputChange}
          value={personName}
        />
        <TextField
          required
          autoComplete="nickname"
          label="Имя пользователя"
          name="username"
          error={
            (error.includes("username") && !userName) ||
            error.includes("exists")
          }
          helperText={
            error.includes("exists") &&
            "Пользователь с таким именем уже существует"
          }
          onChange={handleInputChange}
          value={userName}
        />
        <FormControl variant="outlined">
          <InputLabel id="new-user-post-label">Занимаемая должность</InputLabel>
          <Select
            required
            id="new-user-post"
            labelId="new-user-post-label"
            label="Занимаемая должность"
            name="post"
            error={error.includes("post") && !selectedPost}
            value={selectedPost}
            onChange={handlePostSelect}
          >
            {postElements}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          className="text-gray-500 hover:text-rose-600 hover:bg-rose-50 px-4"
          onClick={handleCancelChanges}
        >
          Отмена
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSaveChanges}
        >
          {type === "create" ? "Добавить" : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
