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
   memberType: number;
};
function MembersTable({
   pageIndex,
   setPageIndex,
   pageSize,
   setPageSize,
   handleSearch,
   memberType,
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
         title: "Họ Tên",
         dataIndex: "fullName",
      },
      {
         title: "Tên đăng nhập",
         dataIndex: "username",
      },
      {
         title: "Email",
         dataIndex: "email",
      },
      {
         title: "Vai trò",
         dataIndex: "role",
      },
      {
         title: "Ngày tạo",
         dataIndex: "createdDate",
         width: "120px",
      },
      {
         title: "Hoạt động",
         dataIndex: "action",
         width: "120px",
      },
   ];

   const listUsers: any = [];
   const isLoading = false;

   const handleChangePageIndex = (_page = 1) => {
      setPageIndex(_page);
   };
   const handleChangePageSize = (_pageSize = 5) => {
      setPageSize(_pageSize);
   };

   const members = listUsers?.items?.map((item: any, id: number) => {
      return {
         index: id + 1,
         key: id,
         fullName: <p className="line-clamp-2">{item.fullName}</p>,
         userName: <p className="line-clamp-2">{item.userName}</p>,
         email: <p className="line-clamp-2">{item.email}</p>,
         accountBalance: (
            <p>
               {memberType
                  ? new Intl.NumberFormat("vi").format(item.money || 0)
                  : new Intl.NumberFormat("vi").format(item.moneySurplus || 0)}{" "}
            </p>
         ),
         status: (
            <p className="line-clamp-2">
               {item.deleted_at !== null ? (
                  <Tag color="red">Deleted</Tag>
               ) : item.isVerifyEmail ? (
                  <Tag color="blue">Activated</Tag>
               ) : (
                  <Tag color="orange">InActive</Tag>
               )}
            </p>
         ),
         createdDate:
            memberType === 0 ? (
               <p className="line-clamp-2">
                  {item.createDate ? format(new Date(item.createDate), "dd-MM-yyyy") : "-"}
               </p>
            ) : (
               <p className="line-clamp-2">
                  {item.created_at ? format(new Date(item.created_at), "dd-MM-yyyy") : "-"}
               </p>
            ),
         action: (
            <div className="flex gap-4">
               <Link to={`/users/${item.username}`}>
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
            list={listUsers?.count || 0}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={(_pageSize: number) => handleChangePageSize(_pageSize)}
            setPageIndex={(_page: number) => handleChangePageIndex(_page)}
         ></PaginationCustom>
      </div>
   );
}
export default MembersTable;
