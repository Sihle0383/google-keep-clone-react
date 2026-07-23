
// ---------------------------------------
import {useState, useEffect} from 'react'
import './App.css'
import Navigation from "./components/Navigation.jsx";
import SideBar from "./components/SideBar.jsx";
import NoteList from "./components/NoteList.jsx";
import NoteInputExpanded from "./components/NoteInputExpanded.jsx";
import NoteInputCollapsed from "./components/NoteInputCollapsed.jsx"; // NEW

const STORAGE_KEY = "keep-notes"

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    return JSON.parse(saved).map(note => ({
      ...note,
      pinned: note.pinned ?? false,
      reminder: note.reminder ?? null,
      tags: note.tags ?? [],
    }))
  } catch {
    return []
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

function App() {
  const [isExpanded, setIsExpanded] = useState(false) // NEW
  const [notes, setNotes] = useState(loadNotes);
  const [isDark, setIsDark] = useState(false)
  const [search, setSearch] = useState("")
  const [currentView, setCurrentView] = useState("notes")
  const [tagFilter, setTagFilter] = useState(null)

  useEffect(() => {
    saveNotes(notes)
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
      pinned: false,
      reminder: null,
      tags: []
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

  let setReminder = (id, dateTime) => {
    setNotes((prevNotes) => prevNotes.map(note =>
      note.id === id ? {...note, reminder: dateTime} : note
    ))
  }

  let toggleTag = (id, tagName) => {
    setNotes((prevNotes) => prevNotes.map(note => {
      if (note.id !== id) return note
      const tags = note.tags || []
      const hasTag = tags.includes(tagName)
      return {
        ...note,
        tags: hasTag ? tags.filter(t => t !== tagName) : [...tags, tagName]
      }
    }))
  }

  const searchFiltered = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.text.toLowerCase().includes(search.toLowerCase())
  )

  const tagFiltered = tagFilter
    ? searchFiltered.filter(note => (note.tags || []).includes(tagFilter))
    : searchFiltered

  const viewFiltered = currentView === "reminders"
    ? tagFiltered.filter(note => note.reminder != null)
    : tagFiltered

  const filteredNotes = [...viewFiltered].sort((a, b) => {
    if (currentView === "reminders") {
      return new Date(a.reminder) - new Date(b.reminder)
    }
    return b.pinned - a.pinned
  })

  const handleViewChange = (view) => {
    setCurrentView(view)
    setTagFilter(null)
  }

  const handleTagFilter = (tag) => {
    setTagFilter(prev => prev === tag ? null : tag)
    setCurrentView("notes")
  }

  return (
    <div className={isDark? 'dark' : 'light'}>
      <Navigation onSearch={setSearch} isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
        <div className="app-container">
          <SideBar
            currentView={currentView}
            tagFilter={tagFilter}
            onViewChange={handleViewChange}
            onTagFilter={handleTagFilter}
          />
          <main>
            {/* TOGGLE LOGIC */}
            {isExpanded?
              <NoteInputExpanded close={closeNote} /> :
              <NoteInputCollapsed onClick={() => setIsExpanded(true)} />
            }

        <NoteList
          listOfNotes={filteredNotes}
          onDelete={deleteNote}
          onPin={togglePin}
          onSetReminder={setReminder}
          onToggleTag={toggleTag}
        />
          </main>
        </div>
    </div>
  )
}
export default App