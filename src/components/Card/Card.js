import { useState, useEffect, useRef, useCallback } from 'react';
import './Card.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Card({ card, columnWidth }) {
  const [size, setSize] = useState({
    width: 260,
    height: 200,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isResizing, setIsResizing] = useState(false);
  const cardRef = useRef(null);
  const resizeStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    width: 260,
    height: 200,
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const columnBasedMaxWidth = Math.max((columnWidth || 260) - 30, 180);
  const MAX_WIDTH = isMobile
    ? Math.min(columnBasedMaxWidth, 320)
    : columnBasedMaxWidth;
  const MAX_HEIGHT = isMobile ? 260 : 300;
  const MIN_WIDTH = Math.max(
    isMobile ? 170 : 200,
    Math.min(isMobile ? 200 : 220, MAX_WIDTH - 30),
  );
  const MIN_HEIGHT = 140;

  const handleResizeMove = useCallback(
    (event) => {
      const { mouseX, mouseY, width, height } = resizeStartRef.current;
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      setSize({
        width: Math.min(Math.max(width + deltaX, MIN_WIDTH), MAX_WIDTH),
        height: Math.min(Math.max(height + deltaY, MIN_HEIGHT), MAX_HEIGHT),
      });
    },
    [MAX_HEIGHT, MAX_WIDTH, MIN_HEIGHT, MIN_WIDTH],
  );

  const stopResize = useCallback(() => {
    setIsResizing(false);
    window.removeEventListener('mousemove', handleResizeMove);
    window.removeEventListener('mouseup', stopResize);
  }, [handleResizeMove]);

  const startResize = (event) => {
    event.preventDefault();
    event.stopPropagation();

    resizeStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      width: cardRef.current?.offsetWidth || size.width,
      height: cardRef.current?.offsetHeight || size.height,
    };

    setIsResizing(true);
    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', stopResize);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [handleResizeMove, stopResize]);

  useEffect(() => {
    setSize((prev) => ({
      width: Math.min(Math.max(prev.width, MIN_WIDTH), MAX_WIDTH),
      height: Math.min(Math.max(prev.height, MIN_HEIGHT), MAX_HEIGHT),
    }));
  }, [MAX_HEIGHT, MAX_WIDTH, MIN_HEIGHT, MIN_WIDTH]);

  return (
    <article
      className={`task-card ${isResizing ? 'resizing' : ''}`}
      style={{
        width: size.width,
        height: size.height,
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
      }}
      ref={(node) => {
        setNodeRef(node);
        cardRef.current = node;
      }}
    >
      <button
        type='button'
        className='card-drag-handle'
        aria-label='Drag card'
        {...attributes}
        {...listeners}
      >
        <span className='card-drag-icon' aria-hidden='true' />
      </button>
      <div className='tag-row'>
        <span className='tag'>{card.tags[0]}</span>
        <span className='tag level'>{card.tags[1]}</span>
        <span className='tag date'>{card.tags[2]}</span>
      </div>
      <h5>{card.title}</h5>
      <p>{card.description}</p>
      {card.cover && <div className='cover-image' />}
      <div className='card-footer'>
        <div className='mini-avatars'>
          {Array.from({ length: card.avatars }).map((_, index) => (
            <span key={index} className='avatar tiny'>
              {String.fromCharCode(65 + index)}
            </span>
          ))}
        </div>
        <small>{card.stats}</small>
      </div>
      <button
        type='button'
        className='resize-handle'
        aria-label='Resize card'
        onMouseDown={startResize}
      />
    </article>
  );
}

export default Card;
