import './App.css';
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Board from './components/Board/Board';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="page-shell">
      <Header />

      <div className={`content-grid ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prevState) => !prevState)}
        />
        <Board />
      </div>
    </div>
  );
}

export default App;
