import {useMemo} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from "./views/default/pages/LoginPage";
import AdminView from "./views/admin";
import {useAppSelector} from "./store";
import {PostEnum} from "./api/types";

function App() {
  const user = useAppSelector(store => store.auth);

  const appView = useMemo(() => {
    switch (user.post) {
      case PostEnum.Администратор:
        return <AdminView />;
      default:
        return null;
    }
  }, [user.post]);

  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={appView} />
      </Routes>
    </div>
  );
}

export default App;
