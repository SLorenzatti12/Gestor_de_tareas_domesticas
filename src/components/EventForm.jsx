import React, { useState } from 'react';

const EventForm = ({ onAddTask, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [responsible, setResponsible] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !createdAt || !responsible) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newTask = {
      title,
      description,
      createdAt,
      responsible,
      completed: false,
    };

    onAddTask(newTask);

    // Limpiar formulario
    setTitle('');
    setDescription('');
    setCreatedAt('');
    setResponsible('');
  };

  return (
    <div className="form-container">
      <h1>Crear Nueva Tarea</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />

        <select value={responsible} onChange={(e) => setResponsible(e.target.value)}>
          <option value="">Seleccionar responsable</option>
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