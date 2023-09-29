import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
   children,
   roles,
   userInfo,
}: {
   children: any;
   roles?: Array<string>;
   userInfo: any;
}): ReactElement => {
   if (!userInfo) return <Navigate to={"/login"} replace />;
   if (!roles || roles?.includes(userInfo?.role?.name)) return <>{children}</>;
   return <Navigate to={"/404"} replace />;
};

export default ProtectedRoute;
