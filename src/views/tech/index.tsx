import {Routes, Route} from "react-router-dom";
import AutomobileParkPage from "./pages/AutomobilePark";
import CalendarPlanningPage from "./pages/CalendarPlanning";
import CreateMaintenancePage from "./pages/CreateMaintenance";
import ReportsPage from "./pages/Reports";
export {Navigation} from "./Navigation";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarPlanningPage />} />
      <Route path="/create" element={<CreateMaintenancePage />} />
      <Route path="/automobiles" element={<AutomobileParkPage />} />
      <Route path="/reports" element={<ReportsPage />} />
    </Routes>
  );
};

export default Admin;
