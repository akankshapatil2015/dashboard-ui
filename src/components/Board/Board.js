import { useState, useRef, useCallback, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import { LuArrowUpDown } from 'react-icons/lu';
import { BsChevronDown } from 'react-icons/bs';
import { teamAvatars } from '../../data/avatarData';
import Column from '../Column/Column';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import initialColumns from '../../data/columnsData';
import './Board.css';

const viewActions = [
  { label: 'Kanban', icon: <BsChevronDown /> },
  { label: 'Filter', icon: <FiFilter /> },
  { label: 'Sort', icon: <LuArrowUpDown /> },
];

function Board() {
  const [data, setData] = useState(initialColumns);
  const [activeCard, setActiveCard] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const resizeStateRef = useRef({
    columnId: null,
    startX: 0,
    startWidth: 0,
  });
  const MIN_COLUMN_WIDTH = 260;
  const MAX_COLUMN_WIDTH = 520;

  const handleDragStart = (event) => {
    const { active } = event;

    // find card data
    let foundCard = null;

    data.forEach((col) => {
      col.cards.forEach((card) => {
        if (card.id === active.id) {
          foundCard = card;
        }
      });
    });

    setActiveCard(foundCard);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);
    setActiveColumn(null);

    if (!over) return;

    let sourceColIndex, destColIndex;
    let sourceCardIndex, destCardIndex;

    data.forEach((col, colIndex) => {
      col.cards.forEach((card, cardIndex) => {
        if (card.id === active.id) {
          sourceColIndex = colIndex;
          sourceCardIndex = cardIndex;
        }
        if (card.id === over.id) {
          destColIndex = colIndex;
          destCardIndex = cardIndex;
        }
      });

      // 👇 Detect dropping directly on column (empty OR not)
      if (col.id === over.id) {
        destColIndex = colIndex;
      }
    });

    if (sourceColIndex === undefined || destColIndex === undefined) return;

    const newData = [...data];

    const sourceCol = newData[sourceColIndex];
    const destCol = newData[destColIndex];

    const [movedCard] = sourceCol.cards.splice(sourceCardIndex, 1);

    // 👉 If dropped on card
    if (destCardIndex !== undefined) {
      destCol.cards.splice(destCardIndex, 0, movedCard);
    }
    // 👉 If dropped on empty column
    else {
      destCol.cards.push(movedCard);
    }

    setData(newData);
    console.log('OVER:', over?.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;

    if (!over) return;

    let foundColumn = null;

    data.forEach((col) => {
      // If hovering over a card
      if (col.cards.some((card) => card.id === over.id)) {
        foundColumn = col.title;
      }

      // If hovering directly on column
      if (col.id === over.id) {
        foundColumn = col.title;
      }
    });

    setActiveColumn(foundColumn);
  };

  const handleColumnResizeMove = useCallback(
    (event) => {
      const { columnId, startX, startWidth } = resizeStateRef.current;
      if (!columnId) return;

      const nextWidth = Math.min(
        Math.max(startWidth + (event.clientX - startX), MIN_COLUMN_WIDTH),
        MAX_COLUMN_WIDTH
      );

      setColumnWidths((prev) => ({
        ...prev,
        [columnId]: nextWidth,
      }));
    },
    [MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH]
  );

  const stopColumnResize = useCallback(() => {
    resizeStateRef.current = {
      columnId: null,
      startX: 0,
      startWidth: 0,
    };
    window.removeEventListener('mousemove', handleColumnResizeMove);
    window.removeEventListener('mouseup', stopColumnResize);
  }, [handleColumnResizeMove]);

  const startColumnResize = (event, columnId, currentWidth) => {
    event.preventDefault();
    event.stopPropagation();

    resizeStateRef.current = {
      columnId,
      startX: event.clientX,
      startWidth: currentWidth,
    };

    window.addEventListener('mousemove', handleColumnResizeMove);
    window.addEventListener('mouseup', stopColumnResize);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleColumnResizeMove);
      window.removeEventListener('mouseup', stopColumnResize);
    };
  }, [handleColumnResizeMove, stopColumnResize]);

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

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <section className='kanban'>
          {data.map((column) => (
            <Column
              key={column.title}
              column={column}
              isActive={activeColumn === column.title}
              width={columnWidths[column.id]}
              minWidth={MIN_COLUMN_WIDTH}
              onColumnResizeStart={startColumnResize}
            />
          ))}
        </section>

        {/* 🔥 DRAG PREVIEW */}
        <DragOverlay>
          {activeCard ? (
            <div className='drag-overlay-card'>
              <h5>{activeCard.title}</h5>
              <p>{activeCard.description}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}

export default Board;
