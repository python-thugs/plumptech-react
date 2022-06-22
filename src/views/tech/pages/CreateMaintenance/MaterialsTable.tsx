import {useCallback} from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
// icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
// custom imports
import {IMaterial} from "../../../../api/types";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

interface IProps {
  materials?: IMaterial[];
  onMaterialAdd: () => void;
  onMaterialChange: (index: number, material: IMaterial) => void;
  onMaterialDelete: (materialIndex: number) => void;
}

const MaterialsTable: React.FC<IProps> = ({
  materials,
  onMaterialAdd,
  onMaterialChange,
  onMaterialDelete,
}) => {
  const createHandleInputChange = useCallback(
    (index: number): React.ChangeEventHandler<HTMLInputElement> =>
      ({target}) => {
        if (!materials) return;
        onMaterialChange(index, {
          ...materials[index],
          [target.name as keyof IMaterial]:
            target.type === "number" ? Number(target.value) : target.value,
        });
      },
    [onMaterialChange, materials]
  );

  const createHandleDelete = useCallback(
    (index: number) => () => {
      onMaterialDelete(index);
    },
    [onMaterialDelete]
  );

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell align="left">Наименование</TableCell>
          <TableCell align="left" width={175} className="px-2">
            Код
          </TableCell>
          <TableCell align="left" width={175} className="px-2">
            Цена
          </TableCell>
          <TableCell align="left" padding="checkbox">
            Удалить
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {materials?.map((m, i) => (
          <TableRow>
            <TableCell align="left">
              <TextField
                variant="standard"
                name="name"
                onChange={createHandleInputChange(i)}
                value={m.name}
              />
            </TableCell>
            <TableCell align="center" className="px-2">
              <TextField
                variant="standard"
                name="code"
                onChange={createHandleInputChange(i)}
                value={m.code}
              />
            </TableCell>
            <TableCell align="center" className="px-2">
              <TextField
                variant="standard"
                name="price"
                type="number"
                onChange={createHandleInputChange(i)}
                InputProps={{inputProps: {min: 0, step: 1}}}
                value={m.price.toFixed(2)}
              />
            </TableCell>
            <TableCell align="center" padding="checkbox">
              <IconButton
                onClick={createHandleDelete(i)}
                color="error"
                className="text-gray-400 hover:text-rose-600"
              >
                <DeleteIcon className="w-5 h-5" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            <Button startIcon={<AddIcon />} fullWidth onClick={onMaterialAdd}>
              Добавить
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default MaterialsTable;
