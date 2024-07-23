import { openDB } from 'idb';
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import style from "./Home.module.css";


const auth = getAuth(appFireBase);

// Inicializa la base de datos
const initDB = async () => {
  return openDB('NotesDB', 1, {
    upgrade(db) {
      db.createObjectStore('notes', {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });
};

function Home({ userEmail }) {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const db = await initDB();
      const allNotes = await db.getAll('notes');
      setNotes(allNotes);
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      const db = await initDB();
      for (const note of notes) {
        await db.put('notes', note);
      }
    };
    saveNotes();
  }, [notes]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.backgroundColor = 'black';
      document.documentElement.style.color = 'white';
    } else {
      document.documentElement.style.backgroundColor = '';
      document.documentElement.style.color = '';
    }
  }, [darkMode]);

  const addNote = (title) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title,
      text: '',
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = async (id) => {
    const db = await initDB();
    await db.delete('notes', id);
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  

  return (
    <div className={`${darkMode ? style.darkMode : ''} ${style.supercontainer}`}>
			<div className={style.container}>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
}

export default Home;
 