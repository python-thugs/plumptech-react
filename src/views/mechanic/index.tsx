import {Routes, Route} from "react-router-dom";
import TasksPage from "./pages/Tasks";

const MechanicView = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
    </Routes>
  );
};

export default MechanicView;
