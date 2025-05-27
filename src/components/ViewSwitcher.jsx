import React from 'react';

const ViewSwitcher = ({ view, setView }) => {
  return (
    <div className="filter-buttons">
      <button
        type="button"
        onClick={() => setView("pending")}
        className={view === "pending" ? "active" : ""}
      >
        Mostrar tareas activas
      </button>
      <button
        type="button"
        onClick={() => setView("completed")}
        className={view === "completed" ? "active" : ""}
      >
        Mostrar tareas completadas
      </button>
    </div>
  );
};

export default ViewSwitcher;