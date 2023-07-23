import Accounts from "~pages/Accounts";
import Statistics from "~pages/Statistics";
import Trips from "~pages/Trips";
import Reports from "~pages/Reports";

const publicRoutes = [
  { path: "/", component: Statistics },
  { path: "/accounts", component: Accounts },
  { path: "/trips", component: Trips },
  { path: "/reports", component: Reports },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
