import React from "react";
import style from "./Note.module.css";
import { MdDeleteForever } from "react-icons/md";

const Note = ({ id, title, date, handleDeleteNote, handleSelectNote }) => {
  return (
    <div className={style.note} onClick={handleSelectNote}>
      <span>{title}</span>
      <div className={style.noteFooter}>
        <small>{date}</small>
        <MdDeleteForever
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteNote(id);
          }}
          className={style.deleteIcon}
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
