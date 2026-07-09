import TaskCards from "./TaskCards";

// Definimos el tipo de la tarea para usarlo en las props
export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

interface TaskListProps {
  tasksList: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function TaskLists({ tasksList, onDelete, onToggle }: TaskListProps) {
  return (
    <ul>
      {tasksList.map((task) => (
        <TaskCards 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </ul>
  );
}
export default TaskLists;