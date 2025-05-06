import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';

const mockUsers = [
  { id: 1, name: "Usuario 1" },
  { id: 2, name: "Usuario 2" },
  { id: 2, name: "Usuario 3" },
  { id: 2, name: "Usuario 4" },
  { id: 3, name: "Usuario 5" }
];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

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
    setTasks([...tasks, task]);
  };

  const handleToggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div>
      <EventForm onAddTask={handleAddTask} users={mockUsers} />
      <EventList tasks={tasks} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;