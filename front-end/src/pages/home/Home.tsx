import { Select, Carousel } from "antd";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import { useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoAddCircleOutline, IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CarCard } from "./components/CarCard";
import PaginationCustom from "components/ui/pagination/PaginationCustom";
import { CiLocationOn } from "react-icons/ci";
import { BsBookmark, BsJournalCheck } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import { format } from "date-fns";
import { AiOutlineEye } from "react-icons/ai";

function Home() {
   const refs: any = useRef();
   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [statusFilter, setStatusFilter] = useState([]);
   const [search, setSearch] = useState("");
   const [currentItem, setCurrentItem] = useState(0);

   const cars: Array<any> = [
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 1 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 3 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
      {
         model: "Cx8",
         name: "Mazda CX-8 Premium AWD 2 cầu 2022",
         thumbnail:
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
         images: [
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:34_7345582f-2130-40b1-8aca-46150551f9eb.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:36_459021eb-dfa4-4f24-80f7-7703a511be16.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:39_5c5941f1-e412-4d45-b5a4-bd6268fe6ac4.webp",
            "https://cdn.vucar.vn/737a7064-bfb6-41db-b92d-169a324fc0cb_2023-09-20T07:46:51_672f0285-783d-4122-84e1-05971b741ebe.webp",
         ],
         score: 200,
         sku: "ASMDNM",
         km: 31000,
         space: 4,
         location: "TP.HCM",
         inspections: [{}, {}, {}, {}],
      },
   ];

   const handleSearch = () => {
      //
   };

   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };

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
                     { label: "Tất cả", value: 0 },
                     { label: "Chưa kiểm duyệt", value: 1 },
                     { label: "Đã kiểm duyệt", value: 2 },
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
         <div className="grid grid-cols-12 gap-4 min-h-[900px]">
            <div className="col-span-5 flex flex-col gap-3">
               {cars?.map((item, idx) => {
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
                        <h2 className="font-semibold inline-block">{cars[currentItem].name}</h2>
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

                     <div className="flex">
                        <PrimaryButton content="Kiểm định" fontSize="text-lg" className="w-full" />
                        <button className="ps-3">
                           <BsBookmark size={30} className="text-yellow-400 font-bold" />
                        </button>
                     </div>
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
                           <p>
                              Điểm đánh giá:{" "}
                              <span className="font-semibold">
                                 {cars[currentItem].score + " / 223"}{" "}
                              </span>
                           </p>
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

                        {cars[currentItem]?.inspections?.map((inspectn: any, id: number) => {
                           return (
                              <div key={id} className="flex justify-between border p-4 mb-2">
                                 <div>
                                    <p>
                                       Ngày kiểm định:{" "}
                                       <span className="font-semibold">
                                          {format(new Date(), "dd-MM-yyyy")}
                                       </span>
                                    </p>
                                    <p>
                                       Người thực hiện:{" "}
                                       <span className="font-semibold">{"thanh123"}</span>
                                    </p>
                                 </div>
                                 <div className="flex gap-4 items-center">
                                    <h4>200 / 223</h4>
                                    <AiOutlineEye size={25} color="#2797f3" />
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div>
            <PaginationCustom
               list={200}
               pageIndex={1}
               pageSize={10}
               // setPageSize={}
               // setPageIndex={}
            />
         </div>
      </div>
   );
}
export default Home;
