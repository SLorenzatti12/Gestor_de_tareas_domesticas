import React, { useState } from 'react';

const EventForm = ({ onAddTask, users}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [category, setCategory] = useState("");

  const getPointsByCategory = (category) => {
    switch (category) {
      case "urgente": return 15;
      case "esporadica": return 10;
      case "cotidiana": return 5;
      default: return 0;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !responsible || !category) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      responsible,
      category,
      points: getPointsByCategory(category),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);

    // Limpiar formulario
    setTitle('');
    setDescription('');
    setResponsible('');
    setCategory('');
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
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Seleccionar categoría</option>
          <option value="urgente">Urgente (15 pts)</option>
          <option value="esporadica">Esporádica (10 pts)</option>
          <option value="cotidiana">Cotidiana (5 pts)</option>
        </select>

        <button type="submit">Agregar Tarea</button>
      </form>
    </div>
  );
};

export default EventForm;