import Card from '../Card/Card';
import './Column.css';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

function Column({ column, isActive, width, minWidth, onColumnResizeStart }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      className={`column ${isActive ? 'column-active' : ''} ${
        column.cards.length === 0 ? 'column-empty' : ''
      }`}
      ref={setNodeRef}
      style={{
        width: width || minWidth,
      }}
    >
      <div className='column-header'>
        <h4>{column.title}</h4>
        <span>{column.cards.length}</span>
      </div>

      <SortableContext
        items={column.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.cards.map((card) => (
          <Card key={card.id} card={card} columnWidth={width || minWidth} />
        ))}
      </SortableContext>
      {column.cards.length === 0 ? (
        <p className='empty-column-drop-text'>Drop here</p>
      ) : null}

      <button className='add-task'>+ Add Task</button>
      <button
        type='button'
        className='column-resize-handle'
        aria-label={`Resize ${column.title} column`}
        onMouseDown={(event) =>
          onColumnResizeStart(event, column.id, width || minWidth)
        }
      />
    </div>
  );
}

export default Column;
