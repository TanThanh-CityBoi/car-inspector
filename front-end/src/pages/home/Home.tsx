import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Select, Carousel } from "antd";
import useSWR, { mutate } from "swr";
import { format } from "date-fns";

import { IoAddCircleOutline, IoWarningOutline } from "react-icons/io5";
import { BsBookmark, BsJournalCheck } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { toast } from "react-toastify";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { CarCard } from "./components/CarCard";
import { carAPI } from "api/car.api";
import PermissionGuard from "components/permission/PermissionGuard";
import { ROLES } from "utils/constant";

function Home() {
   const refs: any = useRef();
   const navigate = useNavigate();

   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [statusFilter, setStatusFilter] = useState([]);
   const [search, setSearch] = useState("");
   const [currentItem, setCurrentItem] = useState(0);

   const { data, isLoading, error } = useSWR("cars/get-list", () =>
      carAPI.getList({
         page: pageIndex,
         limit: pageSize,
         search,
         status: statusFilter,
      })
   );
   const carsRes = data?.data;
   const cars = carsRes?.items;

   const handleSearch = () => {
      mutate("cars/get-list");
      setCurrentItem(0);
   };

   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };

   if (error) {
      toast.error("Something went wrong!");
   }

   useEffect(() => {
      mutate("cars/get-list");
      setCurrentItem(0);
   }, [pageSize, pageIndex, statusFilter]);

   return (
      <div className="m-3">
         <div className="flex justify-between flex-wrap sm:flex-nowrap bg-white rounded-md shadow-sm gap-2 p-6 mb-3">
            <div className="flex sm:basis-2/3 sm:flex-nowrap flex-wrap gap-2 w-full">
               <Select
                  id="select-status"
                  size="large"
                  allowClear
                  placeholder="Trạng thái"
                  className="w-full"
                  options={[
                     { label: "Chưa kiểm định", value: 0 },
                     { label: "Đã kiểm định", value: 1 },
                  ]}
                  onChange={(values) => {
                     setStatusFilter(values);
                  }}
               />
               <div className="flex w-full rounded-md border border-gray-300 bg-white items-center py-1.5">
                  <input
                     className="bg-white px-3 w-full"
                     value={search}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                     }
                     onKeyDown={handleEnter}
                  ></input>
               </div>

               <PrimaryButton
                  className="w-full sm:w-max !py-1.75 px-5"
                  content="Tìm kiếm"
                  icon={<GoSearch size={20} className="me-2" />}
                  onClick={handleSearch}
               ></PrimaryButton>
            </div>

            <div className="w-full sm:w-max">
               <Link to="/">
                  <PrimaryButton
                     className="w-full !py-1.75 px-5"
                     content="Đăng Kiểm"
                     icon={<IoAddCircleOutline size={20} className="mr-1" />}
                  ></PrimaryButton>
               </Link>
            </div>
         </div>

         <FullPageSpiner isLoading={isLoading} />

         {!(cars?.length && !isLoading && !error) ? (
            <div className="border p-6">
               <h5 className="text-center">Không có kết quả phù hợp</h5>
            </div>
         ) : (
            <div className="grid grid-cols-12 gap-4 min-h-[900px]">
               <div className="col-span-5 flex flex-col gap-3">
                  {cars?.map((item: any, idx: number) => {
                     return (
                        <div key={idx}>
                           <CarCard
                              model={item.model}
                              name={item.name}
                              thumbnail={item.thumbnail}
                              images={item.images}
                              score={item.score}
                              sku={item.sku}
                              km={item.km}
                              space={item.space}
                              location={item.location}
                              inspections={item.inspections}
                              isActive={currentItem === idx}
                              onClick={() => setCurrentItem(idx)}
                           />
                        </div>
                     );
                  })}
               </div>
               <div className="col-span-7 h-full">
                  <div className="h-[calc(100vh-120px)]  bg-white rounded-md shadow-md sticky top-3 p-6">
                     <div className="relative mb-5">
                        <div className="flex gap-4 items-center mb-4">
                           <h2 className="font-semibold inline-block">{cars[currentItem]?.name}</h2>
                           <span>
                              {cars[currentItem].inspections?.length ? (
                                 <BsJournalCheck size={30} className="text-[#87d068] font-bold" />
                              ) : (
                                 <IoWarningOutline size={30} className="text-[#f97316] font-bold" />
                              )}
                           </span>
                        </div>

                        <p className="mb-2">
                           <i>
                              Mã xe: <span className="font-semibold">{cars[currentItem].sku}</span>
                           </i>
                        </p>

                        <div className="flex gap-2 items-center mb-2">
                           <CiLocationOn />
                           <i>{cars[currentItem].location}</i>
                        </div>

                        <PermissionGuard roles={[ROLES.MECHANICAL]}>
                           <div className="flex">
                              <PrimaryButton
                                 content="Kiểm định"
                                 fontSize="text-lg"
                                 className="w-full"
                                 onClick={() => {
                                    navigate(`/create-inspect/${cars?.[currentItem]?.sku}`);
                                 }}
                              />
                              <button className="ps-3">
                                 <BsBookmark size={30} className="text-yellow-400 font-bold" />
                              </button>
                           </div>
                        </PermissionGuard>
                     </div>

                     <hr></hr>
                     <div className="overflow-y-scroll small-scrollbar h-[calc(100%-200px)]">
                        <div className=" my-5">
                           <div className="relative">
                              <Carousel ref={refs}>
                                 {cars[currentItem]?.images?.map((img: any, idx: number) => (
                                    <div key={idx} className="relative h-96">
                                       <img
                                          className="absolute h-full w-full object-cover"
                                          src={img}
                                          alt="slider.img"
                                       ></img>
                                    </div>
                                 ))}
                              </Carousel>
                              <button
                                 className="absolute hover:bg-gray-500 hover:opacity-50 h-full top-0 left-0 px-4"
                                 onClick={() => refs?.current?.prev()}
                              >
                                 <GrPrevious />
                              </button>
                              <button
                                 className="absolute hover:bg-gray-500 hover:opacity-50 h-full top-0 right-0 px-4"
                                 onClick={() => refs?.current?.next()}
                              >
                                 <GrNext />
                              </button>
                           </div>
                           <div className="pt-4">
                              <p>
                                 Model:{" "}
                                 <span className="font-semibold">{cars[currentItem].model}</span>
                              </p>
                              <p>
                                 Công tơ mét:{" "}
                                 <span className="font-semibold">{cars[currentItem].km} km</span>
                              </p>
                              <p>
                                 Chỗ ngồi:{" "}
                                 <span className="font-semibold">{cars[currentItem].space}</span>
                              </p>
                              {cars[currentItem]?.inspections?.[0] && (
                                 <p>
                                    Điểm đánh giá:{" "}
                                    <span className="font-semibold">
                                       {cars[currentItem]?.inspections?.[0]?.score + " / 223"}{" "}
                                    </span>
                                 </p>
                              )}
                              <p>
                                 kiểm định gần nhất:{" "}
                                 <span className="font-semibold">
                                    {format(new Date(), "dd-MM-yyyy")}
                                 </span>
                              </p>
                           </div>
                        </div>

                        <hr></hr>

                        <div className="mt-5">
                           <h3 className="mb-3">kết quả kiểm định</h3>

                           {!cars[currentItem]?.inspections?.length && (
                              <div className="p-4 border">
                                 <h5 className="text-center">Xe chưa được kiểm định</h5>
                              </div>
                           )}

                           {cars[currentItem]?.inspections?.map((inspection: any, id: number) => {
                              return (
                                 <div key={id} className="flex justify-between border p-4 mb-2">
                                    <div>
                                       <p>
                                          Ngày kiểm định:{" "}
                                          <span className="font-semibold">
                                             {inspection?.createdAt
                                                ? format(
                                                     new Date(inspection?.createdAt),
                                                     "dd-MM-yyyy"
                                                  )
                                                : "---"}
                                          </span>
                                       </p>
                                       <p>
                                          Người thực hiện:{" "}
                                          <span className="font-semibold">
                                             {inspection?.creator?.username}
                                          </span>
                                       </p>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                       <h4>
                                          {inspection?.score} / {inspection?.totalScore}
                                       </h4>
                                       <Link to={`/inspect-result/${inspection?.inspectCode}`}>
                                          <AiOutlineEye size={25} color="#2797f3" />
                                       </Link>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         <div>
            <PaginationCustom
               list={carsRes?.count || 0}
               pageIndex={pageIndex}
               pageSize={pageSize}
               setPageSize={setPageSize}
               setPageIndex={setPageIndex}
            />
         </div>
      </div>
   );
}
export default Home;
