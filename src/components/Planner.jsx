import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import TaskHistory from './History';
import ViewSwitcher from './ViewSwitcher';
import Ranking from './Ranking';

const mockUsers = [
  { id: 1, name: "Usuario 1" },
  { id: 2, name: "Usuario 2" },
  { id: 3, name: "Usuario 3" },
  { id: 4, name: "Usuario 4" },
  { id: 5, name: "Usuario 5" }
];

const Planner = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("pending"); // "pending" o "completed"

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    const newTask = {
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filtrar tareas según completadas o no
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const userScores = mockUsers.map(user => {
    const score = completedTasks
      .filter(task => task.responsible === user.name)
      .reduce((sum, task) => sum + (task.points || 0), 0); // suma puntos
    return { name: user.name, score };
  });


  return (
    <div className="main-layout">
      <header className='app-header'>
        <h1>Gestor de Tareas</h1>
      </header>

      <div className="main-columns">
        {/* Columna izquierda: Formulario */}
        <div className="left-column">
          <EventForm onAddTask={handleAddTask} users={mockUsers} view={view} setView={setView} />
        </div>

        {/* Columna derecha: Listas o Ranking */}
        <div className="right-column">
          {view === "ranking" && (
            <Ranking users={mockUsers} userScores={userScores} setView={setView} />
          )}

          {view !== "ranking" && (
            <>
              <div className="filter-buttons">
                <ViewSwitcher view={view} setView={setView} />
              </div>
              <div className="task-list-scroll">
                {view === "pending" && (
                  <EventList
                    tasks={pendingTasks}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                  />
                )}

                {view === "completed" && (
                  <TaskHistory tasks={completedTasks} />
                )}
              </div>
            </>
          )}
        </div>
    </div>
  </div>
);
};

export default Planner;