{/* Componente pricipal: Maneja el estado de los eventos*/}

import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { addMinutes, isBefore, isAfter, isWithinInterval } from "date-fns";
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

  const deleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
  };

  const updateEventStatus = () => {
    const now = new Date();
    setEvents(events.map(event => {
      if (event.status === "Completado") return event;
      const eventStart = new Date(event.date);
      const eventEnd = addMinutes(eventStart, parseInt(event.duration));
      
      if (isBefore(now, eventStart)) {
        return { ...event, status: "Próximamente", animation: "fade-in" };
      }
      if (isWithinInterval(now, { start: eventStart, end: eventEnd })) {
        playNotification();
        return { ...event, status: "En curso", animation: "highlight" };
      }
      if (isAfter(now, eventEnd)) {
        return { ...event, status: "Finalizado" };
      }
      return event;
    }));
  };

  const playNotification = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  useEffect(() => {
    const interval = setInterval(updateEventStatus, 60000);
    return () => clearInterval(interval);
  }, [events]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedEvents = [...events];
    const [movedEvent] = reorderedEvents.splice(result.source.index, 1);
    reorderedEvents.splice(result.destination.index, 0, movedEvent);
    setEvents(reorderedEvents);
  };

  return (
    <div className="planner">
      <h1>Planificador de Rutinas</h1>
      <EventForm addEvent={addEvent} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="events">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <EventList
                events={events}
                markAsCompleted={markAsCompleted}
                deleteEvent={deleteEvent}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Planner;