import { useState, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './Card.css';

function Card({ card }) {
  const [size, setSize] = useState({
    width: 260,
    height: 200,
  });

const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const [isResizing, setIsResizing] = useState(false);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

const MAX_WIDTH = isMobile ? 320 : 400;
const MAX_HEIGHT = isMobile ? 260 : 300;
const MIN_WIDTH = isMobile ? 200 : 220;
const MIN_HEIGHT = 140;

const increaseSize = () => {
  setIsResizing(true);

  setSize((prev) => ({
    width: Math.min(prev.width + 20, MAX_WIDTH),
    height: Math.min(prev.height + 20, MAX_HEIGHT),
  }));

  setTimeout(() => setIsResizing(false), 150);
};

const decreaseSize = () => {
  setIsResizing(true);

  setSize((prev) => ({
    width: Math.max(prev.width - 20, MIN_WIDTH),
    height: Math.max(prev.height - 20, MIN_HEIGHT),
  }));

  setTimeout(() => setIsResizing(false), 150);
};

  return (
    <article
      className={`task-card ${isResizing ? 'resizing' : ''}`}
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      {/* Resize Controls */}
      <div className='resize-controls'>
        <button
          onClick={decreaseSize}
          disabled={size.width <= MIN_WIDTH || size.height <= MIN_HEIGHT}
        >
          <FiMinus />
        </button>
        <button
          onClick={increaseSize}
          disabled={size.width >= MAX_WIDTH || size.height >= MAX_HEIGHT}
        >
          <FiPlus />
        </button>
      </div>
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
    </article>
  );
}

export default Card;
