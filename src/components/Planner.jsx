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
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) => {
          const status = getEventStatus(event.date, event.duration);
          return { ...event, status };
        });
        return updatedEvents;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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