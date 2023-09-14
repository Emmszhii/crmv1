import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./store/StoreContext";
import Roles from "./component/pages/developer/settings/roles/Roles";
import BankDetails from "./component/pages/developer/settings/bank-details/BankDetails";

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
              <Route path={"/settings/roles"} element={<Roles />} />
              <Route
                path={"/settings/bank-details"}
                element={<BankDetails />}
              />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
