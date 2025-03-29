import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const colorOptions = [
  { name: 'Yellow', value: '#FFD700' },
  { name: 'Green', value: '#90EE90' },
  { name: 'Blue', value: '#87CEFA' },
  { name: 'Purple', value: '#9370DB' },
  { name: 'Orange', value: '#FFB347' },
  { name: 'Peach', value: '#FFA07A' },
];

export default function NoteForm({ addNote }) {
  const [note, setNote] = useState({ title: '', body: '', color: colorOptions[0].value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.body) return;
    addNote(note);
    setNote({ title: '', body: '', color: colorOptions[0].value });
    toast.success('Note Added successfully!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-[500px] max-w-md mx-auto min-h-[450px]"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Note</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter note title"
          value={note.title}
          onChange={e => setNote({ ...note, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
          maxLength={20}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Body</label>
        <textarea
          placeholder="Enter note content"
          value={note.body}
          onChange={e => setNote({ ...note, body: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Color</label>
        <select
          value={note.color}
          onChange={e => setNote({ ...note, color: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
          {colorOptions.map((color, index) => (
            <option key={index} value={color.value}>{color.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-[120px] bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
      >
        <span className='flex justify-center items-center gap-2'>
          <FaPlus size={12} />
          Add Note
        </span>
      </button>
    </form>
  );
}
