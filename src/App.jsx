import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Account from "./component/pages/developer/client/account/Account";
import AccountView from "./component/pages/developer/client/account/views/AccountView";
import ClientList from "./component/pages/developer/client/list/ClientList";
import ClientListView from "./component/pages/developer/client/list/views/ClientListView";
import Info from "./component/pages/developer/info/Info";
import InfoEngagement from "./component/pages/developer/info/engagement/InfoEngagement";
import InfoRoles from "./component/pages/developer/info/roles/InfoRoles";
import InfoListView from "./component/pages/developer/info/views/InfoListView";
import BankDetails from "./component/pages/developer/settings/bank-details/BankDetails";
import Roles from "./component/pages/developer/settings/roles/Roles";
import SystemAccount from "./component/pages/developer/settings/system-account/SystemAccount";
import SystemAccountView from "./component/pages/developer/settings/system-account/views/SystemAccountView";
import { StoreProvider } from "./store/StoreContext";
import InfoView from "./component/pages/developer/info/views/InfoView";

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
              {/* CLIENT */}
              <Route path={"/client/list"} element={<ClientList />} />
              <Route path={"/client/list/view"} element={<ClientListView />} />
              <Route path={"/client/account"} element={<Account />} />
              <Route path={"/client/account/view"} element={<AccountView />} />
              {/* SETTINGS */}
              <Route path={"/settings/roles"} element={<Roles />} />
              <Route
                path={"/settings/bank-details"}
                element={<BankDetails />}
              />
              <Route
                path={"/settings/system-account"}
                element={<SystemAccount />}
              />
              <Route
                path={"/settings/system-account/view"}
                element={<SystemAccountView />}
              />
              {/* MY INFO */}
              <Route path={"/info"} element={<Info />} />
              <Route path={"/info/list"} element={<InfoListView />} />
              <Route path={"/info/view"} element={<InfoView />} />
              {/* <Route path={"/info/view"} element={<InfoRolesView />} /> */}
              <Route path={"/info/engagement"} element={<InfoEngagement />} />
              <Route
                path={"/info/engagement/view"}
                element={<InfoEngagement />}
              />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
