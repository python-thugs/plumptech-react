import MuiTableRow from "@mui/material/TableRow";
import MuiTableCell from "@mui/material/TableCell";
import MuiCheckbox from "@mui/material/Checkbox";
import T from "@mui/material/Typography";

interface IProps {
  isHeader?: boolean;
  checkbox?: boolean;
  name: string;
  post: string;
  userName: string;
  actions: string | JSX.Element;
}

const TableRow: React.FC<IProps> = ({
  actions,
  checkbox,
  isHeader,
  name,
  userName,
  post,
}) => (
  <MuiTableRow>
    <MuiTableCell className="px-3 w-0">
      {checkbox && <MuiCheckbox />}
    </MuiTableCell>
    <MuiTableCell>
      <T className={isHeader ? "font-medium" : ""} variant="body1">
        {name}
      </T>
    </MuiTableCell>
    <MuiTableCell>
      <T className={isHeader ? "font-medium" : ""} variant="body1">
        {post}
      </T>
    </MuiTableCell>
    <MuiTableCell>
      <T className={isHeader ? "font-medium" : ""} variant="body1">
        {userName}
      </T>
    </MuiTableCell>
    <MuiTableCell className="max-w-fit min-w-fit">
      {isHeader ? (
        <T variant="body1" className="font-medium">
          {actions}
        </T>
      ) : (
        <p className="m-0 p-0 flex flex-row gap-2 mx-[-0.5rem] text-gray-500">
          {actions}
        </p>
      )}
    </MuiTableCell>
  </MuiTableRow>
);

export default TableRow;
