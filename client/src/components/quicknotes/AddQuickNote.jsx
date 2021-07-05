// React imports
import { React, useState } from "react";

// Image and icon imports
import { IoMdAdd } from "react-icons/io";

const AddQuickNote = ({ handleAddNote }) => {
  // State hook for title
  const [noteTitle, setNoteTitle] = useState(""); // Set noteTitle state
  const titleCharacterLimit = 30;

  const handleTitleChange = (event) => {
    if (titleCharacterLimit - event.target.value.length >= 0) {
      setNoteTitle(event.target.value); // update state every time value of text area changes
    }
  };

  // State hook for note text
  const [noteText, setNoteText] = useState(""); // Set noteText state
  const textCharacterLimit = 200;

  const handleTextChange = (event) => {
    // Check character limit
    if (textCharacterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value); // update state every time value of text area changes
    }
  };

  const handleSaveClick = () => {
    // Validate input
    if (noteText.trim().length > 0) {
      handleAddNote({noteTitle, noteText});

      // Reset inner text
      setNoteTitle("");
      setNoteText("");
    }
  };

  return (
    <div className="quicknote new">
      <div className="quicknote-header">
        <input className="quicknote-title-input" placeholder="Title..." value={noteTitle} onChange={handleTitleChange}/>
      </div>
      <div className="quicknote-content">
        <textarea
          rows="8"
          cols="10"
          placeholder="Type to add a note..."
          value={noteText}
          onChange={handleTextChange}
        ></textarea>
        <div className="quicknote-footer">
          <small>Character Limit: {textCharacterLimit - noteText.length}</small>
          <button className="add-quicknote-button" onClick={handleSaveClick}>
            <IoMdAdd className="add-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuickNote;
