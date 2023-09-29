import { ReactElement } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { TbDashboard } from "react-icons/tb";
import { RxDotFilled } from "react-icons/rx";
import { ROLES } from "common/constant";
import { BiHomeAlt, BiHomeAlt2 } from "react-icons/bi";

export type MenuItemType = {
   id: string;
   icon: ReactElement;
   label: string;
   link: string;
   permission?: string;
   children?: Array<ChildMenuItemType>;
};

export type ChildMenuItemType = {
   id: string;
   icon: ReactElement;
   label: string;
   link: string;
   permission?: string;
};

const MenuData: Array<MenuItemType> = [
   {
      id: "home",
      icon: <BiHomeAlt size={26} />,
      label: "Thông tin xe",
      link: "/home",
      // children: [
      //    {
      //       id: "home",
      //       label: "Bảng điều khiển",
      //       icon: <RxDotFilled />,
      //       link: "/home",
      //    },
      // ],
   },
   {
      id: "cars",
      icon: <BiHomeAlt size={26} />,
      label: "Kiểm định",
      link: "/inspect",
      children: [
         {
            id: "home",
            label: "Bảng điều khiển",
            icon: <RxDotFilled />,
            link: "/inspect",
         },
      ],
   },
   {
      id: "cars",
      icon: <BiHomeAlt size={26} />,
      label: "Kiểm định",
      link: "/car",
      children: [
         {
            id: "home",
            label: "Bảng điều khiển",
            icon: <RxDotFilled />,
            link: "/car",
         },
      ],
   },
   // {
   //    id: "users",
   //    icon: <AiOutlineUser size={24} />,
   //    label: "Người dùng",
   //    link: "/users",
   //    permission: ROLES.ADMIN,
   //    children: [
   //       {
   //          id: "users",
   //          label: "Người dùng",
   //          icon: <RxDotFilled />,
   //          permission: ROLES.ADMIN,
   //          link: "/users",
   //       },
   //    ],
   // },
];
export { MenuData };
