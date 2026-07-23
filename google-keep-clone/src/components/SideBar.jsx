import {useState} from "react";
import SideButton from "./SideButton.jsx";
import { TAG_OPTIONS } from "../constants/tags.js";

const SideBar = ({ currentView, tagFilter, onViewChange, onTagFilter }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside 
            className={`sidebar ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <SideButton
                text="Note"
                icon="lightbulb_2"
                active={currentView === "notes" && !tagFilter}
                onClick={() => onViewChange("notes")}
            />
            <SideButton
                text="Reminders"
                icon="notifications"
                active={currentView === "reminders"}
                onClick={() => onViewChange("reminders")}
            />

            <SideButton text="Edit Labels" icon="edit" />
            <SideButton text="Archive" icon="archive" />
            <SideButton text="Inspiration" icon="label" />
            <SideButton text="Work" icon="label" />
            <SideButton text="Trash" icon="delete" />
            <div className="sidebar-tags-section">
                <div className="sidebar-tags-header">
                    <span className="side-text">Tags</span>
                </div>
                {TAG_OPTIONS.map(tag => (
                    <SideButton
                        key={tag.name}
                        text={tag.name}
                        icon="label"
                        active={tagFilter === tag.name}
                        onClick={() => onTagFilter(tag.name)}
                    />
                ))}
            </div>
        </aside>
    )
}

export default SideBar;
