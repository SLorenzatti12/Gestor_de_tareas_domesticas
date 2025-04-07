import React, { useState } from "react";

const EventForm = ({ addEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      duration: Number(duration),
    };

    addEvent(newEvent);

    setTitle("");
    setDescription("");
    setDate("");
    setDuration("");
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título del evento"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duración (minutos)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <button type="submit">Agregar Evento</button>
    </form>
  );
};

export default EventForm;