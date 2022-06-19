import {useCallback, useMemo} from "react";
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
import {IEmployee, PostEnum} from "../../../../api/types";
import {deleteUser} from "../../../../api/users";
import {FeedbackHandler} from ".";

interface IUserRowProps extends IEmployee {
  onFeedback: FeedbackHandler;
  onChange: (user: IEmployee) => void;
  onSelect: (user: IEmployee) => void;
}

const UserRow: React.FC<IUserRowProps> = ({
  onChange,
  onFeedback,
  onSelect,
  ...user
}) => {
  const handleDeleteClick = useCallback(() => {
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
  }, [user.id, onFeedback, user.name]);

  const handleEditClick = useCallback(() => {
    onChange(user);
  }, [onChange]);

  return (
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
          <IconButton color="inherit">
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
  );
};

const UserTable: React.FC<{
  users?: IEmployee[];
  onFeedback: FeedbackHandler;
  onChange: (user: IEmployee) => void;
  onSelect: (user: IEmployee) => void;
}> = ({users, onChange, onSelect, onFeedback}) => {
  const employees = useMemo(
    () =>
      users?.map(user => (
        <UserRow
          key={`user-item-${user.id}`}
          onChange={onChange}
          onSelect={onSelect}
          onFeedback={onFeedback}
          {...user}
        />
      )),
    [users, onFeedback]
  );
  return (
    <Table className="table-auto">
      <TableHead>
        <TableRow
          isHeader
          checkbox
          name="ФИО сотрудника"
          userName="Имя пользователя"
          post="Имя пользователя"
          actions="Действия"
        />
      </TableHead>
      <TableBody>{employees}</TableBody>
    </Table>
  );
};

export default UserTable;
