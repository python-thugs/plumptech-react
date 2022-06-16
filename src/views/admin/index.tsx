import {Routes, Route} from "react-router-dom";
import UsersPage from "./pages/users"

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
    </Routes>
  );
};

export default Admin;
