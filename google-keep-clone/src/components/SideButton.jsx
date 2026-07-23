const SideButton = ({text, icon, active, onClick}) => {
    return (
        <div className={`side-button ${active ? 'active' : ''}`} onClick={onClick}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="side-text">{text}</span>
        </div>
    )
}
export default SideButton;
