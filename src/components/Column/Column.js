import Card from '../Card/Card';
import './Column.css';

function Column({ column }) {
  return (
    <div className="column">
      <div className="column-header">
        <h4>{column.title}</h4>
        <span>{column.count}</span>
      </div>

      {column.cards.map((card) => (
        <Card key={card.title} card={card} />
      ))}

      <button className="add-task">+ Add Task</button>
    </div>
  );
}

export default Column;
