import {useMemo} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminView from "./pages/admin";
import {useAppSelector} from "./store";
import {PostEnum} from "./api/types";

function App() {
  const user = useAppSelector(store => store.auth);

  const appView = useMemo(() => {
    debugger;
    switch (user.type) {
      case PostEnum.ADMIN:
        return <AdminView />;
      default:
        return null;
    }
  }, [user.type]);

  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={appView} />
      </Routes>
    </div>
  );
}

export default App;
