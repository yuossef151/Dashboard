import { useState } from "react";
import CreateGroupForm from "./CreateGroupForm";
import { Pencil, Plus, Users } from "lucide-react";
import { useGroups } from "../../context/GroupContext";

export default function Groups() {
  const { groups } = useGroups();

  const [opn, setopn] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  const convertTo12HourFormat = (time24) => {
    if (!time24) return "";

    let [hours, minutes] = time24.split(":").map(Number);

    let hours12 = hours % 12 || 12;

    let formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes}`;
  };
  return (
    <>
      <div className="p-6 lg:p-10">
        <div>
          <div className="flex lg:flex-row md:flex-row md:justify-between flex-col gap-5 lg:gap-0 lg:justify-between">
            <div>
              <div className="text-[24px] mb-2 font-semibold flex gap-2">
                <Users className="w-8 h-8" /> <p>Group Management</p>
              </div>
              <p className="text-[#717182] text-[16px]">
                Create and manage training groups
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="flex items-center max-h-max gap-2 bg-black text-white py-3 px-4 rounded-2xl"
                onClick={() => {
                  setopn(true);
                }}
              >
                <Plus className="w-4 h-4" />
                Add New Group
              </button>
            </div>
          </div>

          <CreateGroupForm opn={opn} setopn={setopn} groupToEdit={editingGroup} />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4  lg:grid-cols-2 gap-3 lg:gap-5 pt-10">
          {groups.map((el, index) => {
            return (
              <div
                key={el.id}
                className="group relative lg:p-5 p-3 rounded-2xl border border-gray-400 hover:shadow-md transition-all"
              >
                <button
                onClick={() => {
                  setEditingGroup(el);
                  setopn(true);
                }}
                className="absolute top-4 cursor-pointer right-4 bg-black border shadow-lg p-2 rounded-full lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity"
              >
                <Pencil className="w-4 h-4 text-white" />
              </button>
                <div className="pb-5">
                  <p>{el.group_name}</p>
                  <p>Instructor: {el.instructor}</p>
                </div>
                <div className="border-t py-5">
                  <div className="flex justify-between">
                    <p>Students</p>
                    <p>{el.number_of_students}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Start Date</p>
                    <p>{el.start_date}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Duration</p>
                    <p>{el.duration_months}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Session Time</p>
                    <p>{convertTo12HourFormat(el.session_start_time)} {el.session_start_time>"12:00"?"PM":"AM"}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Session duration</p>
                    <p>{el.hours_per_session}</p>
                  </div>
                </div>
                <div className="border-t pt-5">
                  <p>Days per week</p>
                  <div className="flex flex-wrap gap-3  pt-2">
                    {el.days.map((el, index) => {
                      return (
                        <span key={index} className="px-1 text-center py-1 border rounded-lg  text-[12px]">
                          <p>{el}</p>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
