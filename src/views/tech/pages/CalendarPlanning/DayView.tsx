import {useCallback, useMemo} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import T from "@mui/material/Typography";
// icons
import CogIcon from "@mui/icons-material/Settings";
import TimerIcon from "@mui/icons-material/Timer";
// custom imports
import {Day} from "./MonthView";
import styles from "./DayView.module.css";

interface IProps {
  active: boolean;
  day: Day;
  plannedMaintenances?: number;
  deadlineMaintenances?: number;
  onClick: (date: Date) => void;
}

const DayView: React.FC<IProps> = ({
  active,
  day,
  deadlineMaintenances,
  plannedMaintenances,
  onClick,
}) => {
  const {value, current} = day;

  const cardClassName = useMemo(() => {
    let className = styles["card"];
    if (current) className += " " + styles["card--current"];
    if (active) className += " " + styles["card--active"];
    return className;
  }, [current, active]);

  const handleClick = useCallback(() => onClick(value), [onClick, value]);

  return (
    <Card
      className={cardClassName}
      elevation={current ? 1 : 0}
      onClick={handleClick}
    >
      <CardContent className="flex flex-col gap-0 !px-4 !pt-3 !pb-4">
        <T variant="body1" component="p" className={styles["card-header"]}>
          {value.getDate()}
        </T>
        <div className="flex flex-col gap-2">
          <T variant="body2" component="p" className={styles["card-icon"]}>
            {plannedMaintenances ? (
              <>
                <CogIcon fontSize="small" className={styles["icon"]} />
                {plannedMaintenances}
              </>
            ) : undefined}
          </T>
          <T variant="body2" component="p" className={styles["card-icon"]}>
            {deadlineMaintenances ? (
              <>
                <TimerIcon fontSize="small" className={styles["icon"]} />
                {deadlineMaintenances}
              </>
            ) : undefined}
          </T>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayView;
