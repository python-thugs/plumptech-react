import {Routes, Route} from "react-router-dom";
import AutomobileParkPage from "./pages/AutomobilePark";
import CalendarPlanningPage from "./pages/CalendarPlanning";
import CreateMaintenancePage from "./pages/CreateMaintenance";
export {Navigation} from "./Navigation";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarPlanningPage />} />
      <Route path="/create" element={<CreateMaintenancePage />} />
      <Route path="/automobiles" element={<AutomobileParkPage />} />
    </Routes>
  );
};

export default Admin;
