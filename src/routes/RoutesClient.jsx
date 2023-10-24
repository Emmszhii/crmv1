import { devNavUrl } from "../component/helpers/functions-general";
import Account from "../component/pages/developer/client/account/Account";
import AccountView from "../component/pages/developer/client/account/views/AccountView";
import ClientList from "../component/pages/developer/client/list/ClientList";
import ClientListView from "../component/pages/developer/client/list/views/ClientListView";

export const routesClient = [
  {
    path: `${devNavUrl}/client/list`,
    element: (
      //   <ProtectedRouteOther>
      <ClientList />
      //   </ProtectedRouteOther>
    ),
  },
  {
    path: `${devNavUrl}/client/list/view`,
    element: (
      //   <ProtectedRouteOther>
      <ClientListView />
      //   </ProtectedRouteOther>
    ),
  },
  {
    path: `${devNavUrl}/client/account`,
    element: (
      //   <ProtectedRouteOther>
      <Account />
      //   </ProtectedRouteOther>
    ),
  },
  {
    path: `${devNavUrl}/client/account/view`,
    element: (
      //   <ProtectedRouteOther>
      <AccountView />
      //   </ProtectedRouteOther>
    ),
  },
];
