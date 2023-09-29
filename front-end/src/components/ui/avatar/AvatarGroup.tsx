import { Avatar, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineUser, AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";

import type { MenuProps } from "antd";
import defaultAvatar from "assets/images/avatar/default.jpg";
import { LOCAL_STORAGE } from "helper/storage.helper";
import useSWR from "swr";
import { userAPI } from "api/user.api";

const AvatarGroup = (props: any) => {
   const navigate = useNavigate();
   const { data } = useSWR("users/getProfile", () => userAPI.getProfile());
   const userInfo = data?.data || {};

   const [isModalOpen, setIsModalOpen] = useState(false);

   const onClick: MenuProps["onClick"] = async ({ key }) => {
      const handleClick: any = {
         "1": () => navigate("/profile"),
         "2": () => setIsModalOpen(true),
         "3": () => {
            LOCAL_STORAGE.removeAccessToken();
            LOCAL_STORAGE.removeRefreshToken();
            LOCAL_STORAGE.removeUser();
            navigate("/login");
         },
      };
      handleClick?.[key]();
   };

   const hangdleOnClick = (e: any) => {
      e.preventDefault();
   };

   const items: MenuProps["items"] = [
      {
         label: "Tài khoản",
         key: "1",
         icon: <AiOutlineUser size={18} />,
      },
      {
         label: "Đổi mật khẩu",
         key: "2",
         icon: <RiLockPasswordLine size={17} />,
      },
      {
         label: "Đăng xuất",
         key: "3",
         icon: <AiOutlineLogout size={17} />,
      },
   ];

   return (
      <>
         {props.hiddenDropdown === true ? (
            <></>
         ) : (
            <div>
               <Dropdown menu={{ items, onClick }} placement="bottomRight">
                  <button onClick={hangdleOnClick}>
                     <Space>
                        <Avatar src={userInfo?.avatar || defaultAvatar} size={38}></Avatar>
                        <div>
                           <p className="text-start text-sm font-medium">
                              {userInfo?.firstName + " " + userInfo?.lastName}
                           </p>
                           <p className="text-start text-sm text-gray-500 font-medium uppercase">
                              {userInfo?.role?.name || "USER"}
                           </p>
                        </div>
                        <AiFillCaretDown />
                     </Space>
                  </button>
               </Dropdown>
            </div>
         )}
      </>
   );
};

export default AvatarGroup;
