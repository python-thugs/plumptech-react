import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const MaterialsTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Наименование</TableCell>
          <TableCell align="center">Код</TableCell>
          <TableCell align="center">Цена</TableCell>
        </TableRow>
      </TableHead>
      <TableBody></TableBody>
    </Table>
  );
};

export default MaterialsTable;
