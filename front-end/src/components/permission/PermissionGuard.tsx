import { ReactElement } from "react";

const PermissionGuard = ({
   children,
   permission,
}: {
   children: any;
   permission: string;
}): ReactElement => {
   const userInfo: any = { role: "admin" };

   if (!permission || userInfo?.role === permission) return <>{children}</>;
   return <></>;
};

export default PermissionGuard;
