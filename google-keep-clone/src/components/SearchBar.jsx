// const SearchBar = () => {
//     const icons ="material-symbols-outlined";

//     return (
//         <section>
//             <span className={icons}>Search</span>
//             <input type="search" placeholder="Search"/>
//         </section>
        
//     )
// }

// export default SearchBar;



// ---------------------------------
const SearchBar = ({ onSearch }) => {
    return (
        <div className="search-bar" style={{background: '#f1f3f4', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', width: '615px'}}>
            <span className="material-symbols-outlined">search</span>
            <input
                type="text"
                placeholder="Search your notes"
                onChange={(e) => onSearch(e.target.value)} // sends text to App.jsx
                style={{border: 'none', background: 'transparent', outline: 'none', marginLeft: '8px', width: '100%', fontSize: '16px'}}
            />
        </div>
    )
}
export default SearchBar;