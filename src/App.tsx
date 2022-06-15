import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
