import { HiCalendar, HiMiniAcademicCap, HiMiniUserGroup } from "react-icons/hi2";
import { useGroups } from "../../context/GroupContext";
import { HiUserCircle } from "react-icons/hi";
export default function DashboardState() {
  const { groups, groupsToday } = useGroups();

          const today = new Date();
    const dayName = today.toLocaleString('en-US', { weekday: 'long' });
    const groupstoday = groupsToday(dayName);
  const totalStudentsCount = groups.reduce(
    (acc, group) => acc + (Number(group.number_of_students) || 0),
    0,
  );

  const totalInstructorsCount = new Set(groups.map((g) => g.instructor)).size;
  console.log(totalStudentsCount);
  console.log(totalInstructorsCount);
  console.log(groups?.length);

const arry = [
  {
    name: "Total Groups",
    num: groups?.length || 0,
    icon: <HiMiniUserGroup className="text-blue-600 size-6" />, 
  },
  {
    name: "Total Students",
    num: totalStudentsCount || 0,
    icon: <HiUserCircle className="text-purple-600 size-6" />,
  },
  {
    name: "Total Instructors",
    num: totalInstructorsCount || 0,
    icon: <HiMiniAcademicCap className="text-orange-600 size-6" />,
  },
  {
    name: "Today's Sessions",
    num: groupstoday?.length || 0,
    icon: <HiCalendar className="text-green-600 size-6" />,
  },
];

  const convertTo12HourFormat = (time24) => {
    if (!time24) return "";

    let [hours, minutes] = time24.split(":").map(Number);

    let hours12 = hours % 12 || 12;

    let formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes}`;
  };
  return (
    <>
<div className="p-4 md:p-10"> 
  <div>
    <p className="text-[20px] md:text-[22px] font-bold mb-2">Dashboard Overview</p>
    <p className="text-sm md:text-base">Welcome to the Training & Group Management System</p>
  </div>
  
  <div className="grid pt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {arry.map((el, index) => (
      <div key={index} className="border p-4 border-gray-300 rounded-lg shadow-lg">
        <div className="pb-6 md:pb-10 flex justify-between">
          <p className="text-[18px] md:text-[20px] font-bold">{el.name}</p>
          <p>{el.icon}</p>
        </div>
        <p className="text-[20px] font-bold text-center">{el.num}</p>
      </div>
    ))}
  </div>

  <div className="pt-10 md:pt-20">
    <p className="text-[20px] md:text-[22px] font-bold">Today's Sessions</p>
    <div className="grid pt-10 grid-cols-1 gap-5">
      {groupstoday.map((el, index) => (
        <div key={index} className="flex  md:flex-row justify-between border p-4 border-gray-300 rounded-lg shadow-lg gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-4 items-center">
              <p className="text-[18px] md:text-[20px] font-semibold">{el.group_name}</p>
              <span className="text-[14px] px-2 border rounded-lg">{el.number_of_students} students</span>
            </div>
            <p className="text-sm md:text-base">Instructor: {el.instructor}</p>
            <div className="flex gap-4 md:gap-10 text-sm md:text-base">
              <p>{convertTo12HourFormat(el.session_start_time)} {el.session_start_time > "12:00" ? "PM" : "AM"}</p>
              <span>{el.hours_per_session}h per session</span>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2 pt-2  md:border-t-0 md:pt-0">
            {el.days.map((day, idx) => (
              <span key={idx} className="px-2 py-1 border rounded-lg max-h-max text-[12px] bg-gray-50">
                {day}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </>
  );
}
