import {useCallback, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import T from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FAB from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import Alert, {AlertColor} from "@mui/material/Alert";
// icons
import TrashIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// custom imports
import UserTable from "./UserTable";
import AddUserDialog from "./dialogs/AddUser";
import {getList} from "../../../../api/users";
import {IEmployee} from "../../../../api/types";

export interface IFeedbackMessage {
  type: AlertColor;
  action: string;
  message: string;
}

export type FeedbackHandler = (message: IFeedbackMessage) => void;

const UsersPage = () => {
  const [feedback, setFeedback] = useState<IFeedbackMessage>();

  const queryClient = useQueryClient();
  const users = useQuery("users", () => getList());

  const [showAddDialog, setShowAddDialog] = useState(false);
  const handleAddDialogToggle = useCallback(() => {
    setShowAddDialog(!showAddDialog);
  }, [showAddDialog]);

  const handleAddDialogClose = useCallback<(user?: IEmployee) => void>(
    newUser => {
      setShowAddDialog(false);
      if (newUser) {
        queryClient.invalidateQueries("users");
        setFeedback({
          type: "success",
          action: "add-user",
          message: `Пользователь ${newUser.name} успешно добавлен`,
        });
      }
    },
    [queryClient]
  );

  const handleFeedbackChange = useCallback<FeedbackHandler>(setFeedback, [
    setFeedback,
  ]);

  const handleSnackbarClose = useCallback(() => setFeedback(undefined), []);

  return (
    <div className="flex flex-col py-12 gap-3">
      <div className="flex flex-row items-baseline justify-between pl-[calc(4rem+18px)] pr-5">
        <T
          variant="h2"
          component="h2"
          className="text-[2rem] leading-normal font-medium"
        >
          Пользователи системы
        </T>
        <Button
          startIcon={<TrashIcon />}
          color="inherit"
          className="text-gray-500"
        >
          Удалить выбранное
        </Button>
      </div>
      <UserTable users={users.data} onFeedback={handleFeedbackChange} />
      <FAB
        variant="circular"
        aria-label="add"
        className="fixed right-5 bottom-12"
        color="primary"
        onClick={handleAddDialogToggle}
      >
        <AddIcon />
      </FAB>
      <AddUserDialog isOpen={showAddDialog} onClose={handleAddDialogClose} />
      <Snackbar
        open={!!feedback}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={feedback?.type}>{feedback?.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default UsersPage;
