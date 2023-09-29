import { useEffect, useState } from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router-dom";

import logo from "assets/images/vucar.jpg";
import { MenuData, MenuItemType, ChildMenuItemType } from "./MenuData";
import useSWR from "swr";
import { userAPI } from "api/user.api";

const Sidebar = ({ collapsed }: any) => {
   const location = useLocation();
   const [currentKey, seCurrentKey] = useState([""]);
   const { data } = useSWR("users/getProfile", () => userAPI.getProfile());
   const userInfo = data?.data || {};

   const getItems = (items: Array<MenuItemType>) => {
      const result: any[] = [];
      items.forEach((val: MenuItemType) => {
         const children: any[] = [];
         val?.children?.forEach((child) => {
            if (!child.permission || userInfo?.role?.name === child.permission) {
               children.push({
                  ...child,
                  key: child.id,
                  label: <Link to={child.link}>{child.label}</Link>,
               });
            }
         });
         if (!val?.permission || val?.permission === userInfo?.role?.name) {
            if (children) {
               result.push({
                  key: val.id,
                  icon: val.icon,
                  label: val.label,
                  children,
               });
            } else {
               result.push({
                  key: val.id,
                  icon: val.icon,
                  label: val.label,
               });
            }
         }
      });
      return result;
   };

   const getChildItems = (items: Array<MenuItemType>): Array<ChildMenuItemType> => {
      const children: Array<ChildMenuItemType> = [];
      items?.forEach((item: any) => {
         if (item?.children) {
            children.push(...item.children);
         }
      });
      return children;
   };

   useEffect(() => {
      const childrenItems: Array<ChildMenuItemType> = getChildItems(MenuData);
      const currentPath = location.pathname;

      const activeKeys = childrenItems.filter((val: any) => currentPath.includes(val.link));
      if (activeKeys.length) seCurrentKey([activeKeys[0].id]);
      else seCurrentKey([""]);
   }, [location]);

   const items = getItems(MenuData);
   return (
      <>
         <Sider
            className="border-r border-gray-300"
            style={{ background: "#FFF" }}
            trigger={null}
            collapsible
            width={280}
            collapsed={collapsed}
         >
            <div className="flex justify-center py-3 px-3">
               <img className="min-h-[60px] min-w-[60px]" src={logo} alt="logo.svg"></img>
            </div>

            <Menu
               theme="light"
               mode="inline"
               style={{ fontWeight: 600, border: "none" }}
               selectedKeys={currentKey}
               items={items}
            />
         </Sider>
      </>
   );
};
export default Sidebar;
