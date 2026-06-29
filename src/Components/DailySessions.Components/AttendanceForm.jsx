import { useState, useEffect } from "react";

export default function AttendanceForm({ group, onClose, onSave }) {
      const existingRecord = group.attendance?.[0] || {};
const [firstBreak, setFirstBreak] = useState(existingRecord.firstBreak || false);
const [secondBreak, setSecondBreak] = useState(existingRecord.secondBreak || false);
const [delay, setDelay] = useState(existingRecord.delay || "");
  const [endTime, setEndTime] = useState("");
  const [hasBreak, setHasBreak] = useState(false);
  const [status, setStatus] = useState(existingRecord.status || "Present");
  const [notes, setNotes] = useState(existingRecord.notes || "");

  const convertTo12HourFormat = (time24) => {
    if (!time24) return "";

    let [hours, minutes] = time24.split(":").map(Number);

    let hours12 = hours % 12 || 12;

    let formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes}`;
  };

  useEffect(() => {
    if (group.session_start_time && group.hours_per_session) {
      const [startH, startM] = group.session_start_time.split(":").map(Number);
      const duration = parseFloat(group.hours_per_session);
      const totalMinutes = startH * 60 + startM + duration * 60;
      const endH = Math.floor(totalMinutes / 60) % 24;
      const endM = totalMinutes % 60;
      setEndTime(
        `${endH.toString().padStart(2, "0")}:${endM.toString().padStart(2, "0")}`,
      );
    }
  }, [group]);

  useEffect(() => {
  document.body.style.overflow = "hidden"; // منع التمرير
  return () => {
    document.body.style.overflow = "unset"; // إرجاع التمرير عند الإغلاق
  };
}, []);

const handleSave = () => {
  const duration = parseFloat(group.hours_per_session);
  
  const attendanceData = {
    id: existingRecord.id || Date.now(),
    status,
    delay: status === "Delayed" ? delay : 0,
    notes,
    date: existingRecord.date || new Date().toISOString(),
  };

  if (duration >= 5) {
    attendanceData.firstBreak = firstBreak;
    attendanceData.secondBreak = secondBreak;
  } else {
    attendanceData.hasBreak = firstBreak; 
  }

  onSave(group.id, attendanceData);
  onClose();
};
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-10 overflow-hidden">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-lg max-h-full flex flex-col overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">
            {group.group_name} - Attendance
          </h2>

          {/* حالة المدرس */}
          <label className="block mb-2 font-medium">Instructor Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="Present">Present</option>
            <option value="Delayed">Delayed</option>
            <option value="Absent">Absent</option>
          </select>

          {status === "Delayed" && (
            <input
              type="number"
              value={delay} 
              onChange={(e) => setDelay(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="Delay time in minutes"
            />
          )}

          <div className="flex justify-between mb-4 text-sm bg-gray-50 p-3 rounded font-semibold">
            <p>Start: {convertTo12HourFormat(group.session_start_time)}</p>
            <p>End: {convertTo12HourFormat(endTime)}</p>
          </div>

          <div className="mb-4">
            {parseFloat(group.hours_per_session) >= 5 ? (
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={firstBreak} onChange={(e) => setFirstBreak(e.target.checked)} /> 1st Break
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={secondBreak} onChange={(e) => setSecondBreak(e.target.checked)} /> 2nd Break
                </label>
              </div>
            ) : (
<label className="flex items-center gap-2 mb-4">
    <input 
      type="checkbox" 
      checked={firstBreak} 
      onChange={(e) => setFirstBreak(e.target.checked)} 
    /> 
    Break Taken (30 mins)
  </label>
            )}
          </div>

          <label className="block mb-2 font-medium">Session Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter session notes, key topics covered, student performance, etc."
            className="w-full border p-3 rounded-lg min-h-24 mb-4 resize-none"
          />

          <div className="flex gap-3 shrink-0">
            <button
              onClick={onClose}
              className="flex-1 border py-2 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-black text-white py-2 rounded-lg font-medium"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
