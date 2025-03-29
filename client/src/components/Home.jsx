import React, { useEffect, useState } from 'react';
import { API } from '../api';
import Note from '../components/Note';
import NoteForm from '../components/NoteForm';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await API.get('/notes', { headers: { Authorization: token } });
    setNotes(res.data);
  };

  const addNote = async (note) => {
    await API.post('/notes', note, { headers: { Authorization: token } });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`, { headers: { Authorization: token } });
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Notes App</h1>
      <NoteForm addNote={addNote} />
      <button onClick={handleLogout}>Logout</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {notes.map(note => (
          <Note key={note._id} note={note} handleDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}
