import { useEffect, useState } from "react";
import { useGroups } from "../../context/GroupContext";

export default function CreateGroupForm({ opn, setopn, groupToEdit }) {
  const { addGroup, updateGroup } = useGroups(); // افترضنا وجود دالة updateGroup في الـ Context

  const [formData, setFormData] = useState({
    group_name: "",
    instructor: "",
    number_of_students: "",
    location: "Nasr City",
    start_date: "",
    duration_months: "",
    days: [],
    session_start_time: "",
    hours_per_session: "",
  });

  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const locations = ["Nasr City", "Alexandria", "Dokki", "Online"];

  // ملء الفورم عند فتحها للتعديل
  useEffect(() => {
    if (groupToEdit) {
      setFormData(groupToEdit);
    } else {
      setFormData({
        group_name: "",
        instructor: "",
        number_of_students: "",
        location: "Nasr City",
        start_date: "",
        duration_months: "",
        days: [],
        session_start_time: "",
        hours_per_session: "",
      });
    }
  }, [groupToEdit, opn]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        days: checked ? [...prev.days, value] : prev.days.filter((d) => d !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupToEdit) {
      updateGroup(formData); // تعديل
    } else {
      addGroup({ ...formData, id: Date.now() }); // إضافة جديد
    }
    setopn(false);
  };

  useEffect(() => {
    if (opn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [opn]);

  if (!opn) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg lg:max-h-full md:max-h-full max-h-full flex flex-col overflow-hidden">
<div className="shrink-0  px-4 py-5">
      <h2 className="text-xl font-bold mb-1">
        {groupToEdit ? "Edit Training Group" : "Create New Training Group"}
      </h2>
      <p className="text-gray-500 text-sm">
        {groupToEdit ? "Update the details below." : "Fill in the details below to create a new training group."}
      </p>
    </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto lg:px-8 px-4 py-2 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Name *</label>
            <input required name="group_name" value={formData.group_name} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instructor *</label>
            <input required name="instructor" value={formData.instructor} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Number of Students *</label>
            <input required type="number" name="number_of_students" value={formData.number_of_students} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <select name="location" value={formData.location} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg">
              {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date *</label>
              <input required type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration (Months) *</label>
              <input required type="number" name="duration_months" value={formData.duration_months} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Days per Week *</label>
            <div className="grid grid-cols-2 gap-2">
              {daysList.map((day) => (
                <label key={day} className="flex items-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    name="days" 
                    value={day} 
                    checked={formData.days.includes(day)} 
                    onChange={handleChange} 
                    className="accent-black w-4 h-4" 
                  /> {day}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Session Start Time *</label>
              <input required type="time" name="session_start_time" value={formData.session_start_time} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hours per Session *</label>
              <input required type="number" name="hours_per_session" value={formData.hours_per_session} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-lg" />
            </div>
          </div>

          <div className="flex justify-between gap-3 py-4">
            <button type="button" onClick={() => setopn(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              {groupToEdit ? "Save Changes" : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}