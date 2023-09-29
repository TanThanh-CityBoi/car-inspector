import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import UsersTable from "./components/UsersTable";
import { IoAddCircleOutline } from "react-icons/io5";

function Members() {
   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [search, setSearch] = useState("");

   const handleSearch = () => {
      //
   };
   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };

   useEffect(() => {
      //
   }, [pageIndex, pageSize]);

   return (
      <div className="p-4">
         <div className="mb-4">
            <Breadcrumb
               items={[{ title: "Quản lý thành viên" }, { title: "Cộng đồng SEO" }]}
            ></Breadcrumb>
         </div>
         <div className="mb-4">
            <h3 className="font-semibold mb-4">Vucar</h3>

            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 mb-3">
               <div className="flex sm:basis-2/3 sm:flex-nowrap flex-wrap gap-2 w-full">
                  <div className="flex w-full rounded-md border border-gray-300 bg-white items-center py-1.5">
                     <input
                        className="bg-white pl-3 w-full"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setSearch(e.target.value)
                        }
                        onKeyDown={handleEnter}
                     ></input>
                     <GoSearch size={20} className="mx-3" />
                  </div>
                  <PrimaryButton
                     className="w-full sm:w-max !py-1.5 px-5"
                     content="Tìm kiếm"
                     onClick={handleSearch}
                  ></PrimaryButton>
               </div>

               <div className="w-full sm:w-max">
                  <Link to="/quan-ly-thanh-vien/them-thanh-vien">
                     <PrimaryButton
                        className="w-full !py-1.5 px-5"
                        content="Thêm mới"
                        icon={<IoAddCircleOutline size={20} className="mr-1" />}
                     ></PrimaryButton>
                  </Link>
               </div>
            </div>
         </div>
         <UsersTable
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleSearch={handleSearch}
            memberType={0} // 0: condongseo account  1: admin congdongseo
         />
      </div>
   );
}
export default Members;
