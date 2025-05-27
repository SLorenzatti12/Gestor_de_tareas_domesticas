import React, { useState } from 'react';

const EventForm = ({ onAddTask, users}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !responsible) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toISOString(),
      responsible,
      completed: false,
    };

    onAddTask(newTask);

    // Limpiar formulario
    setTitle('');
    setDescription('');
    setResponsible('');
  };

  return (
    <div className="form-container">
      <h1>Crear Nueva Tarea</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          name="responsible"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          required
        >
          <option value="" disabled>Seleccionar responsable</option>
          {users.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>

        <button type="submit">Agregar Tarea</button>
      </form>
    </div>
  );
};

export default EventForm;