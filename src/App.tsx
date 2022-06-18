import {useEffect, useMemo} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
// custom imports
import LoginPage from "./views/default/pages/LoginPage";
import AdminView from "./views/admin";
import {useAppSelector} from "./store";
import {PostEnum} from "./api/types";
import AppBar from "./components/AppBar";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
