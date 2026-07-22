// import SearchBar from "./SearchBar.jsx"

// const Navigation = () => {
//     const icons = "material-symbols-outlined"

//     return (
//         <header>
//             <section>
//                 <span className={icons}>Menu</span>

//                 <img src="/keepLogo.png" alt="Google Keep" />

//                 <h1>Keep</h1>

//                 <SearchBar/>
//             </section>

//             <section>
//                 <span className={icons}>Refresh</span>
//                 <span className={icons}>Grid_view</span>
//                 <span className={icons}>Settings</span>
//                 <span className={icons}>Apps</span>
//                 <span className={icons}>Account_circle</span>
//             </section>
//         </header>
//     )
// }

// export default Navigation;




// -----------------------------
import SearchBar from "./SearchBar.jsx"

const Navigation = ({ onSearch, isDark, toggleDark }) => {
    const icons = "material-symbols-outlined"

    return (
        <header style={{display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #ddd', alignItems: 'center'}}>
            <section style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                <span className={icons}>Menu</span>
                <img src="/keepLogo.png" alt="Google Keep" style={{width: '40px'}} />
                <h1 className="logo-text">Keep</h1>
                <SearchBar onSearch={onSearch}/> {/* wired*/}
            </section>

            <section className="header-icons" style={{display: 'flex', gap: '4px', alignItems: 'center'}}>
                <span className={icons}>Refresh</span>
                <span className={icons}>Grid_view</span>
                <span className={icons}>Settings</span>
                
                {/* NEW: Dark Mode Toggle - This is my "AI Feature #1" */}
                <span className={icons} onClick={toggleDark} style={{cursor: 'pointer'}}>
                    {isDark? 'Light_mode' : 'Dark_mode'}
                </span>

                <span className={icons}>Apps</span>
                <span className={icons}>Account_circle</span>
            </section>
        </header>
    )
}

export default Navigation;