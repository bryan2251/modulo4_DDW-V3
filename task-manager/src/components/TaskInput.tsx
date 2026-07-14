import './TaskInput.css'
import { useState } from "react";

type TaskInputProp = {
  onAddTask: (taskText: string) => void;
};

function TaskInputs({ onAddTask }: TaskInputProp) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleSend = () => {
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="input-container">
      <input 
        type="text" 
        name='Nueva Tarea'
        placeholder={error ? "" : "Escribe una nueva tarea"}
        value={inputValue}
        className={error ? "input-error" : ""}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (error) setError(false);
        }}
      />
      <button className="add-button" onClick={handleSend}>
        Agregar Tarea
      </button>
    </div>
  );
}

export default TaskInputs;