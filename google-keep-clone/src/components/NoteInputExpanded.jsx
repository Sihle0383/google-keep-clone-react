import {useState} from "react";

const NoteInputExpanded = ({close}) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [color, setColor] = useState("#ffffff"); // NEW: default white

    const colors = ["#ffffff", "#f28b82", "#fbbc04", "#fff475", "#ccff90", "#a7ffeb", "#cbf0f8", "#aecbfa", "#d7aefb", "#fdcfe0"]; // Keep colors

    let closeNote = () => {
        close(title, text, color); // ← now sending color too
        setTitle("");
        setText("");
        setColor("#ffffff")
    }

    return (
        <div style={{border: '1px solid #ddd', borderRadius: '8px', padding: '12px', width: '500px', margin: '20px auto', boxShadow: '0 1px 2px rgba(0,0,0,0.2)'}}>
            <input 
                type="text"
                placeholder="Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{border: 'none', outline: 'none', width: '100%', fontSize: '16px', fontWeight: 'bold', marginBottom: '8px'}}
            />
            <textarea 
                id="note-text" 
                placeholder="Take a note..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{border: 'none', outline: 'none', width: '100%', minHeight: '60px', resize: 'none'}}
            />
            
            {/* NEW: Color Picker */}
            <div style={{display: 'flex', gap: '8px', margin: '8px 0'}}>
                {colors.map(c => (
                    <div 
                        key={c}
                        onClick={() => setColor(c)}
                        style={{
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            backgroundColor: c, 
                            border: color === c? '2px solid #000' : '1px solid #ccc',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>

            <button onClick={closeNote} style={{float: 'right'}}>Close</button>
        </div>
    )
}

export default NoteInputExpanded;