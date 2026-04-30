import './Header.css';
import { profileAvatar } from '../../data/avatarData';

const navItems = [
  { label: 'Dashboard', iconClass: 'icon-dashboard' },
  { label: 'Projects', iconClass: 'icon-projects' },
  { label: 'Note', iconClass: 'icon-note' },
  { label: 'Time Tracking', iconClass: 'icon-time' },
  { label: 'Reports', iconClass: 'icon-reports' },
];

function Header() {
  return (
    <header className='topbar'>
      <nav className='top-nav'>
        <div className='brand'>ClickUp</div>

        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-chip ${item.iconClass} ${item.label === 'Projects' ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className='top-actions'>
        <button className='action-btn icon-notify' />
        <button className='status-dot' />
        <img
          className='header-avatar'
          src={profileAvatar}
          alt='Profile avatar'
        />
      </div>
    </header>
  );
}

export default Header;
