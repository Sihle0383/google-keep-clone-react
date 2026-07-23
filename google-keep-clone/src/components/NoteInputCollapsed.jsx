const NoteInputCollapsed = ({onClick}) => {
    return (
        <div
            onClick={onClick}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px 16px',
                width: '580px',
                margin: '20px auto',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                cursor: 'text',
                color: '#5f6368'
            }}
        >
            Take a note...
        </div>
    )
}
export default NoteInputCollapsed;