import {useCallback, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// custom imports
import {IAuto} from "../../../../api/types";
import {createAuto} from "../../../../api/auto";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const AutoDialog: React.FC<IProps> = ({open, onClose}) => {
  const [auto, setAuto] = useState<IAuto>({
    garagePlate: "",
    licensePlate: "",
    model: "",
    manufacturer: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    e => {
      setAuto({...auto, [e.target.name]: e.target.value});
    },
    [auto]
  );

  const handleCreateClick = useCallback(() => {
    if (
      !auto.garagePlate ||
      !auto.licensePlate ||
      !auto.manufacturer ||
      !auto.model
    ) {
      setError(true);
      return;
    }
    createAuto(auto)
      .then(onClose)
      .catch(err => {
        console.error("AutoDialog#createAuto:", err);
        setError(true);
      });
    onClose();
  }, [onClose, auto]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="px-9">Добавление автомобиля</DialogTitle>
      <DialogContent className="flex flex-col min-w-[400px] gap-4 !pt-2">
        <TextField
          error={error && !auto.manufacturer}
          name="manufacturer"
          label="Производитель"
          value={auto.manufacturer}
          onChange={handleInputChange}
        />
        <TextField
          error={error && !auto.model}
          name="model"
          label="Модель"
          value={auto.model}
          onChange={handleInputChange}
        />
        <TextField
          error={error && !auto.licensePlate}
          name="licensePlate"
          label="Государственный номер"
          value={auto.licensePlate}
          onChange={handleInputChange}
        />
        <TextField
          error={error && !auto.garagePlate}
          name="garagePlate"
          label="Гаражный номер"
          value={auto.garagePlate}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions className="gap-4">
        <Button
          variant="text"
          color="inherit"
          className="text-gray-400 hover:text-rose-600 flex-1"
          onClick={onClose}
        >
          Отмена
        </Button>
        <Button
          color="primary"
          variant="contained"
          className="flex-1 !m-0"
          onClick={handleCreateClick}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AutoDialog;
