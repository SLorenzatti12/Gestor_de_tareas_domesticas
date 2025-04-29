import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";

const Planner = ({ usuarioActual }) => {
  const [events, setEvents] = useState([]);

  // Cargar eventos desde localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("eventos")) || [];
    setEvents(storedEvents);
  }, []);

  // Guardar eventos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("eventos", JSON.stringify(events));
  }, [events]);

  // Filtrar solo los eventos del usuario actual
  const userEvents = events.filter(event => event.user === usuarioActual);

  // Agregar un nuevo evento
  const addEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  // Marcar evento como completado
  const toggleComplete = (id) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  // Eliminar un evento
  const deleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  return (
    <div>
      <h1>Agenda de {usuarioActual}</h1>
      <EventForm addEvent={addEvent} usuarioActual={usuarioActual} />
      <EventList
        events={userEvents}
        toggleComplete={toggleComplete}
        deleteEvent={deleteEvent}
      />
    </div>
  );
};

export default Planner;