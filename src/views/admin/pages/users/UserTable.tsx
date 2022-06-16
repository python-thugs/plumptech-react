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
import {useMemo} from "react";

const UserTable: React.FC<{users: IEmployee[]}> = ({users}) => {
  const employees = useMemo(
    () =>
      users.map(({name, username, post}) => (
        <TableRow
          checkbox={post.id !== PostEnum.Администратор}
          name={name}
          userName={username}
          post={post.name}
          actions={
            <>
              <IconButton color="inherit">
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
                <IconButton color="inherit">
                  <DeleteIcon />
                </IconButton>
              )}
            </>
          }
        />
      )),
    [users]
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
