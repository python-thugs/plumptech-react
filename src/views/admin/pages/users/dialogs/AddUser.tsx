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
  const [selectedPost, setPost] = useState<number>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getPosts().then(posts => {
      setPostElements(
        posts.map(post => <MenuItem value={post.id}>{post.name}</MenuItem>)
      );
    });
  }, []);

  const handlePostSelect = useCallback(
    (e: SelectChangeEvent<number | null>) => {
      setPost(Number(e.target.value));
      setIsError(false);
    },
    []
  );

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(e => {
    if (e.target.name === "username") {
      setUserName(e.target.value);
      setIsError(false);
    }
    if (e.target.name === "name") {
      setPersonName(e.target.value);
      setIsError(false);
    }
  }, []);

  const handleCreateClick = useCallback(() => {
    if (!personName || !userName || !selectedPost) {
      setIsError(true);
      return;
    }
    signUp({name: personName, username: userName, post: selectedPost}).then(
      newUser => {
        onClose(newUser);
      }
    );
  }, [onClose, personName, userName, selectedPost]);

  const handleDialogClose = useCallback(() => onClose(), [onClose]);

  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogTitle>Добавление пользователя</DialogTitle>
      <DialogContent dividers className="flex flex-col gap-6 p-6">
        <TextField
          label="ФИО сотрудника"
          name="name"
          onChange={handleInputChange}
          value={personName}
        />
        <TextField
          label="Имя пользователя"
          name="username"
          onChange={handleInputChange}
          value={userName}
        />
        <FormControl variant="outlined">
          <InputLabel id="new-user-post-label">Занимаемая должность</InputLabel>
          <Select
            id="new-user-post"
            labelId="new-user-post-label"
            label="Занимаемая должность"
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
