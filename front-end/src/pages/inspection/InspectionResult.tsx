import { useNavigate, useParams } from "react-router-dom";
import { Anchor } from "antd";
import useSWR from "swr";

import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import PrimaryInput from "components/ui/input/PrimaryInput";
import { carAPI } from "api/car.api";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { format } from "date-fns";

function InspectionResult() {
   const { inspectCode } = useParams();
   const navigate = useNavigate();

   const {
      data: inspectResultRes,
      isLoading,
      error,
   } = useSWR("cars/inspectResult", () => carAPI.getInspectResult(inspectCode || ""));
   const { data: inspectCriteriaRes } = useSWR("cars/inspectCriteria", () => carAPI.getCriteria());

   const inspectCriteria = inspectCriteriaRes?.data;
   const carInfo = inspectResultRes?.data?.car || {};
   const failList = inspectResultRes?.data?.unsatisCriteria?.map((val: any) => val.criteriaId);
   const failNoteList = inspectResultRes?.data?.unsatisCriteria?.map((val: any) => val.content);

   if (error) {
      navigate("/404");
   }

   const getAnchorItems = () => {
      const parsedItems: any = [];
      inspectCriteria?.map((section: any, sectionId: number) => {
         if (section?.section) {
            parsedItems.push({
               key: `section-${sectionId}`,
               href: `#section-${sectionId}`,
               title: <h5>{section?.section}</h5>,
            });
         } else {
            section?.groups?.map((group: any, groupId: number) => {
               parsedItems.push({
                  key: `section-${sectionId}-${groupId}`,
                  href: `#section-${sectionId}-${groupId}`,
                  title: <h5>{group?.name}</h5>,
               });
            });
         }
      });
      return parsedItems;
   };

   if (isLoading) {
      return (
         <div>
            <FullPageSpiner isLoading={isLoading} />
         </div>
      );
   }

   return (
      <div className="h-max bg-white m-4 px-4">
         <div className="sticky top-0 flex justify-between bg-white z-50 items-center py-4">
            <div>
               <h3 className="font-semibold mb-3">{carInfo?.name}</h3>
               <div className="flex gap-x-20 gap-y-10">
                  <div>
                     <p className="mb-2">Mã xe: {carInfo?.sku}</p>
                     <p>Model: {carInfo?.model}</p>
                  </div>
                  <div>
                     <p className="mb-2">
                        Người kiểm định: {inspectResultRes?.data?.creator?.username}
                     </p>
                     <p>
                        Ngày kiểm định:{" "}
                        {inspectResultRes?.data?.createdAt
                           ? format(new Date(inspectResultRes?.data?.createdAt), "dd-MM-yyyy")
                           : ""}
                     </p>
                  </div>
               </div>
            </div>

            <div className="px-8">
               <h1 className="text-primary-500">
                  {223 - failList.length}
                  <span className="text-orange-500">/223</span>
               </h1>
            </div>
         </div>

         <hr></hr>

         <div className="grid grid-cols-12 pt-5">
            <div className="col-span-8">
               {inspectCriteria?.map((section: any, sectionId: number) => {
                  return (
                     <div
                        key={sectionId}
                        id={`section-${sectionId}`}
                        className={`${section?.section ? "border rounded-md p-4 mb-6" : ""}`}
                     >
                        <h3 className="font-semibold mt-2 mb-3">{section?.section}</h3>

                        {section?.groups?.map((group: any, groupId: number) => {
                           return (
                              <div
                                 key={groupId}
                                 id={`section-${sectionId}-${groupId}`}
                                 className={`${
                                    !section?.section ? "border rounded-md p-4 mb-6" : ""
                                 }`}
                              >
                                 {section?.section ? (
                                    <h5 className="font-semibold my-2">{group?.name}</h5>
                                 ) : (
                                    <h3 className="font-semibold mt-2 mb-3">{group?.name}</h3>
                                 )}

                                 {group?.properties?.map((property: any, propId: number) => {
                                    const checked = !failList?.includes(property?.id);
                                    return (
                                       <div key={propId}>
                                          <div className="flex justify-between py-2">
                                             <p
                                                className={`text-lg ${
                                                   !checked ? "text-red-500" : ""
                                                }`}
                                             >
                                                {property?.name}
                                             </p>
                                             <div>
                                                {checked ? (
                                                   <AiOutlineCheckCircle
                                                      size={30}
                                                      className="text-green-500"
                                                   />
                                                ) : (
                                                   <AiOutlineCloseCircle
                                                      size={30}
                                                      className="text-red-500"
                                                   />
                                                )}
                                             </div>
                                          </div>
                                          {!checked && (
                                             <div className="mb-4">
                                                <PrimaryInput
                                                   placeholder="Ghi chú"
                                                   value={
                                                      failNoteList?.[failList.indexOf(property.id)]
                                                   }
                                                />
                                             </div>
                                          )}
                                       </div>
                                    );
                                 })}
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
            </div>

            <div className="col-span-4 ps-5">
               <Anchor replace offsetTop={300} items={getAnchorItems()} />
            </div>
         </div>
      </div>
   );
}
export default InspectionResult;
