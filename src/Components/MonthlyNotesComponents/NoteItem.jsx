import { useState, useEffect } from "react";

function NoteItem({ initialNote, onSave ,onDelete }) {
  const [note, setNote] = useState(initialNote);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm mb-4">
      <input 
        value={note.title}
        onChange={(e) => setNote({...note, title: e.target.value})}
        className="w-full font-bold text-lg outline-none mb-2"
        placeholder="Note Title..."
      />
      <textarea 
        value={note.content}
        onChange={(e) => setNote({...note, content: e.target.value})}
        className="w-full text-gray-600 outline-none resize-none"
        placeholder="Write your note here..."
        rows={4}
      />
      
      <div className=" flex gap-4 mt-4">
        <button 
          onClick={() => onSave(note)} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Note
        </button>
        <button 
          onClick={() => onDelete(note.id)} 
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default NoteItem;