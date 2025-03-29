import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Note({ note, handleDelete, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedBody, setEditedBody] = useState(note.body);

  const saveEdit = () => {
    handleEdit(note._id, { title: editedTitle, body: editedBody });
    setIsEditing(false);
    toast.success('Note updated successfully!');
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedBody(note.body);
  };

  const confirmDelete = () => {
    handleDelete(note._id);
    setIsDeleting(false);
    toast.success('Note deleted successfully!');
  };

  return (
    <div className='pb-10'>
      <div
        className={`bg-white rounded-2xl shadow-lg p-4 w-72 h-[250px] border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out`}
        style={{ background: note.color }}
      >
        <div className="flex justify-between items-center border-b h-[50px]">
          <h3 className="text-xl font-bold text-gray-900">{note.title}</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-black hover:text-gray-700 "
          >
            <FaEdit size={18} />
          </button>
        </div>

        {/* Body with read more */}
        <p className="text-gray-800 py-3 border-b h-[120px]">
          {note.body.length > 100 ? (
            <>
              {note.body.substring(0, 100)}...{' '}
              <button
                className="text-white hover:font-medium"
                onClick={() => setShowFull(true)}
              >
                Read More
              </button>
            </>
          ) : (
            note.body
          )}
        </p>

        <div className="flex justify-between items-center h-[50px]">
          <small className="text-gray-600 block">{new Date(note.createdAt).toLocaleString()}</small>
          <button
            onClick={() => setIsDeleting(true)}
            className="text-red-600 hover:text-red-500"
          >
            <FaTrash size={18} />
          </button>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className=" rounded-2xl shadow-2xl p-8 w-[400px]" style={{ background: note.color }}>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Note</h2>
              <form onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Title:</label>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full border  rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-black"
                    required
                    style={{ background: note.color }}
                    maxLength={20}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-1">Content:</label>
                  <textarea
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring focus:ring-black"
                    required
                    style={{ background: note.color }}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-black hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-white hover:bg-gray-500 text-black px-5 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-[350px] text-center">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Are you sure you want to delete this note?</h3>
              <div className="flex justify-center gap-6">
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Full Note View Modal */}
        {showFull && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-2xl shadow-2xl w-[600px] overflow-hidden" style={{ background: note.color }}>

              {/* Header */}
              <div className="p-6 border-b border-gray-300">
                <h2 className="text-2xl font-bold text-black">{note.title}</h2>
              </div>

              {/* Body */}
              <div className="p-6 border-b border-gray-300 h-[150px] overflow-auto text-justify">
                <p className="text-black">{note.body}</p>
              </div>

              {/* Footer */}
              <div className="p-6 flex justify-end">
                <button
                  onClick={() => setShowFull(false)}
                  className="bg-black hover:bg-gray-700 text-white px-6 py-2 rounded-full font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
