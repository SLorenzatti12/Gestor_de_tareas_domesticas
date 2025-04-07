{/*Lista de eventos*/}

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const EventList = ({ events, markAsCompleted }) => {
  return (
    <div className="event-list">
      <h2>Eventos Programados</h2>
      {events.length === 0 ? (
        <p>No hay eventos programados.</p>
      ) : (
        <ul>
          <AnimatePresence>
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
                {event.status !== "Completado" && (
                  <button onClick={() => markAsCompleted(event.id)}>Marcar como Completado</button>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default EventList;