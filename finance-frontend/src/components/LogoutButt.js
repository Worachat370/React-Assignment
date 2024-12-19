import React from 'react';

function LogoutButt({ onLogout }) {
  return (
    <button
      style={{ padding: "10px 20px", fontSize: "16px" }}
      onClick={onLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButt;
