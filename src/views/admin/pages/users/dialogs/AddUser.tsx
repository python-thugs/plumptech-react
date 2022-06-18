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
import {IEmployee} from "../../../../../api/types";

interface IProps {
  isOpen: boolean;
  onClose: (user?: IEmployee) => void;
}

const AddUserDialog: React.FC<IProps> = ({isOpen, onClose}) => {
  const [postElements, setPostElements] = useState<JSX.Element[]>([]);
  const [personName, setPersonName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [selectedPost, setPost] = useState<number>(0);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    getPosts().then(posts => {
      setPost(posts[0].id);
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

  const handleCreateClick = useCallback(() => {
    let newErrors = [];
    if (!personName) newErrors.push("name");
    if (!userName) newErrors.push("username");
    if (!selectedPost) newErrors.push("post");
    if (newErrors.length !== 0) {
      setError([...error, ...newErrors]);
      return;
    }
    // @ts-ignore
    signUp({name: personName, username: userName, post: selectedPost})
      .then(newUser => {
        onClose(newUser);
      })
      .catch(() => {
        setError([...error, "exists"]);
      });
  }, [onClose, personName, userName, selectedPost, error]);

  const handleDialogClose = useCallback(() => onClose(), [onClose]);

  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogTitle>Добавление пользователя</DialogTitle>
      <DialogContent dividers className="flex flex-col gap-6 p-6">
        <TextField
          required
          label="ФИО сотрудника"
          name="name"
          error={error.includes("name") && !personName}
          onChange={handleInputChange}
          value={personName}
        />
        <TextField
          required
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
          onClick={handleDialogClose}
        >
          Отмена
        </Button>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleCreateClick}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
