import React from 'react';

const EventList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div className="event-list">
      <h2>Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Fecha de creación: {task.createdAt}</p>
              <p>Responsable: {task.responsible}</p>
              <button onClick={() => onToggleComplete(index)}>
                {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
              </button>
              <button onClick={() => onDelete(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;