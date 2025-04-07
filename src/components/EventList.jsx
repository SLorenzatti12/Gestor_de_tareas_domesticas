import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";

const EventList = ({ events, markAsCompleted, deleteEvent }) => {
  return (
    <div className="event-list">
      <h2>Eventos Programados</h2>
      {events.length === 0 ? (
        <p>No hay eventos programados.</p>
      ) : (
        <ul>
          <AnimatePresence>
            {events.map((event, index) => (
              <Draggable key={event.id} draggableId={event.id} index={index}>
                {(provided) => (
                  <motion.li
                    className={`event-item ${event.status}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
                )}
              </Draggable>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default EventList;