import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoutes, PublicRoutes } from "./routes";
import MainLayout from "components/layouts/main/MainLayout";
import AuthLayout from "components/layouts/auth/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import useSWR from "swr";
import { userAPI } from "api/user.api";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";

const RouteApp = () => {
   const { data, isLoading } = useSWR("users/getProfile", () => userAPI.getProfile());
   const userInfo = data?.data;

   if (isLoading) {
      return (
         <div>
            <FullPageSpiner isLoading={isLoading} />
         </div>
      );
   }

   return (
      <Routes>
         <Route path="/" element={<MainLayout></MainLayout>}>
            <Route index element={<Navigate to="/home" />} />
            {ProtectedRoutes.map((route) => (
               <Route
                  key={route.path}
                  path={route.path}
                  element={
                     <ProtectedRoute roles={route?.roles} userInfo={userInfo}>
                        {route.element}
                     </ProtectedRoute>
                  }
               ></Route>
            ))}
         </Route>

         <Route element={<AuthLayout></AuthLayout>}>
            {PublicRoutes.map((route) => (
               <Route key={route.path} path={route.path} element={route.element}></Route>
            ))}
         </Route>

         <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
   );
};

export default RouteApp;
