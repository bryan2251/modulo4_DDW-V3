import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import TaskInputs from "./components/TaskInput";
import TaskLists from "./components/TaskList";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";

function App() {
  const [tasks, setTasks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener tareas desde el backend 
  const fetchTasks = useCallback(() => {
    fetch(`${apiUrl}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }, [apiUrl]);

  // Crear tarea
  const addTaskToList = (title) => {
    fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.log("Error al crear tarea:", error);
      });
  };

  //Eliminar tarea
  const deleteTask = (id) => {
    fetch(` ${apiUrl}/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchTasks(); 
      })
      .catch((error) => {
        console.log("Error al eliminar tarea:", error);
      });
  };

  // Toggle completed
  const toggleTask = (id) => {
    fetch(` ${apiUrl}/tasks/${id}`, {
      method: "PUT",
    })
      .then(() => {
        fetchTasks(); 
      })
      .catch((error) => {
        console.log("Error al actualizar tarea:", error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="app-container">
      <Header />
      <div className="app-card">
        <TaskInputs onAddTask={addTaskToList} />

        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            <h4 className="taskCounter">
              Numero de tareas: {tasks.length}
            </h4>

            <TaskLists
              tasksList={tasks}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;