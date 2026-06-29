import { FileText } from "lucide-react";
import { useGroups } from "../../context/GroupContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoteItem from "./NoteItem";

export default function Notes() {
   const { groups, updateGroupNote , deleteGroupNote  } = useGroups();
      const [selectedGroup, setSelectedGroup] = useState(null);

      
const handleAddNote = () => {
    const newNote = {
      id: Date.now(), 
      title: "",
      content: "",
      createdAt: new Date().toISOString() 
    };
    updateGroupNote(selectedGroup.id, newNote);
  };
    

  const handleSave = () => {
    setIsEditing(false);
    onSave(note); 
  };

  useEffect(() => {
    if (selectedGroup) {
      const updated = groups.find(g => g.id === selectedGroup.id);
      setSelectedGroup(updated);
    }
  }, [groups]);
  return (
    <>
<div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-white">
      <div className="w-full h-full p-6 lg:p-10 overflow-y-auto">
        <div className="flex gap-2 mb-8 text-[24px] font-semibold">
          <FileText className="w-8 h-8" /> 
          <p>Monthly Notes</p>
        </div>
        
        <div className="flex flex-col  pt-20 gap-10">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className="p-6 lg:max-w-[30%] md:max-w-[30%] max-w-50 border border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all shadow-sm"
            >
              <h3 className="font-bold text-lg">{group.group_name}</h3>
              <p className="text-gray-500 text-sm">{group.instructor}</p>
              <div className="mt-4">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                  {group.notes?.length || 0} notes
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. لوحة الملاحظات المنزلقة (Sliding Panel) */}
      <AnimatePresence>
        {selectedGroup && (
          <>
            {/* خلفية معتمة (Overlay) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGroup(null)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />
            
            {/* اللوحة المنزلقة */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[70%] lg:w-[45%] h-full bg-white shadow-2xl z-50 border-l overflow-y-auto"
            >
              <div className="p-6 md:p-10">
                {/* زر العودة */}
                <button 
                  onClick={() => setSelectedGroup(null)}
                  className="mb-6 flex items-center gap-1 text-gray-500 hover:text-black font-medium transition-colors"
                >
                  <span>←</span> Back to Groups
                </button>
                
                <div className="border-b pb-8 mb-8">
                  <h1 className="text-3xl font-bold">{selectedGroup.group_name}</h1>
                  <p className="text-gray-600">Instructor: {selectedGroup.instructor}</p>
                </div>

                <div className="space-y-6">
                  {selectedGroup.notes?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((note) => (
                    <NoteItem 
                      key={note.id} 
                      initialNote={note} 
                      onSave={(updatedData) => updateGroupNote(selectedGroup.id, updatedData)} 
                      onDelete={(noteId) => deleteGroupNote(selectedGroup.id, noteId)}
                    />
                  ))}

                  <button 
                    onClick={handleAddNote}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-black hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">+</span> Add New Note
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}
