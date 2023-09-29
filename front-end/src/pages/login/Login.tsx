import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import InputCustom from "components/ui/input/InputCustom";
import SecondaryButton from "components/ui/button/SecondaryButton";
import bg from "assets/images/background/bg_referral.webp";
import { userAPI } from "api/user.api";
import { toast } from "react-toastify";
import { LOCAL_STORAGE } from "helper/storage.helper";

export default function Login() {
   const navigate = useNavigate();
   const [showPass, setShowPass] = useState<boolean>(false);
   const isLogedIn = false;

   async function handleLogin(values: any) {
      try {
         const loginRes = await userAPI.login(values);
         toast.success("Login successfully!");
         LOCAL_STORAGE.setAccessToken(loginRes?.data?.accessToken);
         LOCAL_STORAGE.setRefreshToken(loginRes?.data?.refreshToken);

         navigate("/home");
      } catch (error: any) {
         toast.error(error?.message || "Login fail!");
      }
   }

   const formik = useFormik({
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: false,
      initialValues: {
         username: "",
         password: "",
      },
      validationSchema: Yup.object({
         username: Yup.string().required("Username is Required"),
         password: Yup.string()
            .required("Password is Required")
            .matches(/^.{6,}$/, "Password must be minimum 6 characters"),
      }),
      onSubmit: (values: { username: string; password: string }) => {
         handleLogin(values);
      },
   });

   useEffect(() => {
      const accessToken = LOCAL_STORAGE.getAccessToken();
      if (accessToken) navigate("/home");
   }, []);

   if (isLogedIn) return <Navigate to="/" />;

   return (
      <div className="relative h-full">
         <img
            className="absolute object-cover opacity-30 h-full w-full"
            src={bg}
            alt="backgoung"
         ></img>
         <div className="flex justify-center items-center h-full min-w-[200px] px-5">
            <div className="bg-[#FFFFFF] opacity-90 border rounded-md shadow-lg w-[450px] h-max px-8 py-12">
               <p className="text-center sm:text-2xl text-xl font-semibold mb-8">Đăng Nhập</p>
               <div>
                  <form onSubmit={formik.handleSubmit}>
                     <div className="mb-5">
                        <InputCustom
                           placeholder="Tên đăng nhập"
                           type="text"
                           onChange={formik.handleChange}
                           name="username"
                        ></InputCustom>
                        {formik.errors.username && formik.touched.username && (
                           <i className="text-sm text-red-500">{formik.errors.username}</i>
                        )}
                     </div>

                     <div className="relative mb-5">
                        <InputCustom
                           placeholder="Mật khẩu"
                           type={showPass === true ? "text" : "password"}
                           onChange={formik.handleChange}
                           name="password"
                        ></InputCustom>
                        {formik.errors.password && formik.touched.password && (
                           <i className="text-sm text-red-500">{formik.errors.password}</i>
                        )}
                        <button
                           className="absolute right-2 top-3 text-gray-900"
                           type="button"
                           onClick={() => setShowPass(!showPass)}
                        >
                           {showPass ? <BiShow /> : <BiHide />}
                        </button>
                     </div>

                     <div className="flex flex-wrap justify-between mb-5">
                        <div>
                           <input
                              id="save-password"
                              type="checkbox"
                              className="me-2"
                              defaultChecked
                           ></input>
                           <label htmlFor="save-password" className="text-base text-gray-700">
                              Lưu tài Khoản
                           </label>
                        </div>
                        <div>
                           <Link to="/login" className="text-base text-primary-700 hover:underline">
                              Quên mật khẩu
                           </Link>
                        </div>
                     </div>
                     <div className="mb-5">
                        <PrimaryButton
                           className="w-full justify-center mb-4"
                           content="Đăng Nhập"
                           type="submit"
                        ></PrimaryButton>

                        <SecondaryButton
                           content="Đăng ký"
                           className="w-full"
                           type="button"
                        ></SecondaryButton>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
