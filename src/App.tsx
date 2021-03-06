import {useEffect, useMemo} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
// custom imports
import AppBar from "./components/AppBar";
import Sidebar from "./components/SideBar";
import LoginPage from "./views/default/pages/LoginPage";
import AdminView from "./views/admin";
import TechnicianView, {Navigation as TechnicianNavigation} from "./views/tech";
import MechanicView, {Navigation as MechanicNavigation} from "./views/mechanic";
import {useAppSelector} from "./store";
import {PostEnum} from "./api/types";

const queryClient = new QueryClient();

function App() {
  const user = useAppSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.post) navigate("/login", {replace: true});
  }, [user.post]); // eslint-disable-line

  const [appView, sidebarActions] = useMemo(() => {
    switch (user.post?.id) {
      case PostEnum.Администратор:
        return [<AdminView />, null];
      case PostEnum["Старший техник"]:
        return [<TechnicianView />, TechnicianNavigation()];
      case PostEnum.Автослесарь:
        return [<MechanicView />, MechanicNavigation()];
      default:
        return [null, null];
    }
  }, [user.post]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <div className="flex flex-row flex-1 flex-shrink-0 h-full w-full">
              <Sidebar>{sidebarActions}</Sidebar>

              <div className="flex flex-col flex-1 h-full">
                <AppBar />
                {appView}
              </div>
            </div>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
