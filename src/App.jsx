import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreatePassword from "./component/pages/developer/access/create-password/CreatePassword";
import ForgotPassword from "./component/pages/developer/access/forgot-password/ForgotPassword";
import OtherLogin from "./component/pages/developer/access/login/OtherLogin";
import SystemLogin from "./component/pages/developer/access/login/SystemLogin";
import Info from "./component/pages/developer/info/Info";
import InfoEngagement from "./component/pages/developer/info/engagement/InfoEngagement";
import InfoEngagementView from "./component/pages/developer/info/engagement/views/InfoEngagementView";
import InfoMenuView from "./component/pages/developer/info/views/InfoMenuView";
import InfoView from "./component/pages/developer/info/views/InfoView";
import Roles from "./component/pages/developer/settings/roles/Roles";
import { routesClient } from "./routes/RoutesClient";
import { routesSystem } from "./routes/RoutesSystem";
import { StoreProvider } from "./store/StoreContext";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={"*"} element={<Roles />} />
              {/* Login */}
              <Route path={"/login"} element={<OtherLogin />} />
              <Route path={"/system/login"} element={<SystemLogin />} />
              <Route path={"/forgot-password"} element={<ForgotPassword />} />
              <Route path={"/create-password"} element={<CreatePassword />} />

              {/* MY INFO */}
              <Route path={"/info"} element={<Info />} />
              <Route path={"/info/menu"} element={<InfoMenuView />} />
              <Route path={"/info/menu/view"} element={<InfoView />} />
              <Route
                path={"/info/menu/engagement"}
                element={<InfoEngagement />}
              />
              <Route
                path={"/info/menu/engagement/view"}
                element={<InfoEngagementView />}
              />

              {/* CLIENT ROUTES */}
              {routesClient.map(({ ...routesProps }, key) => {
                return <Route key={key} {...routesProps} />;
              })}

              {/* SYSTEM ROUTES */}
              {routesSystem.map(({ ...routesProps }, key) => {
                return <Route key={key} {...routesProps} />;
              })}
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
