import React from 'react';

const Ranking = ({ users, userScores, setView }) => {
  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);

  return (
    <div className="ranking-container">
      <h2>🏆 Ranking de Usuarios 🏆</h2>
      <ul className="ranking-list">
        {sortedScores.map((user, index) => (
          <li key={index} className="ranking-item">
            <span className="ranking-position">#{index + 1}</span>
            <span className="ranking-name">{user.name}</span>
            <span className="ranking-score">{user.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;