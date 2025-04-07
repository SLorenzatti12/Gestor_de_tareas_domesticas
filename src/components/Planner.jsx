{/* Componente pricipal: Maneja el estado de los eventos*/}

import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import "./styles.css";

const Planner = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const markAsCompleted = (id) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, status: "Completado" } : event
    ));
  };

  return (
    <div className="planner">
      <h1>Planificador de Rutinas</h1>
      <EventForm addEvent={addEvent} />
      <EventList events={events} markAsCompleted={markAsCompleted} />
    </div>
  );
};

export default Planner;