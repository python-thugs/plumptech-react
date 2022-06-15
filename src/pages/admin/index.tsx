import {Routes, Route} from "react-router-dom";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Administrator</h1>} />
    </Routes>
  );
};

export default Admin;
