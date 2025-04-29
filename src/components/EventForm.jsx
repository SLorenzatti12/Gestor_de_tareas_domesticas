import React, { useState } from "react";

const EventForm = ({ addEvent, usuarioActual }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !date || !duration) {
      alert("Por favor completá todos los campos.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      duration: Number(duration),
      user: usuarioActual, // Asocia el evento al usuario actual
      completed: false,
    };

    addEvent(newEvent);

    // Limpiar los campos del formulario
    setTitle("");
    setDescription("");
    setDate("");
    setDuration("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Evento</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duración (minutos)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button type="submit">Guardar Evento</button>
    </form>
  );
};

export default EventForm;