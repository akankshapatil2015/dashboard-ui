import { FiFilter } from 'react-icons/fi';
import { LuArrowUpDown } from 'react-icons/lu';
import { BsChevronDown } from 'react-icons/bs';
import columns from '../../data/columnsData';
import { teamAvatars } from '../../data/avatarData';
import Column from '../Column/Column';
import './Board.css';

const viewActions = [
  { label: 'Kanban', icon: <BsChevronDown /> },
  { label: 'Filter', icon: <FiFilter /> },
  { label: 'Sort', icon: <LuArrowUpDown /> },
];

function Board() {
  return (
    <main className='board-area'>
      <div className='board-head'>
        <div className='board-title-group'>
          <h1>Piexlque</h1>
          <p className='board-head-status'>On Track</p>
          <p className='board-head-updated'>Last updated: 02:00 PM Yesterday</p>
        </div>
        <div className='board-controls'>
          <div className='issue-controls'>
            <input type='text' placeholder='Search' readOnly />
            <div className='mini-avatars'>
              {teamAvatars.map((avatarSrc, index) => (
                <img
                  key={avatarSrc}
                  className='avatar'
                  src={avatarSrc}
                  alt={`Team member ${index + 1}`}
                />
              ))}
            </div>
            <button className='control-btn'>Only My Issues</button>
            <button className='control-btn'>Recently Updated</button>
          </div>
          <div className='view-controls'>
            {viewActions.map((action) => (
              <button key={action.label} className='control-btn with-icon'>
                {action.label === 'Kanban' ? (
                  <>
                    {action.label}
                    <span className='btn-icon'>{action.icon}</span>
                  </>
                ) : (
                  <>
                    <span className='btn-icon'>{action.icon}</span>
                    {action.label}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='tabs-row'>
        <button>Overview</button>
        <button className='active'>Board</button>
        <button>Files(10)</button>
        <button>Timeline</button>
        <button>Reports(6)</button>
      </div>

      <section className='kanban'>
        {columns.map((column) => (
          <Column key={column.title} column={column} />
        ))}
      </section>
    </main>
  );
}

export default Board;
