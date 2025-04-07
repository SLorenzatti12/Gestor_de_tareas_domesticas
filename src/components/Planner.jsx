import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import "./styles.css";

const getEventStatus = (startDate, durationMinutes) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(start.getTime() + durationMinutes * 60000);
  
    if (now < start) return "Proximamente";
    if (now >= start && now <= end) return "En curso";
    return "Completado";
  };

const Planner = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          const updatedStatus = getEventStatus(event.date, event.duration);
          if (event.status !== updatedStatus) {
            return { ...event, status: updatedStatus };
          }
          return event;
        })
      );
    }, 60000); // Se actualiza cada 60 segundos
  
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    const status = getEventStatus(newEvent.date, newEvent.duration);
    const eventWithStatus = { ...newEvent, status };
    setEvents((prevEvents) => [...prevEvents, eventWithStatus]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const markAsCompleted = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, status: "Completado" } : event
      )
    );
  };

  return (
    <div className="planner">
      <h1>Planificador de Rutinas</h1>
      <EventForm addEvent={addEvent} />
      <EventList
        events={events}
        markAsCompleted={markAsCompleted}
        deleteEvent={deleteEvent}
      />
    </div>
  );
};

export default Planner;