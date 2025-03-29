// import React, { useState, useEffect } from 'react';
// import { API } from './api';
// import Login from './components/Login';
// import Register from './components/Register';
// import Note from './components/Note';
// import NoteForm from './components/NoteForm';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [notes, setNotes] = useState([]);

//   const fetchNotes = async () => {
//     if (token) {
//       const res = await API.get('/notes', { headers: { Authorization: token } });
//       setNotes(res.data);
//     }
//   };

//   useEffect(() => { fetchNotes(); }, [token]);

//   const addNote = async (note) => {
//     await API.post('/notes', note, { headers: { Authorization: token } });
//     fetchNotes();
//   };

//   const deleteNote = async (id) => {
//     await API.delete(`/notes/${id}`, { headers: { Authorization: token } });
//     fetchNotes();
//   };

//   return (
//     <div>
//       <h1>Notes App</h1>
//       {!token ? (
//         <>
//           <Register />
//           <Login setToken={setToken} />
//         </>
//       ) : (
//         <>
//           <NoteForm addNote={addNote} />
//           <button onClick={() => { setToken(''); localStorage.removeItem('token'); }}>Logout</button>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//             {notes.map(note => (
//               <Note key={note._id} note={note} handleDelete={deleteNote} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { API } from './api';
import Login from './components/Login';
import Register from './components/Register';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import { FiLogOut } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState('login');
  const [userName, setUserName] = useState('');

  const fetchNotes = async () => {
    if (token) {
      const res = await API.get('/notes', { headers: { Authorization: token } });
      setNotes(res.data);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const addNote = async (note) => {
    await API.post('/notes', note, { headers: { Authorization: token } });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`, { headers: { Authorization: token } });
    fetchNotes();
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setPage('login');
    setUserName('');
  };

  const editNote = async (id, updatedNote) => {
    await API.put(`/notes/${id}`, updatedNote, { headers: { Authorization: token } });
    fetchNotes();
  };

  return (
    <div>
      {!token ? (
        <>
          {page === 'login' ? (
            <>
              <Login setToken={setToken} setPage={setPage} setUserName={setUserName}/>

            </>
          ) : (
            <>
              <Register setPage={setPage} setUserName={setUserName}/>

            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex justify-between items-center px-4 h-[60px] bg-black">
              <h1 className="text-white text-xl font-semibold">NoteVault</h1>
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">{userName}</span>
                <button className="text-white bg-white rounded-full p-2 text-sm" onClick={handleLogout}>
                  <span className='flex justify-center items-center gap-2 text-black'>
                    <FiLogOut size={18} />
                    Logout
                  </span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-x-10 px-10 pt-10  bg-gray-100 flex-1 overflow-auto">
              <div className="sticky top-0 ">
                <NoteForm addNote={addNote} />
              </div>
              <div className="flex flex-wrap gap-x-10 ">
                {notes.map(note => (
                  <Note
                    key={note._id}
                    note={note}
                    handleDelete={deleteNote}
                    handleEdit={editNote}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
