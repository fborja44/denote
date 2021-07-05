// React imports
import { React, useState } from "react";

const AddQuickNote = ({ handleAddNote }) => {
  // Use state hook to get user input
  const [noteText, setNoteText] = useState(""); // start state as empty string
  const characterLimit = 200;

  const handleChange = (event) => {
    // Check character limit
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value); // update state every time value of text area changes
    }
  };

  const handleSaveClick = () => {
    // Validate input
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);

      // Reset inner text
      setNoteText("");
    }
  };

  return (
    <div className="quicknote new">
      <div className="quicknote-header"><span className="quicknote-name">New Note</span></div>
      <div className="quicknote-content">
        <textarea
          rows="8"
          cols="10"
          placeholder="Type to add a note..."
          value={noteText}
          onChange={handleChange}
        ></textarea>
        <div className="quicknote-footer">
          <small>{characterLimit - noteText.length} Remaining</small>
          <button className="save" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuickNote;
