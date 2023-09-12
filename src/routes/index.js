import Accounts from "~pages/Accounts";
import Statistics from "~pages/Statistics";
import Trips from "~pages/Trips";
import Reports from "~pages/Reports";
import Option from "~pages/Option";

const publicRoutes = [
  { path: "/", component: Statistics },
  { path: "/accounts", component: Accounts },
  { path: "/trips", component: Trips },
  { path: "/reports", component: Reports },
  { path: "/option", component: Option },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
