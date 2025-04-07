// EventList.jsx (sin react-beautiful-dnd)

import React from "react";
import { motion } from "framer-motion";

const EventList = ({ events, markAsCompleted, deleteEvent }) => {
  return (
    <div className="event-list">
      <h2>Eventos Programados</h2>
      {events.length === 0 ? (
        <p>No hay eventos programados.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <motion.li
              key={event.id}
              className={`event-item ${event.status}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Fecha:</strong> {event.date}</p>
              <p><strong>Duración:</strong> {event.duration} min</p>
              <p><strong>Estado:</strong> {event.status}</p>
              <div className="event-buttons">
                {event.status !== "Completado" && (
                  <button onClick={() => markAsCompleted(event.id)}>Marcar como Completado</button>
                )}
                <button className="delete-btn" onClick={() => deleteEvent(event.id)}>Eliminar</button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;