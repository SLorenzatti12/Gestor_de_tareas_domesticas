import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import TaskHistory from './History';
import ViewSwitcher from './ViewSwitcher';

const mockUsers = [
  { id: 1, name: "Usuario 1" },
  { id: 2, name: "Usuario 2" },
  { id: 3, name: "Usuario 3" }
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

  return (
    <div className="form-container">
      <h1>Gestor de Tareas</h1>
  
      <EventForm onAddTask={handleAddTask} users={mockUsers} view = {view} setView={setView}/>
      <div className="filter-buttons">
        <ViewSwitcher view = {view} setView={setView} />
      </div>
  
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
  );
};

export default Planner;