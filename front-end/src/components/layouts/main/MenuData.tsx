import { ReactElement } from "react";
import { RxDotFilled } from "react-icons/rx";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

export type MenuItemType = {
   key: string;
   icon: ReactElement;
   label: ReactElement | string;
   link: string;
   roles?: Array<string>;
   children?: Array<ChildMenuItemType>;
};

export type ChildMenuItemType = {
   key: string;
   icon: ReactElement;
   label: ReactElement | string;
   link: string;
   roles?: Array<string>;
};

const MenuData: Array<MenuItemType> = [
   {
      key: "cars",
      icon: <BiHomeAlt size={26} />,
      label: "Thông tin xe",
      link: "/cars",
   },
   {
      key: "inspect",
      icon: <HiOutlineClipboardDocumentCheck size={26} />,
      label: "Kiểm định",
      link: "/inspect",
      children: [
         {
            key: "inspect-result",
            label: "Kết quả kiểm tra",
            icon: <RxDotFilled />,
            link: "/inspect-result",
         },
      ],
   },
];
export { MenuData };
