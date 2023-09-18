import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./store/StoreContext";
import Roles from "./component/pages/developer/settings/roles/Roles";
import BankDetails from "./component/pages/developer/settings/bank-details/BankDetails";
import SystemAccount from "./component/pages/developer/settings/system-account/SystemAccount";
import SystemAccountView from "./component/pages/developer/settings/system-account/views/SystemAccountView";
import ClientList from "./component/pages/developer/client/list/ClientList";
import Account from "./component/pages/developer/client/account/Account";
import AccountView from "./component/pages/developer/client/account/views/AccountView";
import ClientListView from "./component/pages/developer/client/list/views/ClientListView";

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
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
