import { ReactElement } from "react";

import CreateAccount from "pages/members/CreateUser";
import Members from "pages/members/UserList";
import Profile from "pages/profile/Profile";
import Home from "pages/home/Home";

import Login from "pages/login/Login";
import NotFound from "pages/404/NotFound";

import { ROLES } from "common/constant";

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
      path: "/home",
      element: <Home></Home>,
   },
   // users
   {
      path: "/users",
      element: <Members></Members>,
      roles: [ROLES.ADMIN],
   },
   {
      path: "/add-users",
      element: <CreateAccount></CreateAccount>,
      roles: [ROLES.ADMIN],
   },
   // profile
   {
      path: "/profile",
      element: <Profile />,
   },
];

export { PublicRoutes, ProtectedRoutes };
