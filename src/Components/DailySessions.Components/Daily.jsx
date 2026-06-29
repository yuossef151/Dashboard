import { CalendarDays } from "lucide-react";
import { useGroups } from "../../context/GroupContext";
import { useState } from "react";
import AttendanceForm from "./AttendanceForm";

export default function Daily() {
    const [attOpen, setAttOpen] = useState(null);
    const {groupsToday  , addAttendanceRecord , saveAttendanceRecord} = useGroups();
        const today = new Date();
    const dayName = today.toLocaleString('en-US', { weekday: 'long' });
    const groupstoday = groupsToday(dayName);

const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowName = tomorrow.toLocaleString('en-US', { weekday: 'long' });

  const groupsTomorrow = groupsToday(tomorrowName);
  console.log("Groups active today:", groupstoday);

  console.log("Groups active :" , groupsTomorrow);
  
      const convertTo12HourFormat = (time24) => {
    if (!time24) return "";

    let [hours, minutes] = time24.split(":").map(Number);

    let hours12 = hours % 12 || 12;

    let formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes}`;
  };
  return (
    <>
      <div className="p-10">
<div className="flex gap-3 text-[20px] font-semibold mb-10">
    <CalendarDays className="w-8 h-8" />
    <p>Daily Session Tracker</p>
</div>
<div className="pt-10">
    <p className="text-[20px] font-semibold">today</p>

    <div>
        <div>
{
    groupstoday.map((el,index)=>{
        const hasAttendance = el.attendance && el.attendance.length > 0;
        return(
            <div key={index} className="mt-20 border p-5 rounded-2xl ">
<div className="flex justify-between pb-5">
                    <div>
                    <p className="text-[18px] font-semibold">{el.group_name}</p>
                    <p className="text-[16px]">Instructor: {el.instructor}•{el.number_of_students} students</p>
                </div>
                <div>
<p> Lecture time :{convertTo12HourFormat(el.session_start_time)} {el.session_start_time>"12:00"?"PM":"AM"}</p>
                </div>
</div>

<button 
  onClick={() => setAttOpen(el)}
  className={`w-full py-2 rounded-lg text-sm ${hasAttendance ? "bg-green-600" : "bg-blue-600"} text-white`}
>
  {hasAttendance ? "Edit Attendance" : "Add Attendance"}
</button>
            </div>
        )
    })
}
        </div>
        {attOpen && (
<AttendanceForm 
    group={attOpen} 
    onClose={() => setAttOpen(null)} 
    onSave={saveAttendanceRecord}
  />
)}
    </div>
</div>

<div className="pt-20">
  <p className="text-[20px] font-semibold">Tomorrow</p>
          <div>
          
{
    groupsTomorrow.map((el,index)=>{
        const hasAttendance = el.attendance && el.attendance.length > 0;
        return(
            <div key={index} className="mt-20 border p-5 rounded-2xl ">
<div className="flex justify-between pb-5">
                    <div>
                    <p className="text-[18px] font-semibold">{el.group_name}</p>
                    <p className="text-[16px]">Instructor: {el.instructor}•{el.number_of_students} students</p>
                </div>
                <div>
<p> Lecture time :{convertTo12HourFormat(el.session_start_time)} {el.session_start_time>"12:00"?"PM":"AM"}</p>
                </div>
</div>


            </div>
        )
    })
}
        </div>
</div>
      </div>
    </>
  )
}
