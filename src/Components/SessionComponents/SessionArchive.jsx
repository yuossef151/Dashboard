import { useState } from "react";
import { useGroups } from "../../context/GroupContext";
import { motion, AnimatePresence } from "framer-motion";
import { History } from "lucide-react";
export default function SessionArchive() {
  const { groups } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState(null);


  const formatDelay = (minutes) => {
  if (minutes < 5) return "No delay";
  
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    // إذا كانت الدقائق أقل من 10، نضيف 0 في البداية (مثل 1:05)
    return `${hours}:${mins.toString().padStart(2, '0')} hrs`;
  }
  
  return `${minutes} mins`;
};

  return (
<div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* 1. قائمة الجروبات */}
      <div className="w-full h-full p-6 lg:p-10 overflow-y-auto">
        <div className="flex gap-2 mb-8 text-[24px] font-semibold">
          <History className="w-8 h-8" />
          <p>Session Archive</p>
        </div>

        <div className="flex flex-col pt-10 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className="p-6 lg:max-w-[30%] md:max-w-[40%] max-w-50 border border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{group.group_name}</h3>
                <p className="text-gray-500 text-sm">{group.instructor}</p>
                <div className="mt-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                    {group.attendance?.length || 0} Sessions
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. لوحة التاريخ المنزلقة (Sliding Panel) */}
      <AnimatePresence>
        {selectedGroup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGroup(null)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[70%] lg:w-[45%] h-full bg-white shadow-2xl z-50 border-l overflow-y-auto"
            >
              <div className="p-6 md:p-10">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="mb-6 flex items-center gap-1 text-gray-500 hover:text-black font-medium transition-colors"
                >
                  <span>←</span> Back to Archives
                </button>

                <div className="border-b pb-8 mb-8">
                  <h1 className="text-3xl font-bold">{selectedGroup.group_name} - History</h1>
                  <p className="text-gray-600">Instructor: {selectedGroup.instructor}</p>
                </div>

                <div className="space-y-6">
                  {selectedGroup.attendance && selectedGroup.attendance.length > 0 ? (
                    selectedGroup.attendance
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((session) => (
                        <div key={session.id} className="p-5 border rounded-2xl shadow-sm bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <p className="font-bold text-lg">{new Date(session.date).toLocaleDateString()}</p>
                            <span className={`px-3 py-1 rounded-full text-sm ${session.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {session.status}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mb-3">Notes: {session.notes || "No notes provided"}</p>
                          <p className="text-xs text-gray-500 pt-2 border-t">
                            Delay: {formatDelay(session.delay)} | Breaks:{" "}
                            {session.firstBreak !== undefined || session.secondBreak !== undefined ? (
                              <span>{session.firstBreak ? "1st Yes" : "1st No"} / {session.secondBreak ? "2nd Yes" : "2nd No"}</span>
                            ) : (
                              <span>{session.hasBreak ? "Break Taken (Yes)" : "No Break Taken"}</span>
                            )}
                          </p>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-10 text-gray-400">No sessions added yet</div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}