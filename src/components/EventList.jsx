{/*Lista de eventos*/}

import React from "react";

const EventList = ({ events, markAsCompleted }) => {
  return (
    <div className="event-list">
      <h2>Eventos Programados</h2>
      {events.length === 0 ? (
        <p>No hay eventos programados.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className={`event-item ${event.status.toLowerCase()} ${
                event.animation || ""
              }`}
              aria-label={`Evento: ${event.title}, Estado: ${event.status}`}
            >
              <h3>{event.title}</h3>
              {event.description && <p>{event.description}</p>}
              <p>
                <strong>Fecha:</strong> {event.date}
              </p>
              <p>
                <strong>Duración:</strong> {event.duration} min
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                <span className={`status ${event.status.toLowerCase()}`}>
                  {event.status}
                </span>
              </p>
              {event.status !== "Completado" && (
                <button
                  onClick={() => markAsCompleted(event.id)}
                  className="complete-button"
                >
                  Marcar como Completado
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;