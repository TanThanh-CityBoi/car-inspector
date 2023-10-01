import { useEffect, useState } from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router-dom";

import logo from "assets/images/vucar.jpg";
import { MenuData, MenuItemType, ChildMenuItemType } from "./MenuData";
import { checkAuth } from "utils/function";

const Sidebar = ({ collapsed }: any) => {
   const location = useLocation();
   const [currentKey, seCurrentKey] = useState([""]);
   const user = checkAuth();

   const getItems = (items: Array<MenuItemType>) => {
      const menuItems: Array<any> = [];
      items.forEach((item: MenuItemType) => {
         if (!item?.roles || item?.roles?.includes(user?.role)) {
            //
            const childItems: Array<ChildMenuItemType> = [];
            item?.children?.forEach((child) => {
               if (!child?.roles || child?.roles?.includes(user?.role)) {
                  childItems.push({
                     ...child,
                     label: <Link to={child.link}>{child.label}</Link>,
                  });
               }
            });
            menuItems.push({
               ...item,
               label: childItems.length ? item.label : <Link to={item.link}>{item.label}</Link>,
               children: childItems.length ? childItems : null,
            });
         }
      });

      return menuItems;
   };

   const getAllItems = (items: Array<MenuItemType>): Array<ChildMenuItemType> => {
      const allItems: Array<any> = [];
      items?.forEach((item: any) => {
         if (item?.children?.length) {
            allItems.push(...item.children);
         } else {
            allItems.push(item);
         }
      });
      return allItems;
   };

   useEffect(() => {
      const allItems: Array<ChildMenuItemType> = getAllItems(MenuData);
      const currentPath = location.pathname;
      //
      const activeKeys = allItems.filter((val: any) => currentPath.includes(val.link));
      if (activeKeys.length) seCurrentKey([activeKeys[0].key]);
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
            width={300}
            collapsed={collapsed}
         >
            <div className="flex justify-center py-3 px-3">
               <img className="min-h-[60px] min-w-[60px]" src={logo} alt="logo.svg"></img>
            </div>

            <Menu
               theme="light"
               mode="inline"
               style={{ fontWeight: 600, fontSize: 15, border: "none" }}
               selectedKeys={currentKey}
               items={items}
            />
         </Sider>
      </>
   );
};
export default Sidebar;
