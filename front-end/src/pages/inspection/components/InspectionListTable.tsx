import { Table, Tag } from "antd";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { BsEye } from "react-icons/bs";

type PropsType = {
   pageIndex: number;
   setPageIndex: Function;
   pageSize: number;
   setPageSize: Function;
   handleSearch: Function;
   data: any;
};
function InspectionListTable({
   pageIndex,
   setPageIndex,
   pageSize,
   setPageSize,
   handleSearch,
   data,
}: PropsType) {
   const columns: any = [
      {
         title: "STT",
         dataIndex: "index",
         sorter: (a: any, b: any) => a.index - b.index,
         width: "100px",
         sortDirections: ["descend", "ascend"],
      },
      {
         title: "Mã kiểm định",
         dataIndex: "inspectCode",
      },
      {
         title: "Tên xe",
         dataIndex: "carName",
      },
      {
         title: "Model",
         dataIndex: "model",
      },
      {
         title: "Điểm",
         dataIndex: "score",
      },
      {
         title: "Ngày kiểm định",
         dataIndex: "createdAt",
      },
      {
         title: "Hoạt động",
         dataIndex: "action",
         width: "120px",
      },
   ];

   const isLoading = false;

   const handleChangePageIndex = (_page = 1) => {
      setPageIndex(_page);
   };
   const handleChangePageSize = (_pageSize = 5) => {
      setPageSize(_pageSize);
   };

   const members = data?.items?.map((item: any, id: number) => {
      return {
         index: id + 1,
         key: id,
         inspectCode: <p className="line-clamp-2">{item?.inspectCode}</p>,
         carName: <p className="line-clamp-2">{item?.car?.name}</p>,
         model: <p className="line-clamp-2">{item?.car?.model}</p>,
         score: (
            <p className="line-clamp-2">
               {item?.score}/ {item?.totalScore}
            </p>
         ),
         createdAt: (
            <p className="line-clamp-2">
               {item.createdAt ? format(new Date(item.createdAt), "dd-MM-yyyy") : "-"}
            </p>
         ),
         action: (
            <div className="flex justify-center">
               <Link to={`/inspect-result/${item.inspectCode}`}>
                  <BsEye size={24} className="text-sky-500" />
               </Link>
            </div>
         ),
      };
   });

   if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

   return (
      <div className="p-4 rounded-lg border border-gray-300 bg-white">
         <div className="overflow-x-scroll bg-white">
            <Table columns={columns} dataSource={members} pagination={false} />
         </div>
         <PaginationCustom
            list={data?.count || 0}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={(_pageSize: number) => handleChangePageSize(_pageSize)}
            setPageIndex={(_page: number) => handleChangePageIndex(_page)}
         ></PaginationCustom>
      </div>
   );
}
export default InspectionListTable;
