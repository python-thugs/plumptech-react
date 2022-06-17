import {useEffect, useMemo} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import LoginPage from "./views/default/pages/LoginPage";
import AdminView from "./views/admin";
import {useAppSelector} from "./store";
import {PostEnum} from "./api/types";
import AppBar from "./components/AppBar";

function App() {
  const user = useAppSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.post) navigate("/login", {replace: true});
  }, []); // eslint-disable-line

  const appView = useMemo(() => {
    switch (user.post?.id) {
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
        <Route
          path="*"
          element={
            <>
              <AppBar />
              {appView}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
