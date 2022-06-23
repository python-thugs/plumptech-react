import {Routes, Route} from "react-router-dom";
import TasksPage from "./pages/Tasks";
import AvailableTasksPage from "./pages/AvailableTasks";
export {Navigation} from "./Navigation";

const MechanicView = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
      <Route path="/maintenances" element={<AvailableTasksPage />} />
    </Routes>
  );
};

export default MechanicView;
