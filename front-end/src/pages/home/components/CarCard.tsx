import { Tag } from "antd";
import { format } from "date-fns";

export function CarCard(props: {
   model: string;
   name: string;
   thumbnail: string;
   images: Array<string>;
   score: number;
   sku: string;
   km: number;
   space: number;
   location: string;
   inspections: Array<any>;
   isActive?: boolean;
   onClick?: any;
}) {
   return (
      <div
         className={`h-[300px] flex gap-2 w-full rounded-md shadow-md ${
            props.isActive ? "border border-[#ea580c] bg-amber-50" : "bg-white"
         }`}
         onClick={() => props.onClick()}
      >
         <div className="relative h-full basis-1/2 rounded-s-md">
            <img
               className="absolutes h-full w-full object-cover rounded-s-md"
               src={props.thumbnail}
               alt="thumbnail.img"
            ></img>
         </div>
         <div className="basis-1/2 p-2">
            <div className="mb-3">
               <h3 className="font-semibold line-clamp-3 mb-3">{props.name}</h3>
               {props.inspections?.length ? (
                  <Tag color="#87d068">Số lần kiểm định: {props.inspections?.length}</Tag>
               ) : (
                  <Tag color="#f97316">Chưa Kiểm tra</Tag>
               )}
            </div>

            <hr></hr>

            <div className="py-3">
               <p>
                  Mã xe: <span className="font-semibold">{props.sku}</span>
               </p>
               <p>
                  Model: <span className="font-semibold">{props.model}</span>
               </p>
               <p>
                  Điểm đánh giá: <span className="font-semibold">{props.score + " / 223"} </span>
               </p>
               <p>
                  kiểm định gần nhất:{" "}
                  <span className="font-semibold">{format(new Date(), "dd-MM-yyyy")}</span>
               </p>
            </div>
         </div>
      </div>
   );
}
