import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import InspectionListTable from "./components/InspectionListTable";
import { carAPI } from "api/car.api";
import useSWR, { mutate } from "swr";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";

function InspectionList() {
   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [search, setSearch] = useState("");

   const { data, isLoading, error } = useSWR("cars/inspection-history", () =>
      carAPI.getInspectHistory({
         page: pageIndex,
         limit: pageSize,
         search,
      })
   );
   const handleSearch = () => {
      mutate("cars/inspection-history");
   };
   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };

   useEffect(() => {
      mutate("cars/inspection-history");
   }, [pageIndex, pageSize]);

   return (
      <div className="p-4 min-h-[calc(100vh-120px)]">
         <div className="flex justify-between my-4">
            <div className="basis-1/3">
               <h3 className="font-semibold mb-4">Kết quả kiểm định</h3>
            </div>

            <div className="flex flex-wrap justify-end gap-2 w-full">
               <div className="w-1/2 rounded-md border border-gray-300 bg-white items-center py-3">
                  <input
                     className="bg-white pl-3 w-full"
                     value={search}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                     }
                     onKeyDown={handleEnter}
                  ></input>
               </div>
               <PrimaryButton
                  className="!py-3 px-5"
                  content="Tìm kiếm"
                  icon={<GoSearch size={20} className="mx-3" />}
                  onClick={handleSearch}
               ></PrimaryButton>
            </div>
         </div>

         <FullPageSpiner isLoading={isLoading} />

         <InspectionListTable
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleSearch={handleSearch}
            data={data?.data}
         />
      </div>
   );
}
export default InspectionList;
