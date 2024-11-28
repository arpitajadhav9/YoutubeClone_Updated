import React, { useState, useEffect } from 'react';
import './StickyNotes.css';

const StickyNotes = () => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('generalNotes') || '';
    setNotes(savedNotes);
  }, []);

  const handleChange = (event) => {
    setNotes(event.target.value);
  };

  const saveNotes = () => {
    localStorage.setItem('generalNotes', notes);
    alert('Notes saved!');
  };

  return (
    <div className="sticky-notes">
      <div className="sticky-notes-header">
        <h2>Sticky Notes</h2>
        <button onClick={saveNotes}>Save</button>
      </div>
      <textarea
        className="sticky-notes-textarea"
        placeholder="Write your notes here..."
        value={notes}
        onChange={handleChange}
      />
    </div>
  );
};

export default StickyNotes;
