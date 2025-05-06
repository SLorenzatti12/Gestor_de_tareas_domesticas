import React, { useState } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import './styles.css';

const mockUsers = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'Sofía' },
  { id: 3, name: 'Carlos' },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="form-container">
      <h1>Gestor de Tareas</h1>
      <EventForm onAddTask={handleAddTask} users={mockUsers} />
      <EventList
        tasks={tasks}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;