import T from "@mui/material/Typography";
import Button from "@mui/material/Button";
// icons
import TrashIcon from "@mui/icons-material/Delete";
// custom imports
import UserTable from "./UserTable";
import {useEffect, useState} from "react";
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
    </div>
  );
};

export default UsersPage;
