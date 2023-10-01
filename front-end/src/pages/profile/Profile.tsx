import { useState } from "react";
import { AiOutlineEdit, AiOutlineKey } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import SecondaryButton from "components/ui/button/SecondaryButton";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { GENDERS } from "utils/constant";
import defaultAvatar from "assets/images/avatar/default.jpg";
import { format } from "date-fns";
import useSWR from "swr";
import { userAPI } from "api/user.api";

function Profile() {
   const { data, isLoading } = useSWR("users/getProfile", () => userAPI.getProfile());
   const userInfo = data?.data || {};

   const [avatarFile, setAvatarFile] = useState<File | null>(null);
   const [avatarUrl, seAvatarUrl] = useState<any>("");

   const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileSelected = e.currentTarget.files?.[0];
      if (typeof fileSelected === "undefined") return;

      const reader = new FileReader();
      reader.onloadend = () => {
         seAvatarUrl(reader.result);
      };
      if (fileSelected.type.match(/image.*/)) {
         setAvatarFile(fileSelected);
         reader.readAsDataURL(fileSelected);
      }
   };

   const formik = useFormik({
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      validateOnMount: false,
      initialValues: {
         username: userInfo?.username || "",
         birthDay: userInfo?.birthDay || null,
         firstName: userInfo?.firstName || "",
         lastName: userInfo?.lastName || "",
         email: userInfo?.email || "",
         phoneNumber: userInfo?.phoneNumber || "",
         gender: userInfo?.gender,
      },
      validationSchema: Yup.object({
         username: Yup.string().required("* Required"),
         firstName: Yup.string().required("* Required"),
         lastName: Yup.string().required("* Required"),
         email: Yup.string().required("* Required").email("Invalid email"),
         phoneNumber: Yup.string().matches(
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            "Invalid phone number"
         ),
      }),
      onSubmit: async (values: any) => {
         try {
            const result: any = () => {};
            result.then((data: any) => {
               if (data.error) {
                  toast.error(data?.error?.message || "Update Fail");
                  return;
               }
               //
               toast.success(data.message || "Update Successfully");
            });
         } catch (error) {
            toast.error("Update Fail");
         }
      },
   });

   return (
      <div className="relative h-full p-4">
         <FullPageSpiner isLoading={isLoading} />

         <div className="flex justify-between my-4">
            <h3 className="font-semibold">Thông tin Tài khoản</h3>
         </div>

         <div className="grid grid-cols-4 border border-gray-300 bg-white rounded-xl p-6 sm:p-12">
            <div className="col-span-4 md:col-span-1 mb-8">
               <div className="relative aspect-square max-h-40 mx-auto mb-5">
                  <img
                     src={avatarUrl || userInfo?.avatar || defaultAvatar}
                     alt="user-avatar"
                     className="absolute rounded-full w-full h-full object-cover"
                  ></img>

                  <div className="absolute flex items-center justify-center h-full w-full">
                     <input
                        id="input-avatar"
                        type="file"
                        className="hidden"
                        name="avatar"
                        accept="image/*"
                        onChange={handleSelectFile}
                     ></input>
                     <label
                        htmlFor="input-avatar"
                        className="flex items-center justify-center bg-gray-300 opacity-0 hover:opacity-50 rounded-full h-full w-full"
                     >
                        <BiImageAdd size={50} className="text-gray-400" />
                     </label>

                     <label htmlFor="input-avatar" className="absolute right-1 bottom-1">
                        <AiOutlineEdit size={20} />
                     </label>
                  </div>
               </div>

               <div className="flex justify-center mb-5">
                  <div className="me-5">
                     <input
                        id="male-check-box"
                        type="radio"
                        name="gender"
                        className="accent-primary-300 me-2"
                        checked={GENDERS.male === formik.values.gender}
                        onChange={() => {
                           formik.setFieldValue("gender", GENDERS.male);
                        }}
                     ></input>
                     <label htmlFor="male-check-box">Nam</label>
                  </div>
                  <div className="me-5">
                     <input
                        id="fermale-check-box"
                        type="radio"
                        name="gender"
                        checked={GENDERS.fermale === formik.values.gender}
                        onChange={() => {
                           formik.setFieldValue("gender", GENDERS.fermale);
                        }}
                        className="accent-primary-300 me-2"
                     ></input>
                     <label htmlFor="fermale-check-box">Nữ</label>
                  </div>
               </div>
            </div>
            <form
               onSubmit={formik.handleSubmit}
               className="col-span-4 md:col-span-3 flex justify-center sm:px-6"
            >
               <div className="flex flex-col w-full max-w-4xl gap-y-6">
                  <div className="flex flex-wrap sm:flex-nowrap w-full gap-x-8 gap-y-6">
                     <div className="w-full sm:w-1/2">
                        <label
                           htmlFor="input-username"
                           className="line-clamp-1 text-base font-semibold mb-1"
                        >
                           Tên đăng nhập{" "}
                           {formik.errors.username && formik.touched.username && (
                              <i className="text-sm text-red-500">
                                 {formik.errors.username.toString()}
                              </i>
                           )}
                        </label>

                        <input
                           id="input-username"
                           name="username"
                           className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                           value={formik.values.username}
                           onChange={formik.handleChange}
                        ></input>
                     </div>

                     <div className="w-full sm:w-1/2">
                        <label
                           htmlFor="input-birthDay"
                           className="line-clamp-1 text-base font-semibold mb-1"
                        >
                           Ngày sinh
                        </label>
                        <input
                           id="input-birthDay"
                           type="date"
                           name="birthDay"
                           className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                           value={
                              formik.values.birthDay
                                 ? format(new Date(formik.values.birthDay), "yyyy-MM-dd")
                                 : ""
                           }
                           onChange={formik.handleChange}
                        ></input>
                     </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-x-8 gap-y-6 w-full">
                     <div className="w-full sm:w-1/2">
                        <label
                           htmlFor="input-firstName"
                           className="line-clamp-1 text-base font-semibold mb-1"
                        >
                           Họ{" "}
                           {formik.errors.firstName && formik.touched.firstName && (
                              <i className="text-sm text-red-500">
                                 {formik.errors.firstName.toString()}
                              </i>
                           )}
                        </label>
                        <input
                           name="firstName"
                           id="input-firstName"
                           className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                           value={formik.values.firstName}
                           onChange={formik.handleChange}
                        ></input>
                     </div>

                     <div className="w-full sm:w-1/2">
                        <label
                           htmlFor="input-lastName"
                           className="line-clamp-1 text-base font-semibold mb-1"
                        >
                           Tên
                        </label>
                        <input
                           name="lastName"
                           id="input-lastName"
                           className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                           value={formik.values.lastName}
                           onChange={formik.handleChange}
                        ></input>
                     </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap w-full gap-x-8 gap-y-6">
                     <div className="w-full sm:w-1/2">
                        <label
                           htmlFor="input-email"
                           className="line-clamp-1 text-base font-semibold mb-1"
                        >
                           Email{" "}
                           {formik.errors.email && formik.touched.email && (
                              <i className="text-sm text-red-500">
                                 {formik.errors.email.toString()}
                              </i>
                           )}
                        </label>
                        <input
                           name="email"
                           id="input-email"
                           className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                           onChange={formik.handleChange}
                           value={formik.values.email}
                        ></input>
                     </div>

                     <div className="w-full sm:w-1/2">
                        <label
                           htmlFor="input-phone"
                           className="line-clamp-1 text-base font-semibold mb-1"
                        >
                           Số điện thoại{" "}
                           {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                              <i className="text-sm text-red-500">
                                 {formik.errors.phoneNumber.toString()}
                              </i>
                           )}
                        </label>
                        <input
                           id="input-phone"
                           name="phoneNumber"
                           className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                           onChange={formik.handleChange}
                           value={formik.values.phoneNumber}
                        ></input>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-4 w-full">
                     <PrimaryButton
                        content="Cập nhật"
                        type="submit"
                        icon={<BsUpload className="text-xl me-2" />}
                     />

                     <SecondaryButton
                        content="Đổi mật khẩu"
                        type="button"
                        icon={<AiOutlineKey className="text-xl me-2" />}
                     />
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}
export default Profile;
