import { createContext, useContext, useEffect, useState } from "react";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {

  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("myGroups");
    return savedGroups ? JSON.parse(savedGroups) : [];
    
  });
          const today = new Date(); 
    const dayName = today.toLocaleString('en-US', { weekday: 'long' });
  useEffect(() => {
   localStorage.setItem("myGroups", JSON.stringify(groups));
   
console.log(groups);

  }, [groups]);
  const addGroup = (newGroup) => {
    setGroups((prev) => [...prev, { ...newGroup, id: Date.now() }]);
  };


const updateGroup = (updatedGroup) => {
  setGroups((prevGroups) =>
    prevGroups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
  );
  localStorage.setItem("myGroups", JSON.stringify(groups)); 
};

const updateGroupNote = (groupId, noteData) => {
  setGroups(prevGroups => prevGroups.map(group => {
    if (group.id === groupId) {
      const existingNotes = group.notes || [];
      const index = existingNotes.findIndex(n => n.id === noteData.id);
      
      let newNotes = [...existingNotes];
      if (index > -1) {
        newNotes[index] = noteData; // تحديث النوت الموجودة
      } else {
        newNotes.push(noteData); // إضافة نوت جديدة
      }
      return { ...group, notes: newNotes };
    }
    return group;
  }));

};
const deleteGroupNote = (groupId, noteId) => {
  setGroups(prevGroups => prevGroups.map(group => {
    if (group.id === groupId) {
      return { 
        ...group, 
        notes: group.notes.filter(n => n.id !== noteId) 
      };
    }
    return group;
  }));
};


// const groupsToday = groups.filter(group => {
//   return group.days && group.days.includes(dayName);
// });


const addAttendanceRecord = (groupId, record) => {
  setGroups(prevGroups => prevGroups.map(group => {
    if (group.id === groupId) {

      const currentAttendance = group.attendance || [];
      return { ...group, attendance: [...currentAttendance, record] };
    }
    return group;
  }));
};

const saveAttendanceRecord = (groupId, record) => {
  setGroups(prevGroups => prevGroups.map(group => {
    if (group.id === groupId) {
      return { 
        ...group, 
        attendance: [record] 
      };
    }
    return group;
  }));
};

const groupsToday = (dayName) => {
  return groups.filter(group => group.days && group.days.includes(dayName));
};
  return (
    <GroupContext.Provider value={{ groups, addGroup  , updateGroup , updateGroupNote , deleteGroupNote ,groupsToday, addAttendanceRecord , saveAttendanceRecord }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);