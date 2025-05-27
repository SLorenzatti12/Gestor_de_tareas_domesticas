import React from 'react';

const TaskHistory = ({ tasks }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='history-container'>
      <h2>Historial de Tareas Completadas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas completadas.</p>
      ) : (
        <ul className="task-history-list">
          {tasks.map(task => (
            <li key={task.id} className="history-task">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Fecha:</strong> {formatDate(task.createdAt)}</p>
              <p><strong>Responsable:</strong> {task.responsible}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskHistory;