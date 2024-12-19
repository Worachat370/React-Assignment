import React from 'react';

const Prepage = ({ onStart }) => {
  return (
    <div className="Prepage">
      <h1>Welcome to the Finance Tracker</h1>
      <button onClick={onStart} style={{ padding: '10px 20px', fontSize: '16px' }}>
        START TRACK
      </button>
    </div>
  );
};

export default Prepage;
