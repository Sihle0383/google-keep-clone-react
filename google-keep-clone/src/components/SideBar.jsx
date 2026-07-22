import {useState} from "react";
import SideButton from "./SideButton.jsx";

const SideBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside 
            className={`sidebar ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <SideButton text="Note" icon="lightbulb_2" />
            <SideButton text="Reminders" icon="notifications" />
            <SideButton text="Inspiration" icon="label" />
            <SideButton text="Personal" icon="label" />
            <SideButton text="Work" icon="label" />
            <SideButton text="Edit Labels" icon="edit" />
            <SideButton text="Archive" icon="archive" />
            <SideButton text="Trash" icon="delete" />
        </aside>
    )
}

export default SideBar;