import './TaskCard.css';
import { Task } from "./TaskList";

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function TaskCards({ task, onDelete, onToggle }: TaskCardProps) {
  return (
    <li className="task-item">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.title}
      </span>
      <button className="delete-button" onClick={() => onDelete(task.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default TaskCards;