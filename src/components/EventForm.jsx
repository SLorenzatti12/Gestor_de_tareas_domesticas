import React, { useState } from "react";

const EventForm = ({ addEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !duration) return;

    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      duration,
      status: "Próximamente",
    };

    addEvent(newEvent);
    setTitle("");
    setDescription("");
    setDate("");
    setDuration("");
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duración (min)"
        min="1"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button type="submit">Agregar Evento</button>
    </form>
  );
};

export default EventForm;