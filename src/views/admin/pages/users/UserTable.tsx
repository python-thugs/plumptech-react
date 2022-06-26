import {useCallback, useMemo, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "./TableRow";
// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ResetIcon from "@mui/icons-material/LockReset";
// custom imports
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import {IEmployee, PostEnum} from "../../../../api/types";
import {deleteUser} from "../../../../api/users";
import {FeedbackHandler} from ".";

interface IUserRowProps extends IEmployee {
  onFeedback: FeedbackHandler;
  onChange: (user: IEmployee) => void;
  onSelect: (user: IEmployee) => void;
  onPasswordReset: (user: IEmployee) => void;
}

const UserRow: React.FC<IUserRowProps> = ({
  onChange,
  onFeedback,
  onSelect,
  onPasswordReset,
  ...user
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDeleteClick = useCallback(() => {
    setShowConfirmation(true);
  }, []);
  const handleConfirmationClose = useCallback<
    React.ComponentProps<typeof ConfirmationDialog>["onClose"]
  >(
    confirmed => {
      setShowConfirmation(false);
      if (!confirmed) return;
      deleteUser(user.id)
        .then(success => {
          if (!success) {
            onFeedback({
              type: "error",
              action: "delete-user",
              message: `Возникла ошибка при удалении пользователя ${user.name}`,
            });
            return;
          }
          onFeedback({
            type: "success",
            action: "delete-user",
            message: `Пользователь ${user.name} успешно удален`,
          });
        })
        .catch(err => {
          onFeedback({
            type: "error",
            action: "delete-user",
            message: err.response ? err.response.data.message : err.message,
          });
        });
    },
    [user.id, onFeedback, user.name]
  );

  const handleEditClick = useCallback(() => {
    onChange(user);
  }, [onChange, user]);

  const handleResetClick = useCallback(() => {
    onPasswordReset(user);
  }, [user, onPasswordReset]);

  return (
    <>
      <TableRow
        checkbox={user.post.id !== PostEnum.Администратор}
        name={user.name}
        userName={user.username}
        post={user.post.name}
        actions={
          <>
            {user.post.id !== PostEnum.Администратор && (
              <IconButton color="inherit" onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton color="inherit" onClick={handleResetClick}>
              <ResetIcon />
            </IconButton>
            {user.post.id !== PostEnum.Администратор && (
              <IconButton color="inherit" onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            )}
          </>
        }
      />
      {showConfirmation && (
        <ConfirmationDialog
          open={showConfirmation}
          onClose={handleConfirmationClose}
          text={`Вы действительно хотите удалить пользователя ${user.name}?`}
          confirmText="Удалить"
          confirmType="error"
          cancelType="inherit"
          cancelClass="text-gray-500 hover:text-gray-700"
        />
      )}
    </>
  );
};

const UserTable: React.FC<
  {
    users?: IEmployee[];
  } & Omit<IUserRowProps, keyof IEmployee>
> = ({users, ...userRowProps}) => {
  const employees = useMemo(
    () =>
      users?.map(user => (
        <UserRow key={`user-item-${user.id}`} {...user} {...userRowProps} />
      )),
    [users, userRowProps]
  );
  return (
    <Table className="table-auto">
      <TableHead>
        <TableRow
          isHeader
          checkbox
          name="ФИО сотрудника"
          userName="Имя пользователя"
          post="Должность"
          actions="Действия"
        />
      </TableHead>
      <TableBody>{employees}</TableBody>
    </Table>
  );
};

export default UserTable;
