import {Routes, Route} from "react-router-dom";
import CalendarPlanningPage from "./pages/CalendarPlanning";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarPlanningPage />} />
    </Routes>
  );
};

export default Admin;