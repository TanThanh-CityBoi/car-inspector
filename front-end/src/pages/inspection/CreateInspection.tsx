import { useState } from "react";
import { useParams } from "react-router-dom";
import { Anchor, Checkbox } from "antd";
import useSWR from "swr";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import SecondaryButton from "components/ui/button/SecondaryButton";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import PrimaryInput from "components/ui/input/PrimaryInput";
import { carAPI } from "api/car.api";
import { toast } from "react-toastify";

function CreateInspection() {
   const { sku } = useParams();

   const [failList, setFailList] = useState<Array<any>>([]);
   const [failNoteList, setFailNoteList] = useState<Array<any>>([]);

   const { data, isLoading } = useSWR("cars/detail", () => carAPI.getOne(sku || ""));
   const { data: inspectCriteriaRes } = useSWR("cars/inspectCriteria", () => carAPI.getCriteria());

   const inspectCriteria = inspectCriteriaRes?.data;
   const carInfo = data?.data;

   const handleSubmit = async () => {
      try {
         const unacceptList: any = [];
         failList?.map((failItem, id) => {
            if (!failNoteList[id]) {
               throw new Error("You have to fillin all notes of unacceptable criteria");
            }
            unacceptList.push({
               id: failItem,
               note: failNoteList[id],
            });
         });

         const result = await carAPI.createInspection({
            unacceptList,
            carId: carInfo?.id,
         });

         toast.success(result?.data?.message || "The inspect result has been saved");
      } catch (error: any) {
         toast.error(error?.message || "Something went wrong");
      }
   };

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
               <p>Mã xe: {carInfo?.sku}</p>
               <p>Model: {carInfo?.model}</p>
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
                                    const onChange = (e: any) => {
                                       if (e.target.checked) {
                                          const rmId = failList.indexOf(property?.id);
                                          const newListFail = failList.filter(
                                             (val, idx) => idx !== rmId
                                          );

                                          const newListNote = failNoteList.filter(
                                             (val, idx) => idx !== rmId
                                          );

                                          setFailList(newListFail);
                                          setFailNoteList(newListNote);
                                       } else {
                                          setFailList([...failList, property?.id]);
                                          setFailNoteList([...failNoteList, ""]);
                                       }
                                    };
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
                                                <Checkbox
                                                   defaultChecked={true}
                                                   checked={checked}
                                                   onChange={onChange}
                                                   className={`${!checked ? "text-red-500" : ""}`}
                                                >
                                                   {checked ? "Đạt yêu cầu" : "Không đạt"}
                                                </Checkbox>
                                             </div>
                                          </div>
                                          {!checked && (
                                             <div className="mb-4">
                                                <PrimaryInput
                                                   placeholder="Ghi chú"
                                                   onChange={(e: any) => {
                                                      const noteList = failNoteList;
                                                      noteList[failList.indexOf(property?.id)] =
                                                         e.target.value;
                                                      setFailNoteList(noteList);
                                                   }}
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

         <div className="flex gap-4 py-5">
            <PrimaryButton
               content="Lưu kết quả"
               onClick={() => handleSubmit()}
               className="!px-12 !py-3"
            />
            <SecondaryButton content="Hủy bỏ" className="!px-12 !py-3" />
         </div>
      </div>
   );
}
export default CreateInspection;
