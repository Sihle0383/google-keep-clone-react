// import {useState, useEffect} from 'react'
// import './App.css'
// import Navigation from "./components/Navigation.jsx";
// import SideBar from "./components/SideBar.jsx";
// import NoteList from "./components/NoteList.jsx";
// // import Note from "./components/Note.jsx";
// import NoteInputExpanded from "./components/NoteInputExpanded.jsx";

// function App() {

//   const [notes, setNotes] = useState([])

//   // let notes =[
//   //   {
//   //     title: "Note 1",
//   //     text: "This is another note"
//   //   },
//   //      {
//   //       tittle: "Note 1",
//   //       text: "This is another note"
//   //      }
    

//   // ]

//   let closeNote = (title, note) => {
//     // capture the info and store it in the list
//     setNotes((prevNotes) => [...prevNotes, {title: title, text: note}])

//     // Update the local storage
//     updateStorage()
//   }

//   return (
//     <>

//       <Navigation />
//       <SideBar />

//       <main>
//         <NoteInputExpanded close={closeNote} />
//         <NoteList listOfNotes={notes}/>
//       </main>

//     </>
//   )

// }
        
// export default App




// ---------------------------------------
import {useState, useEffect} from 'react'
import './App.css'
import Navigation from "./components/Navigation.jsx";
import SideBar from "./components/SideBar.jsx";
import NoteList from "./components/NoteList.jsx";
import NoteInputExpanded from "./components/NoteInputExpanded.jsx";
import NoteInputCollapsed from "./components/NoteInputCollapsed.jsx"; // NEW

function App() {
  const [isExpanded, setIsExpanded] = useState(false) // NEW
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("keep-notes")
    return saved? JSON.parse(saved) : []
  });
  const [isDark, setIsDark] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    localStorage.setItem("keep-notes", JSON.stringify(notes))
  }, [notes])

  let closeNote = (title, note, color) => {
    if(title.trim() === "" && note.trim() === "") {
      setIsExpanded(false) // close even if empty
      return;
    }
    setNotes((prevNotes) => [...prevNotes, {
      id: Date.now(),
      title: title,
      text: note,
      color: color || '#fff',
      pinned: false
    }])
    setIsExpanded(false) // collapse after saving
  }

  let deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id!== id))
  }

  let togglePin = (id) => {
    setNotes((prevNotes) => prevNotes.map(note =>
      note.id === id? {...note, pinned:!note.pinned} : note
    ))
  }

  const filteredNotes = notes
  .filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.text.toLowerCase().includes(search.toLowerCase())
    )
  .sort((a, b) => b.pinned - a.pinned)

  return (
    <div className={isDark? 'dark' : 'light'}>
      <Navigation onSearch={setSearch} isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
        <div className="app-container">
          <SideBar />
          <main>
            {/* TOGGLE LOGIC */}
            {isExpanded?
              <NoteInputExpanded close={closeNote} /> :
              <NoteInputCollapsed onClick={() => setIsExpanded(true)} />
            }

        <NoteList listOfNotes={filteredNotes} onDelete={deleteNote} onPin={togglePin}/>
          </main>
        </div>
    </div>
  )
}
export default App