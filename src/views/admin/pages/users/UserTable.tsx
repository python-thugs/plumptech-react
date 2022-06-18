import {useCallback, useMemo, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "./TableRow";
// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import ResetIcon from "@mui/icons-material/LockReset";
// custom imports
import {IEmployee, PostEnum} from "../../../../api/types";
import {deleteUser} from "../../../../api/users";

interface IError {
  type: "info" | "error";
  action: string;
  message: string;
}
interface IUserRowProps extends IEmployee {
  showFeedback: (msg: IError) => void;
}

const UserRow: React.FC<IUserRowProps> = ({
  id,
  name,
  username,
  post,
  showFeedback,
}) => {
  const handlePrintClick = useCallback(() => {
    alert("There should be a print dialog");
  }, [id]);

  const handleDeleteClick = useCallback(() => {
    deleteUser(id)
      .then(success => {
        if (!success) {
          showFeedback({
            type: "error",
            action: "delete-user",
            message: `Возникла ошибка при удалении пользователя`,
          });
          return;
        }
        showFeedback({
          type: "info",
          action: "delete-user",
          message: `Пользователь ${name} успешно удален`,
        });
      })
      .catch(err => {
        showFeedback({
          type: "error",
          action: "delete-user",
          message: err.response ? err.response.data.message : err.message,
        });
      });
  }, [id, name]);

  return (
    <TableRow
      checkbox={post.id !== PostEnum.Администратор}
      name={name}
      userName={username}
      post={post.name}
      actions={
        <>
          <IconButton color="inherit" onClick={handlePrintClick}>
            <PrintIcon />
          </IconButton>
          {post.id !== PostEnum.Администратор && (
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
          )}
          <IconButton color="inherit">
            <ResetIcon />
          </IconButton>
          {post.id !== PostEnum.Администратор && (
            <IconButton color="inherit" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      }
    />
  );
};

const UserTable: React.FC<{users: IEmployee[]}> = ({users}) => {
  const employees = useMemo(
    () => users.map(user => <UserRow {...user} />),
    [users]
  );

  const [showAddDialog, setShowAddDialog] = useState(false);
  const handleAddDialogToggle = useCallback(() => {
    setShowAddDialog(!showAddDialog);
  }, [showAddDialog]);
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
