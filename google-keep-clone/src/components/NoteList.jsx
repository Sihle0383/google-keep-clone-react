import {useState, useEffect, useRef} from "react";
import {TAG_OPTIONS} from "../constants/tags.js";

function toDatetimeLocal(date) {
    const pad = (n) => String(n).padStart(2, "0")
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function formatReminder(dateStr) {
    return new Date(dateStr).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })
}

const NoteList = ({listOfNotes, onDelete, onPin, onToggleTag, onSetReminder}) => {
    const [openLabelId, setOpenLabelId] = useState(null)
    const [activeNoteId, setActiveNoteId] = useState(null)
    const activeNoteIdRef = useRef(null)
    const dropdownRef = useRef(null)
    const dateInputRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenLabelId(null)
            }
        }
        if (openLabelId !== null) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [openLabelId])

    useEffect(() => {
        if (activeNoteId == null || !dateInputRef.current) return

        const note = listOfNotes.find((n) => n.id === activeNoteId)
        if (note?.reminder) {
            dateInputRef.current.value = toDatetimeLocal(new Date(note.reminder))
        } else {
            dateInputRef.current.value = ""
        }

        dateInputRef.current.showPicker?.() ?? dateInputRef.current.click()
    }, [activeNoteId, listOfNotes])

    const handleDateChange = (e) => {
        const noteId = activeNoteIdRef.current
        if (noteId != null && e.target.value) {
            onSetReminder(noteId, new Date(e.target.value).toISOString())
        }
        activeNoteIdRef.current = null
        setActiveNoteId(null)
    }

    const openReminderPicker = (noteId) => {
        activeNoteIdRef.current = noteId
        setActiveNoteId(noteId)
    }

    const getTagColor = (tagName) =>
        TAG_OPTIONS.find(t => t.name === tagName)?.color || "#e8eaed"

    return (
        <>
        <input
            ref={dateInputRef}
            type="datetime-local"
            className="reminder-picker-hidden"
            onChange={handleDateChange}
        />
        <div className="note-grid"> {/* Masonry */}
            {listOfNotes.map((note) => (
                <div
                  key={note.id}
                  className="note-card"
                  style={{backgroundColor: note.color}}
                >
                    <span
                      className={`pin-btn material-symbols-outlined${note.pinned ? " pinned" : ""}`}
                      onClick={() => onPin(note.id)}
                      title={note.pinned ? "Unpin note" : "Pin note"}
                    >
                      push_pin
                    </span>
                    <h3>{note.title}</h3>
                    <p>{note.text}</p>

                    {(note.tags || []).length > 0 && (
                      <div className="note-tags">
                        {note.tags.map(tag => (
                          <span
                            key={tag}
                            className="tag-pill"
                            style={{backgroundColor: getTagColor(tag)}}
                            onClick={() => onToggleTag(note.id, tag)}
                            title={`Remove ${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {note.reminder && (
                      <div className="note-reminder">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>{formatReminder(note.reminder)}</span>
                      </div>
                    )}

                    <div className="note-actions">
                      <span className="material-symbols-outlined note-action-btn" title="Change color">palette</span>
                      <span
                        className="material-symbols-outlined note-action-btn"
                        onClick={() => openReminderPicker(note.id)}
                        title="Remind me"
                      >
                        notifications
                      </span>
                      <span className="material-symbols-outlined note-action-btn" title="Collaborator">person_add</span>
                      <span className="material-symbols-outlined note-action-btn" title="Add image">image</span>
                      <span className="material-symbols-outlined note-action-btn" title="Archive">archive</span>
                      <div
                        className="label-menu-wrap"
                        ref={openLabelId === note.id ? dropdownRef : null}
                      >
                        <span
                          className="material-symbols-outlined note-action-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenLabelId(openLabelId === note.id ? null : note.id)
                          }}
                          title="Labels"
                        >
                          label
                        </span>
                        {openLabelId === note.id && (
                          <div className="label-dropdown">
                            <div className="label-dropdown-title">Label note</div>
                            {TAG_OPTIONS.map(tag => {
                              const selected = (note.tags || []).includes(tag.name)
                              return (
                                <div
                                  key={tag.name}
                                  className="label-option"
                                  onClick={() => onToggleTag(note.id, tag.name)}
                                >
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={selected}
                                    tabIndex={-1}
                                  />
                                  <span
                                    className="label-swatch"
                                    style={{backgroundColor: tag.color}}
                                  />
                                  <span>{tag.name}</span>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                      <span
                        className="material-symbols-outlined note-action-btn"
                        onClick={() => onDelete(note.id)}
                        title="Delete note"
                      >
                        delete
                      </span>
                      <span className="material-symbols-outlined note-action-btn" title="More">more_vert</span>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}
export default NoteList;
