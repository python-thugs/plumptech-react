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
import UserDialog, {
  UserDialogType,
  DialogCloseHandler,
} from "./dialogs/AddUser";
import UserInfoDialog from "../../../../components/UserInfoDialog";
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
  const [selectedUser, selectUser] = useState<IEmployee>();

  const queryClient = useQueryClient();
  const users = useQuery("users", () => getList());

  const refreshUserList = useCallback(
    () => queryClient.invalidateQueries("users"),
    [queryClient]
  );

  const [showAddDialog, setShowAddDialog] = useState<UserDialogType | "info">();

  const handleAddDialogClose = useCallback<DialogCloseHandler<IEmployee>>(
    newUser => {
      setShowAddDialog(undefined);
      selectUser(undefined);
      if (newUser) {
        refreshUserList();
        setFeedback({
          type: showAddDialog === "create" ? "success" : "info",
          action: showAddDialog === "create" ? "add-user" : "update-user",
          message:
            showAddDialog === "create"
              ? `Пользователь ${newUser.name} успешно добавлен`
              : `Информация о пользователе ${newUser.name} обновлена`,
        });
      }
    },
    [refreshUserList, showAddDialog]
  );

  const handleFeedbackChange = useCallback<FeedbackHandler>(
    message => {
      setFeedback(message);
      refreshUserList();
    },
    [setFeedback, refreshUserList]
  );

  const handleSnackbarClose = useCallback(() => setFeedback(undefined), []);
  const handleEditUserClick = useCallback<(u: IEmployee) => void>(user => {
    selectUser(user);
    setShowAddDialog("edit");
  }, []);

  const handleUserSelect = useCallback<(u: IEmployee) => void>(user => {
    selectUser(user);
    setShowAddDialog("info");
  }, []);

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
      <UserTable
        users={users.data}
        onChange={handleEditUserClick}
        onSelect={handleUserSelect}
        onFeedback={handleFeedbackChange}
      />
      <FAB
        variant="circular"
        aria-label="add"
        className="fixed right-5 bottom-12"
        color="primary"
        onClick={() => setShowAddDialog("create")}
      >
        <AddIcon />
      </FAB>
      <UserDialog
        key={`${showAddDialog}-${Date.now()}`}
        type={showAddDialog !== "info" ? showAddDialog : undefined}
        user={selectedUser}
        onClose={handleAddDialogClose}
      />
      <UserInfoDialog open={showAddDialog === "info"} {...selectedUser} />
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
