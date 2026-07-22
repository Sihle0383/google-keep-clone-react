// import Note from "./Note.jsx";

// const NoteList = ({listOfNotes}) => {

//     return (
//         <section>
//             {
//                 listOfNotes.map((note) => <Note key={note.id} id={note.id} />)
//             }
//         </section>
//     )

// }

// export default NoteList;




// ----------------------------
// const NoteList = ({listOfNotes, onDelete}) => {
//     return (
//         <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
//             {listOfNotes.map((note) => (
//                 <div key={note.id} style={{border: '1px solid #ddd', margin: '10px', padding: '10px', width: '240px', position: 'relative'}}>
//                     <h3>{note.title}</h3>
//                     <p>{note.text}</p>
//                     <button onClick={() => onDelete(note.id)} style={{position: 'absolute', top: '5px', right: '5px'}}>X</button>
//                 </div>
//             ))}
//         </div>
//     )
// }
// export default NoteList;



// -------------------------------
const NoteList = ({listOfNotes, onDelete, onPin}) => {
    return (
        <div className="note-grid"> {/* Masonry */}
            {listOfNotes.map((note) => (
                <div
                  key={note.id}
                  className="note-card"
                  style={{backgroundColor: note.color}}
                >
                    <span className="pin-btn" onClick={() => onPin(note.id)}>
                      {note.pinned? '📌' : '📍'}
                    </span>
                    <h3>{note.title}</h3>
                    <p>{note.text}</p>
                    <span className="delete-btn" onClick={() => onDelete(note.id)}>🗑️</span>

                    <div className="note-actions">
                      <span className="material-symbols-outlined">palette</span>
                      <span className="material-symbols-outlined">notifications</span>
                      <span className="material-symbols-outlined">person_add</span>
                      <span className="material-symbols-outlined">image</span>
                      <span className="material-symbols-outlined">archive</span>
                      <span className="material-symbols-outlined">more_vert</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default NoteList;