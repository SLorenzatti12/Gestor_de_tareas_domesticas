import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import "./styles.css";

const Planner = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
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