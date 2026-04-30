import './Sidebar.css';

const sideMenu = ['Project Board', 'All Projects', 'Pinned', 'In Progress', 'Done'];

function Sidebar({ isOpen, onToggle }) {
  return (
    <aside className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isOpen && <h2>Projects</h2>}
        <div className="sidebar-header-actions">
          {isOpen && <button className="add-btn">+</button>}
          <button className="toggle-btn" onClick={onToggle} aria-label="Toggle sidebar">
            {isOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <ul className="sidebar-list">
            {sideMenu.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="project-groups">
            <div className="group-item">
              <span className="dot green" /> Piexlque <span className="pill">05</span>
            </div>
            <div className="group-item">
              <span className="dot gray" /> Perfecta <span className="pill">10</span>
            </div>
            <div className="group-item">
              <span className="dot gray" /> Healthcare <span className="pill">25</span>
            </div>
          </div>

          <div className="upgrade-card">
            <div className="trophy">🏆</div>
            <h3>Upgrade your plan</h3>
            <p>Development is a process that creates growth, progress, positive change.</p>
          </div>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
