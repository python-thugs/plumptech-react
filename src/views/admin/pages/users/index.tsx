import {useEffect, useCallback, useState} from "react";
import T from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FAB from "@mui/material/Fab";
// icons
import TrashIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// custom imports
import UserTable from "./UserTable";
import AddUserDialog from "./dialogs/AddUser";
import {getList} from "../../../../api/users";
import {IEmployee} from "../../../../api/types";

const UsersPage = () => {
  const [users, setUsers] = useState<IEmployee[]>([]);

  useEffect(() => {
    getList()
      .then(list => setUsers(list))
      .catch(e => {
        console.error(e);
      });
  }, [setUsers]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const handleAddDialogToggle = useCallback(() => {
    setShowAddDialog(!showAddDialog);
  }, [showAddDialog]);

  const handleAddDialogClose = useCallback<(user?: IEmployee) => void>(
    newUser => {
      setShowAddDialog(false);
      if (newUser) {
        setUsers([...users, newUser]);
      }
    },
    [users]
  );

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
      <UserTable users={users} />
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
    </div>
  );
};

export default UsersPage;
