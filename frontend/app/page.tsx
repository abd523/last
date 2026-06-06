"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadNotes = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/notes/"
    );

    setNotes(res.data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async () => {

    await axios.post(
      "http://127.0.0.1:8000/api/notes/",
      {
        title,
        content
      }
    );

    setTitle("");
    setContent("");

    loadNotes();
  };

  return (
    <div style={{padding:"20px"}}>

      <h1>Student Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={addNote}>
        Add Note
      </button>

      <hr />

      {notes.map((note)=>(
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}

    </div>
  );
}