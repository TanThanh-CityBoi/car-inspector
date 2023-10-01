import { ReactElement } from "react";
import { checkAuth } from "utils/function";

const PermissionGuard = ({
   children,
   roles,
}: {
   children: any;
   roles: Array<string>;
}): ReactElement => {
   const user: any = checkAuth();

   if (!roles || roles?.includes(user?.role)) return <>{children}</>;
   return <></>;
};

export default PermissionGuard;
