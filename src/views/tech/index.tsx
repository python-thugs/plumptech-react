import {Routes, Route} from "react-router-dom";
import AutomobileParkPage from "./pages/AutomobilePark";
import CalendarPlanningPage from "./pages/CalendarPlanning";
export {Navigation} from "./Navigation";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarPlanningPage />} />
      <Route path="/automobiles" element={<AutomobileParkPage />} />
    </Routes>
  );
};

export default Admin;
