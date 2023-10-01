import { ReactElement } from "react";

import Profile from "pages/profile/Profile";
import Home from "pages/home/Home";

import Login from "pages/login/Login";
import NotFound from "pages/404/NotFound";

import { ROLES } from "utils/constant";
import InspectResult from "pages/inspection/InspectResult";
import CreateInspection from "pages/inspection/CreateInspection";

type route = {
   path: string;
   element: ReactElement;
   roles?: Array<string>;
};

const PublicRoutes: route[] = [
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/404",
      element: <NotFound />,
   },
];

const ProtectedRoutes: route[] = [
   // home
   {
      path: "/cars",
      element: <Home></Home>,
   },
   {
      path: "/inspect-result",
      element: <InspectResult />,
      roles: [ROLES.ADMIN, ROLES.MECHANICAL],
   },
   {
      path: "/create-inspect/:sku",
      element: <CreateInspection />,
      roles: [ROLES.MECHANICAL],
   },
   // profile
   {
      path: "/profile",
      element: <Profile />,
   },
];

export { PublicRoutes, ProtectedRoutes };
