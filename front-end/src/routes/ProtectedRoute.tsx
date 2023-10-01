import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "utils/function";

const ProtectedRoute = ({
   children,
   roles,
}: {
   children: any;
   roles?: Array<string>;
}): ReactElement => {
   const user = checkAuth();
   if (!user) return <Navigate to={"/login"} replace />;
   if (!roles || roles?.includes(user?.role)) return <>{children}</>;
   return <Navigate to={"/404"} replace />;
};

export default ProtectedRoute;
