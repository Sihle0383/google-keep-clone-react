const SideButton = ({text, icon, active}) => {
    return (
        <div className={`side-button ${active ? 'active' : ''}`}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="side-text">{text}</span>
        </div>
    )
}
export default SideButton;