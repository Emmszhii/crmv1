import { devNavUrl } from "../component/helpers/functions-general";
import BankDetails from "../component/pages/developer/settings/bank-details/BankDetails";
import Roles from "../component/pages/developer/settings/roles/Roles";
import SystemAccount from "../component/pages/developer/settings/system-account/SystemAccount";
import SystemAccountView from "../component/pages/developer/settings/system-account/views/SystemAccountView";
import SettingsUsers from "../component/pages/developer/settings/users/SettingsUsers";

export const routesSystem = [
  {
    path: `${devNavUrl}/settings/roles`,
    element: (
      //   <ProtectedRouteOther>
      <Roles />
      //   </ProtectedRouteOther>
    ),
  },
  {
    path: `${devNavUrl}/settings/bank-details`,
    element: (
      //   <ProtectedRouteOther>
      <BankDetails />
      //   </ProtectedRouteOther>
    ),
  },
  {
    path: `${devNavUrl}/settings/system-account`,
    element: (
      //   <ProtectedRouteOther>
      <SystemAccount />
      //   </ProtectedRouteOther>
    ),
  },
  {
    path: `${devNavUrl}/settings/system-account/view`,
    element: (
      //   <ProtectedRouteOther>
      <SystemAccountView />
      //   </ProtectedRouteOther>
    ),
  },
  {
    path: `${devNavUrl}/settings/users`,
    element: (
      //   <ProtectedRouteOther>
      <SettingsUsers />
      //   </ProtectedRouteOther>
    ),
  },
];
